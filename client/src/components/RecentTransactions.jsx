import React, { useEffect, useState } from "react";
import { fetchRecentTransactions } from "../api/transactions";
import { motion } from "framer-motion";
import { FiActivity, FiArrowUpRight, FiArrowDownLeft, FiClock } from "react-icons/fi";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchRecentTransactions();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg"
    >
      {/* Gradient Border Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl -z-10" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FiActivity className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Recent Activity
        </h2>
      </div>

      {transactions.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          <p>No recent transactions found</p>
          <div className="mt-3 h-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full animate-pulse" />
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  tx.action.toLowerCase() === 'buy' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  {tx.action.toLowerCase() === 'buy' ? (
                    <FiArrowUpRight className="w-5 h-5" />
                  ) : (
                    <FiArrowDownLeft className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-cyan-300 truncate max-w-[200px]">
                    {tx.nft}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <FiClock className="w-4 h-4" />
                    <span>{new Date(tx.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-cyan-300">
                  {parseFloat(tx.price).toFixed(2)} ETH
                </p>
                <span className={`text-sm ${
                  tx.action.toLowerCase() === 'buy' 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {tx.action.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentTransactions;