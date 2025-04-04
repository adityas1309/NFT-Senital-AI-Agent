import express from "express";
import { getLiveTweets } from './utils/twitter_sentiment.js';
import { getFakeTweets } from './utils/fake_tweets.js';
import axios from "axios";
import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Transaction from "./models/Transaction.js";
import Message from "./models/Message.js"; // Ensure correct path
import { buyNFT, sellNFT } from "./utils/buy_nft.js"; // Handles NFT purchase
import fetchHistoricalData from "./utils/fetchHistoricalData.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors()); // Allow all origins


const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;

// 🛠 Helper Function to Get Last Processed Telegram Update ID
const getLastUpdateId = async () => {
  try {
    const lastMessage = await Message.findOne().sort({ update_id: -1 }).select("update_id");
    return lastMessage ? lastMessage.update_id : 0;
  } catch (error) {
    console.error("⚠️ Error fetching last update ID:", error.message);
    return 0;
  }
};

// 🛠 Fetch and Filter NFT-Related Telegram Messages
export const getTelegramMessages = async () => {
  try {
    const lastUpdateId = await getLastUpdateId();
    console.log(`🚀 Fetching Telegram messages since update ID: ${lastUpdateId}`);

    const response = await axios.get(`${TELEGRAM_URL}?offset=${lastUpdateId + 1}&timeout=10`);
    if (!response.data.result || response.data.result.length === 0) {
      console.log("🔄 No new messages.");
      return [];
    }

    // Process messages and filter only NFT-related ones
    const messages = response.data.result
      .filter((msg) => msg.message && msg.message.text)
      .map((msg) => ({
        text: msg.message.text,
        username: msg.message.from?.username || "Unknown",
        timestamp: new Date(msg.message.date * 1000),
        update_id: msg.update_id, // Store update_id to track progress
      }))
      .filter((msg) => msg.text.toLowerCase().includes("nft"));

    if (messages.length > 0) {
      console.log(`✅ NFT Telegram messages fetched: ${messages.length}`);

      for (const msg of messages) {
        try {
          await Message.create(msg);
        } catch (err) {
          if (err.code === 11000) {
            console.warn(`⚠️ Duplicate message ignored: ${msg.update_id}`);
          } else {
            console.error("❌ Error saving message:", err.message);
          }
        }
      }
    } else {
      console.log("🔄 No new NFT messages detected.");
    }

    return messages;
  } catch (error) {
    console.error("❌ Error Fetching Telegram Messages:", error.message);
    return [];
  }
};

// 🛠 Get Twitter Sentiment Analysis
const getTwitterSentiment = async (nftToken) => {
  try {
    const liveTweets = await getLiveTweets(nftToken);
    const parsed = JSON.parse(liveTweets);

    // If no data, fall back
    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("No tweets found or parsing failed");
    }

    return parsed;
  } catch (err) {
    console.warn("⚠️ Twitter fetch failed, falling back to AI-generated tweets.");
    try {
      const fallbackTweets = await getFakeTweets(nftToken);
      return JSON.parse(fallbackTweets);
    } catch (fallbackError) {
      console.error("❌ Groq AI fallback also failed:", fallbackError);
      throw new Error("Failed to retrieve both live and fake tweets.");
    }
  }
};

// 🛠 AI Analysis using Groq API
const getAIAnalysis = async (message) => {
  if (!GROQ_API_KEY) return "AI analysis not available (missing API key)";

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error with Groq AI:", error.response?.data || error.message);
    return "AI analysis failed";
  }
};

