import mongoose from "mongoose";
import Transaction from "../models/Transaction.js"; // MongoDB model

// Simulated NFT Buy
export const buyNFT = async (nftSymbol) => {
  try {
    console.log(`🛒 Simulated BUY: ${nftSymbol}`);

    // Save to MongoDB as a dummy transaction
    const newTransaction = new Transaction({
      nft: nftSymbol,
      action: "BUY",
      status: "Completed",
      timestamp: new Date(),
    });
    await newTransaction.save();

    return { message: `Bought NFT: ${nftSymbol}` };
  } catch (error) {
    console.error("❌ Simulated NFT Buy Failed:", error.message);
    return { error: "Failed to log simulated buy" };
  }
};

// Simulated NFT Sell
export const sellNFT = async (nftSymbol) => {
  try {
    console.log(`📉 Simulated SELL: ${nftSymbol}`);

    // Save to MongoDB as a dummy transaction
    const newTransaction = new Transaction({
      nft: nftSymbol,
      action: "SELL",
      status: "Completed",
      timestamp: new Date(),
    });
    await newTransaction.save();

    return { message: `Sold NFT: ${nftSymbol}` };
  } catch (error) {
    console.error("❌ Simulated NFT Sell Failed:", error.message);
    return { error: "Failed to log simulated sell" };
  }
};
