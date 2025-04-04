import express from "express";
import axios from "axios";
import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors()); 

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
  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
