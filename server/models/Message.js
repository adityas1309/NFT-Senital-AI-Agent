import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, default: "Unknown" },
  timestamp: { type: Date, default: Date.now },
  update_id: { type: Number, unique: true, required: true }, // Prevent duplicate messages
  
  // Store full Telegram message structure
  telegram_data: { type: mongoose.Schema.Types.Mixed, default: {} },

  // Twitter sentiment analysis storage
  twitter_sentiment: [{
    text: String,
    sentiment: { type: String, enum: ["positive", "negative", "neutral"], default: "neutral" }
  }],

  // OpenSea market data storage
  openSea_data: { type: mongoose.Schema.Types.Mixed, default: {} },

  // AI decision storage
  ai_decision: {
    action: { type: String, enum: ["BUY", "SELL", "HOLD"], default: "HOLD" },
    reason: { type: String, default: "" }
  },

  // NFT token extracted
  nft_token: { type: String, default: "" }
});

// Create indexes for faster queries
MessageSchema.index({ timestamp: -1 });
MessageSchema.index({ nft_token: 1 });

export default mongoose.model("Message", MessageSchema);
