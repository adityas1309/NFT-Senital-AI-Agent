import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";

const SNOWTRACE_API_URL = `https://api.routescan.io/v2/network/testnet/evm/43113/transactions?fromAddresses=0x543C98CA47C3E8Ea43675D118845032e7A3c7ad9&toAddresses=0x543C98CA47C3E8Ea43675D118845032e7A3c7ad9&sort=desc&limit=50&count=true&`;

const truncateAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(SNOWTRACE_API_URL);
        const txs = response.data.items || [];

        const formattedTxs = txs.map((tx) => ({
          hash: tx.hash,
          action: tx.value === "0" ? "SELL" : "BUY",
          nft: truncateAddress(tx.to),
          timestamp: new Date(tx.timestamp).toLocaleString(),
          price: parseFloat(tx.value) / 1e18,
        }));

        setTransactions(formattedTxs);
      } catch (error) {
        console.error("❌ Failed to fetch Snowtrace transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
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

      {loading ? (
        <div className="p-4 text-center text-gray-400 animate-pulse">
          <p>Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          <p>No recent transactions found</p>
          <div className="mt-3 h-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full animate-pulse" />
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.hash}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    tx.action === "BUY"
                      ? "bg-green-900/30 text-green-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {tx.action === "BUY" ? (
                    <FiArrowUpRight className="w-5 h-5" />
                  ) : (
                    <FiArrowDownLeft className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-cyan-300 truncate max-w-[180px]">
                    {tx.nft}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <FiClock className="w-4 h-4" />
                    <span>{tx.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-mono text-cyan-300">
                  {tx.price.toFixed(4)} AVAX
                </p>
                <div className="flex justify-end items-center gap-2">
                  <span
                    className={`text-sm ${
                      tx.action === "BUY"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {tx.action}
                  </span>
                  <a
                    href={`https://testnet.snowtrace.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400"
                    title="View on Snowtrace"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentTransactions;
