import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const NFTGoAutoTrade = () => {
  const [tradeData, setTradeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTradeDecision = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://nft-senital-ai-agent-mx3d.vercel.app/api/auto-trade-nftgo");
      setTradeData(response.data);
    } catch (err) {
      setError("Failed to fetch trade decision.");
      console.error("❌ Fetch Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTradeDecision();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gray-800/30 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg"
    >
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl -z-10" />
  
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            AI Trading Signals
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            Real-time NFT market intelligence powered by AI
          </p>
        </div>
        
        <button
          onClick={fetchTradeDecision}
          className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all ${
            loading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl" />
          <span className="relative z-10 text-gray-900 flex items-center gap-2">
            {loading ? (
              <>
                <span className="animate-pulse">Analyzing</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce delay-200" />
                </div>
              </>
            ) : (
              <>
                Refresh Signals
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </>
            )}
          </span>
        </button>
      </div>
  
      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-900/20 rounded-xl border border-red-700/50 flex items-center gap-3"
        >
          <div className="flex-1">
            <p className="text-red-400 font-medium">Analysis Error</p>
            <p className="text-red-400/80 text-sm mt-1">{error}</p>
          </div>
        </motion.div>
      )}
  
      {/* Content Section */}
      {tradeData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 mt-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tradeData.tradeResponses?.length > 0 ? (
              tradeData.tradeResponses.map((trade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-gray-800/30 p-4 rounded-xl border border-gray-700 backdrop-blur-lg group hover:border-cyan-400/30 transition-colors"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Trade Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-blue-300 truncate">
                        {trade.nft}
                      </h4>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
                      trade.action === "BUY" 
                        ? "bg-green-900/30 text-green-400 border border-green-700/30"
                        : trade.action === "SELL" 
                          ? "bg-red-900/30 text-red-400 border border-red-700/30"
                          : "bg-gray-700/30 text-gray-400"
                    }`}>
                      {trade.action === "BUY" ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      {trade.action}
                    </span>
                  </div>
  
                  {/* Trade Body */}
                  <div className="space-y-4">
                    <p className="text-gray-200 text-sm leading-relaxed bg-gray-900/10 p-3 rounded-lg border border-gray-700/30">
                      {trade.reason}
                    </p>
  
                    {trade.tradeResponse?.message && (
                      <div className="mt-3 p-3 bg-blue-900/20 rounded-lg border border-blue-700/30 flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-blue-400 text-sm flex-1">
                          {trade.tradeResponse.message}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : loading ? (
              <div className="col-span-full">
                <div className="animate-pulse space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-32 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-xl" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-span-full p-6 text-center border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center gap-3 min-h-[200px]">
                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-400 font-medium">No active trading signals detected</p>
                <p className="text-gray-500 text-sm">New recommendations will appear here</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NFTGoAutoTrade;