// 🛠 Process NFT Trades with OpenSea Verification
app.get("/api/auto-trade", async (req, res) => {
  try {
    console.log(`🚀 Checking Telegram for NFT trades...`);

    // Fetch new Telegram messages
    const telegramMessages = await getTelegramMessages();
    if (telegramMessages.length === 0) {
      return res.json({ message: "No NFT messages detected" });
    }

    // Extract NFT token name
    const nftMessage = telegramMessages[0].text;
    const tokenMatch = nftMessage.match(/\bNFT\s+([A-Za-z0-9_-]+)\b/i);
    const nftToken = tokenMatch ? tokenMatch[1] : null;

    if (!nftToken) {
      return res.json({ message: "No valid NFT token detected" });
    }

    console.log(`🔍 NFT Token Detected: ${nftToken}`);

    // Fetch Twitter sentiment
    let twitterSentiment = [];
    try {
      twitterSentiment = await getTwitterSentiment(nftToken);
    } catch (error) {
      console.error("❌ Twitter Sentiment Error:", error);
    }

    const positiveSentimentCount = twitterSentiment.filter((t) => t.sentiment === "positive").length;
    const negativeSentimentCount = twitterSentiment.filter((t) => t.sentiment === "negative").length;

    console.log(`📊 Twitter Sentiment - Positive: ${positiveSentimentCount}, Negative: ${negativeSentimentCount}`);

    // Fetch OpenSea data
    let openSeaData = {};
    try {
      openSeaData = await fetchHistoricalData(nftToken);
    } catch (error) {
      console.error("❌ OpenSea Fetch Error:", error);
    }

    console.log(`📊 OpenSea Data:`, openSeaData);

    // AI Analysis with JSON output enforcement
    let aiDecision = { action: "HOLD", reason: "AI analysis unavailable." };
    try {
      const analysisPrompt = `
        You are an expert AI trader. Analyze the NFT below and return only JSON.

        **NFT Token:** ${nftToken}
        
        **1. Telegram Message:** "${nftMessage}"  
        **2. Twitter Sentiment:**  
        - Positive: ${positiveSentimentCount}  
        - Negative: ${negativeSentimentCount}  
        
        **3. OpenSea Market Data:**  
        ${JSON.stringify(openSeaData, null, 2)}  

        **IMPORTANT: Return JSON in this format:**
        \`\`\`json
        { "action": "BUY" | "SELL" | "HOLD", "reason": "Your explanation here" }
        \`\`\`
      `;

      let aiResponse = await getAIAnalysis(analysisPrompt);

      console.log("📝 Raw AI Response:", aiResponse); // Debugging AI response

      // Extract JSON safely using regex
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiDecision = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("AI response did not contain valid JSON.");
      }
    } catch (error) {
      console.error("❌ AI Analysis Failed:", error.message);
    }

    console.log(`🤖 AI Decision: ${aiDecision.action} - ${aiDecision.reason}`);

    // Execute trade based on AI decision
   
    let tradeResponse = { message: "No trade executed." };

    if (aiDecision.action === "BUY" || aiDecision.action === "SELL") {
      try {
        // Check if a similar trade (same NFT & action) was already recorded
        const existingTrade = await Transaction.findOne({ nft: nftToken, action: aiDecision.action });

        if (existingTrade) {
          console.log(`⚠️ Duplicate ${aiDecision.action} action detected for ${nftToken}. Skipping trade.`);
          tradeResponse = { message: `Duplicate ${aiDecision.action} action detected. Trade skipped.` };
        } else {
          // Simulate Buy/Sell trade (Dummy transaction)
          tradeResponse =
            aiDecision.action === "BUY"
              ? await buyNFT(nftToken)  // Simulated NFT purchase
              : await sellNFT(nftToken); // Simulated NFT sale

          // Save trade to MongoDB only if unique
          await Transaction.create({
            nft: nftToken,
            action: aiDecision.action,
            timestamp: new Date(),
          });

          console.log(`✅ ${aiDecision.action} transaction recorded for ${nftToken}`);
        }
      } catch (tradeError) {
        console.error(`❌ ${aiDecision.action} Failed for ${nftToken}:`, tradeError.message);
        tradeResponse = { error: `${aiDecision.action} attempt failed` };
      }
    }

    // Prepare response
    return res.json({
      token: nftToken,
      telegramMessage: nftMessage,
      twitterMessages: twitterSentiment,
      aiDecision,
      openSeaData,
      tradeResponse,
    });
  } catch (error) {
    console.error("❌ Auto Trade Error:", error);
    return res.status(500).json({ error: "Failed to execute auto-trade" });
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    // Fetch the last 10 transactions from MongoDB
    const transactions = await Transaction.find().sort({ timestamp: -1 }).limit(10);

    // Remove duplicate NFT actions (same NFT name & action)
    const uniqueTransactions = [];
    const seen = new Set();

    for (const tx of transactions) {
      const key = `${tx.nft}-${tx.action}`;
      if (!seen.has(key)) {
        uniqueTransactions.push(tx);
        seen.add(key);
      }
    }

    res.json(uniqueTransactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});


app.get("/api/auto-trade-nftgo", async (req, res) => {
  try {
    console.log("🚀 Fetching NFTGo Data for AI Trading Decision...");

    let topCollections = [], marketVolume = {}, whaleActivity = {};
    try {
      const [topCollectionsRes, marketVolumeRes, whaleActivityRes] = await Promise.all([
        axios.get("http://localhost:5000/api/analytics/top-collections"),
        axios.get("http://localhost:5000/api/analytics/market-volume"),
        axios.get("http://localhost:5000/api/analytics/whale-activity")
      ]);

      topCollections = topCollectionsRes.data.slice(0, 5);
      marketVolume = marketVolumeRes.data;
      whaleActivity = whaleActivityRes.data;
    } catch (error) {
      console.error("❌ NFTGo API Fetch Error:", error);
    }

    if (!topCollections.length) {
      return res.json({ message: "No NFT data available for trading." });
    }

    // Generate AI Analysis Prompt
    const analysisPrompt = `
      You are an expert AI trader. Analyze the summarized NFTGo data and return only JSON.

      **Top NFT Collections:**
      ${topCollections.map(tc => {
        const lastPrice = tc.last_price?.value ?? "N/A";
        const currency = tc.last_price?.crypto_unit ?? "Unknown";
        const rarityRank = tc.rarity?.rank ?? "Unknown";
        const priceChangeETH = tc.price_change_eth ?? "N/A";
        return `${tc.name}: Last Price ${lastPrice} ${currency}, Rarity Rank ${rarityRank}, Price Change ${priceChangeETH} ETH`;
      }).join("; ")}

      **Market Volume Summary:**
      Total Volume: ${marketVolume.total}, 7-day Trend: ${marketVolume.trend_7d}

      **Whale Activity Summary:**
      Active Whales: ${whaleActivity.active_whales}, Top Whale Holdings: ${whaleActivity.top_holdings}

      **IMPORTANT: Return JSON in this format:**
      \`\`\`json
      [
        { "nft": "NFT Name", "action": "BUY" | "SELL" | "HOLD", "reason": "Your explanation here" }
      ]
      \`\`\`
    `;

    let aiDecision = [];
try {
  let aiResponse = await getAIAnalysis(analysisPrompt);
  console.log("📝 Raw AI Response:", aiResponse);

  let extractedJson = "";

  // Attempt to extract JSON from AI response
  const jsonMatch = aiResponse.match(/```json([\s\S]*?)```/);
  if (jsonMatch && jsonMatch[1]) {
    extractedJson = jsonMatch[1].trim(); // JSON inside ```json ... ```
  } else {
    // Try finding the first valid JSON object in the response
    const jsonStartIndex = aiResponse.indexOf("[");
    const jsonEndIndex = aiResponse.lastIndexOf("]");

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      extractedJson = aiResponse.substring(jsonStartIndex, jsonEndIndex + 1);
    } else {
      throw new Error("AI response did not contain valid JSON.");
    }
  }

  // Validate and parse JSON
  aiDecision = JSON.parse(extractedJson);

  if (!Array.isArray(aiDecision)) {
    throw new Error("AI response must be an array of trade decisions.");
  }
} catch (error) {
  console.error("❌ AI Analysis Failed:", error.message);
  aiDecision = [{ nft: "N/A", action: "HOLD", reason: "AI analysis unavailable." }];
}

console.log("🤖 AI Decisions:");
aiDecision.forEach(decision => {
  console.log(`${decision.action} - ${decision.nft} - ${decision.reason}`);
});


    let tradeResponses = [];

    for (const decision of aiDecision) {
      let tradeResponse = { message: `No trade executed for ${decision.nft}.` };

      if (decision.action === "BUY" || decision.action === "SELL") {
        try {
          const existingTrade = await Transaction.findOne({ nft: decision.nft, action: decision.action });

          if (existingTrade) {
            console.log(`⚠️ Duplicate ${decision.action} action detected for ${decision.nft}. Skipping trade.`);
            tradeResponse = { message: `Duplicate ${decision.action} action detected. Trade skipped.` };
          } else {
            tradeResponse =
              decision.action === "BUY" ? await buyNFT(decision.nft) : await sellNFT(decision.nft);

            await Transaction.create({
              nft: decision.nft,
              action: decision.action,
              timestamp: new Date(),
            });

            console.log(`✅ ${decision.action} transaction recorded for ${decision.nft}`);
          }
        } catch (tradeError) {
          console.error(`❌ ${decision.action} Failed for ${decision.nft}:`, tradeError.message);
          tradeResponse = { error: `${decision.action} attempt failed for ${decision.nft}` };
        }
      }

      tradeResponses.push({
        nft: decision.nft,
        action: decision.action,
        reason: decision.reason,
        tradeResponse
      });
    }

    return res.json({
      aiDecisions: aiDecision,
      tradeResponses,
      marketVolume,
      whaleActivity,
    });

  } catch (error) {
    console.error("❌ Auto Trade Error:", error);
    return res.status(500).json({ error: "Failed to execute auto-trade" });
  }
});






app.use("/api/analytics", analyticsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
