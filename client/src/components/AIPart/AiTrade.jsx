import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket } from "react-icons/fa"; // From FontAwesome
import { FiDollarSign, FiActivity, FiMessageSquare, FiCopy } from 'react-icons/fi';

const AiTrade = ({ token, action, telegramMessage }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(telegramMessage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gray-800/30 p-6 rounded-xl border border-gray-700 backdrop-blur-lg"
    >
      {/* Gradient Border Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-xl -z-10" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaRocket className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          AI Trading Signal
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Token Section */}
        <div className="flex items-center gap-3 p-4 bg-gray-800/40 rounded-lg">
          <FiDollarSign className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Tracking Token</p>
            <p className="font-medium text-lg text-cyan-300">{token || 'N/A'}</p>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-3 p-4 bg-gray-800/40 rounded-lg">
          <FiActivity className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Recommended Action</p>
            <p className={`font-medium text-lg ${
              action?.toLowerCase() === 'buy' ? 'text-green-400' : 'text-red-400'
            }`}>
              {action || 'Analyzing...'}
            </p>
          </div>
        </div>
      </div>

      {/* Telegram Message */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <FiMessageSquare className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-semibold text-gray-400">Market Signal</h3>
          <button 
            onClick={copyToClipboard}
            className="ml-auto text-gray-500 hover:text-cyan-400 transition-colors"
            title="Copy message"
          >
            <FiCopy className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 bg-gray-800/40 rounded-lg max-h-40 overflow-y-auto">
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            {telegramMessage || 'Waiting for market signals...'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AiTrade;