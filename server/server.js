import express from "express";
import axios from "axios";
import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import { buyNFT, sellNFT } from "./utils/buy_nft.js";

import Transaction from "./models/Transaction.js";

import analyticsRoutes from "./routes/analyticsRoutes.js";
dotenv.config();
connectDB();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const app = express();
app.use(express.json());

app.use(cors()); 


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
