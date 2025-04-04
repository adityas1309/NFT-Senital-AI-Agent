import React from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiDollarSign, FiTrendingUp, FiUsers, FiPieChart, FiActivity } from 'react-icons/fi';

const OpenSea = ({ openSeaData }) => {
    const formatETH = (value) => {
        return Number(value).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        });
      };
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
        <FiBox className="w-6 h-6 text-cyan-400" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          NFT Market Analytics
        </h3>
      </div>

      {openSeaData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Collection Overview */}
          <div className="p-4 bg-gray-800/40 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FiUsers className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-semibold text-gray-400">Collection</h4>
            </div>
            <p className="text-lg font-medium text-cyan-300 truncate">
              {openSeaData.collection || "Unknown Collection"}
            </p>
          </div>

          {/* Floor Price */}
          <div className="p-4 bg-gray-800/40 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FiDollarSign className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-semibold text-gray-400">Floor Price</h4>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-green-400">
                {openSeaData.floor_price}
              </span>
              <span className="text-gray-400">{openSeaData.floor_price_symbol}</span>
            </div>
          </div>

          {/* Market Cap */}
          <div className="p-4 bg-gray-800/40 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FiPieChart className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-semibold text-gray-400">Market Cap</h4>
            </div>
            <p className="text-xl font-bold text-cyan-300">
              {openSeaData.market_cap.toFixed(2)} ETH
            </p>
          </div>

          {/* Volume Metrics */}
            <div className="col-span-full p-4 bg-gray-800/40 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
                <FiTrendingUp className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-semibold text-gray-400">Volume Trends</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard 
                title="24H Volume" 
                value={`${formatETH(openSeaData.one_day_volume)} ETH`}
                change={openSeaData.one_day_change}
                sales={openSeaData.one_day_sales}
                />
                <MetricCard 
                title="7D Volume" 
                value={`${formatETH(openSeaData.seven_day_volume)} ETH`}
                change={openSeaData.seven_day_change}
                sales={openSeaData.seven_day_sales}
                />
                <MetricCard 
                title="30D Volume" 
                value={`${formatETH(openSeaData.thirty_day_volume)} ETH`}
                change={openSeaData.thirty_day_change}
                sales={openSeaData.thirty_day_sales}
                />
            </div>
            </div>

          {/* Additional Stats */}
          <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              icon={<FiActivity className="w-5 h-5 text-blue-400" />}
              title="Total Sales"
              value={openSeaData.total_sales}
            />
            <StatCard 
              icon={<FiUsers className="w-5 h-5 text-blue-400" />}
              title="Unique Owners"
              value={openSeaData.num_owners}
            />
            <StatCard 
              icon={<FiDollarSign className="w-5 h-5 text-blue-400" />}
              title="Avg Price"
              value={`${openSeaData.average_price.toFixed(2)} ETH`}
            />
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-gray-400">
          <p>Fetching live market data...</p>
          <div className="mt-3 h-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full animate-pulse" />
        </div>
      )}
    </motion.div>
  );
};

// Reusable Metric Card Component
const MetricCard = ({ title, value, change, sales }) => (
    <div className="p-3 bg-gray-900/20 rounded-lg">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-400 truncate">{title}</span>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-cyan-300 truncate">{value}</span>
          {change && (
            <span className={`text-sm px-2 py-1 rounded-md ${
              change > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}>
              {change > 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400 mt-1">
          {sales.toLocaleString()} sales
        </span>
      </div>
    </div>
  );

// Reusable Stat Card Component
const StatCard = ({ icon, title, value }) => (
  <div className="p-3 bg-gray-900/20 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm text-gray-400">{title}</span>
    </div>
    <p className="text-lg font-medium text-cyan-300">{value}</p>
  </div>
);

export default OpenSea;