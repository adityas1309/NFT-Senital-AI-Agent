import React from "react";
import { motion } from "framer-motion";
import WhaleActivity from "./WhaleActivity";
import TopCollections from "./TopCollections";
import NFTMarketChart from "./NFTMarketChart";
import NFTGoAutoTrade from "./NFTGoAutoTrade";
import ErrorMessage from "../ErrorMessage";
import useAnalyticsData from "../../hooks/useAnalyticsData";
import { GiSpermWhale } from "react-icons/gi";
import { FiTrendingUp, FiImage } from "react-icons/fi";


const AnalyticsDashboard = () => {
  const { whaleActivity, topCollections, error } = useAnalyticsData();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-4 sm:p-8">
      {/* Radial Gradient Background */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0) 70%)'
        }} 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 max-w-[95%] space-y-8"
      >
        <ErrorMessage error={error} />

        {/* Main Analytics Grid (Stacked Layout) */}
        <div className="grid grid-cols-1 gap-8 w-full">
          
          {/* AI DESICISIONS */}
          <div className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg">
            
            <div className="flex items-center gap-3 mb-6">
                    <FiTrendingUp className="w-8 h-8 text-cyan-400" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      AI DESICIONS
                    </h2>
                  </div>
            <NFTGoAutoTrade />
          </div>

          {/* NFT Market Volume Chart */}
          <div className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg">
            
            <div className="flex items-center gap-3 mb-6">
                    <FiTrendingUp className="w-8 h-8 text-cyan-400" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      Market Volume Trends
                    </h2>
                  </div>
            <NFTMarketChart />
          </div>

          {/* Whale Activity Card */}
          <div className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg">
            
            <div className="flex items-center gap-3 mb-4">
                    <GiSpermWhale className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      Whale Activity
                    </h3>
                  </div>
            <WhaleActivity whaleActivity={whaleActivity} />
          </div>

          {/* Top Collections Card */}
          <div className="relative w-full max-w-7xl bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg mx-auto">
            <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl -z-10" />
            <div className="flex items-center gap-3 mb-4">
              <FiImage className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Top Collections
              </h3>
           </div>
            <TopCollections topCollections={topCollections} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
