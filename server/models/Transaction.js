import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  nft: { type: String, required: true },
  action: { type: String, enum: ["BUY", "SELL"], required: true },
  status: { type: String, default: "Completed" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
