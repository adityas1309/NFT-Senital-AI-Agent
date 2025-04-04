import React from "react";
import { motion } from "framer-motion";
import { FiTwitter, FiHeart, FiAlertTriangle, FiMeh, FiCopy } from "react-icons/fi";

const TwitterMsg = ({ twitterMessages }) => {
  // Function to get the sentiment icon
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <FiHeart className="w-5 h-5 text-green-400" />;
      case "negative":
        return <FiAlertTriangle className="w-5 h-5 text-red-400" />;
      default: // Neutral
        return <FiMeh className="w-5 h-5 text-yellow-400" />;
    }
  };

  // Function to copy tweet to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Random authors list
  const randomAuthors = [
    { name: "CryptoWhale", handle: "crypto_whale", avatar: "/avatars/avatar1.png" },
    { name: "NFTGenius", handle: "nft_genius", avatar: "/avatars/avatar2.png" },
    { name: "Web3Wizard", handle: "web3_wizard", avatar: "/avatars/avatar3.png" },
    { name: "DeFiDegen", handle: "defi_degen", avatar: "/avatars/avatar4.png" },
    { name: "BlockchainBae", handle: "blockchain_bae", avatar: "/avatars/avatar5.png" },
    { name: "SmartContractX", handle: "smart_contract_x", avatar: "/avatars/avatar6.png" },
    { name: "MetaverseMogul", handle: "metaverse_mogul", avatar: "/avatars/avatar7.png" }
  ];
  

  // Function to get a random author
  const getRandomAuthor = () => randomAuthors[Math.floor(Math.random() * randomAuthors.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gray-800/30 p-6 rounded-xl border border-gray-700 backdrop-blur-lg mt-4"
    >
      {/* Gradient Border Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-xl -z-10" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FiTwitter className="w-6 h-6 text-cyan-400" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Social Sentiment Analysis
        </h3>
      </div>

      {/* Tweets Display */}
      {twitterMessages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {twitterMessages.map((tweet, index) => {
            const randomAuthor = getRandomAuthor(); // Assign a random author for each tweet

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Tweet Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={randomAuthor.avatar}
                      alt="author"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-cyan-300">{randomAuthor.name}</p>
                      <p className="text-sm text-gray-400">@{randomAuthor.handle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(tweet.tweet)}
                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                    title="Copy tweet"
                  >
                    <FiCopy className="w-4 h-4" />
                  </button>
                </div>

                {/* Tweet Content */}
                <p className="text-gray-300 mb-4">"{tweet.tweet}"</p>

                {/* Sentiment Analysis */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(tweet.sentiment)}
                    <span
                      className={`text-sm font-medium ${
                        tweet.sentiment === "positive"
                          ? "text-green-400"
                          : tweet.sentiment === "negative"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {tweet.sentiment.charAt(0).toUpperCase() + tweet.sentiment.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <span>{new Date(tweet.timestamp).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <FiHeart className="w-4 h-4" />
                      {tweet.likes}
                    </span>
                  </div>
                </div>

                {/* Sentiment Strength Indicator */}
                <div className="mt-3 h-1 rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className={`h-full ${
                      tweet.sentiment === "positive"
                        ? "bg-green-400"
                        : tweet.sentiment === "negative"
                        ? "bg-red-400"
                        : "bg-yellow-400"
                    }`}
                    style={{ width: `${(tweet.sentiment_score + 1) * 50}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-400">
          <p>No relevant social signals detected</p>
          <div className="mt-3 h-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full animate-pulse" />
        </div>
      )}
    </motion.div>
  );
};

export default TwitterMsg;
