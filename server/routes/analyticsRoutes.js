import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const NFTGO_API_KEY1 = process.env.NFTGO_API_KEY1;
const NFTGO_API_KEY2 = process.env.NFTGO_API_KEY2;
const BASE_URL = "https://data-api.nftgo.io/eth/v1";

const convertTimestamps = (timestamps) => {
  return timestamps.map(ts => new Date(ts * 1000).toISOString().split("T")[0]);
};

const getISODate = (daysAgo) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toISOString().split(".")[0] + "+00:00"; // Remove milliseconds
};

// 🐋 Get Whale Activity Data

router.get("/whale-activity", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://data-api.nftgo.io/eth/v1/whale/",
      params: {
        sort_by: "portfolio_value",
        include_contract: "false",
        asc: "false",
        offset: "0",
        limit: "20",
      },
      headers: {
        accept: "application/json",
        "X-API-KEY": NFTGO_API_KEY1,
      },
    };

    const response = await axios.request(options);

    console.log("🔹 API Raw Response:", response.data); // Debugging

    // Ensure response contains expected data
    if (!response.data || !response.data.whale_list) {
      throw new Error("Invalid whale activity data structure");
    }

    res.json(response.data.whale_list); // Correct key is `whale_list`
  } catch (error) {
    console.error(
      "❌ Error Fetching Whale Activity:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch whale activity" });
  }
});

// 🔥 Get Top NFT Collections by Price
router.get("/top-collections", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/market/rank/nft/24h?by=price&category=ALL&offset=0&limit=10`, {
      headers: { "X-API-KEY": NFTGO_API_KEY2 },
    });
    console.log("🔹 AlI Raw Response:", response.data);
    if (!response.data || !response.data.nfts) {
      throw new Error("Invalid top collections data");
    }

    res.json(response.data.nfts); // Returning only relevant NFT collection data
  } catch (error) {
    console.error("❌ Error Fetching Top Collections:", error.message);
    res.status(500).json({ error: "Failed to fetch top collections" });
  }
});

router.get("/market-volume", async (req, res) => {
  try {
    const start_time = getISODate(29); // Last 29 days
    const end_time = getISODate(0); // Today

    const url = `${BASE_URL}/market/chart/volume?start_time=${encodeURIComponent(start_time)}&end_time=${encodeURIComponent(end_time)}&unit=USD`;

    const response = await axios.get(url, {
      headers: { "X-API-KEY": NFTGO_API_KEY2 },
    });

    // Convert timestamps
    const formattedData = {
      dates: convertTimestamps(response.data.x),
      volume: response.data.y,
    };

    res.json(formattedData);
  } catch (error) {
    console.log("NFTGO API Key:", NFTGO_API_KEY);
    console.error("❌ Error Fetching Market Volume Chart:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch market volume data." });
  }
});

export default router;

