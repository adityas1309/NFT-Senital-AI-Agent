import { motion } from "framer-motion";
import { FiDollarSign, FiActivity, FiGrid, FiClock, FiArrowUpRight } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";
import { format } from "date-fns";

const shortenAddress = (address) => 
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const WhaleActivity = ({ whaleActivity }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gray-800/30 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg"
    >
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl -z-10" />
      
      <div className="mb-6">
        <p className="text-gray-400 mt-2">Recent high-value NFT transactions</p>
      </div>

      {whaleActivity.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {whaleActivity.map((whale, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all"
            >
              <div className="space-y-4">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaEthereum className="text-blue-400 w-5 h-5" />
                    <span className="font-mono text-cyan-300">
                      {shortenAddress(whale.address)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {whale.activities} trades
                  </span>
                </div>

                {/* Portfolio Value */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FiDollarSign className="text-blue-400 flex-shrink-0" />
                    <span className="font-medium">
                      ${Number(whale.portfolio_usd).toLocaleString()}
                    </span>
                    <span className="text-gray-400">|</span>
                    <FaEthereum className="text-blue-400" />
                    <span className="font-medium">
                      {Number(whale.portfolio_eth).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* P&L Section */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-700/30">
                    <p className="text-xs text-green-400 mb-1">Realized P&L</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-green-400">
                        +${Number(whale.realized_profit_usd).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
                    <p className="text-xs text-blue-400 mb-1">Unrealized P&L</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-blue-400">
                        ${Number(whale.unrealized_profit_usd).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* NFT Stats */}
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <FiGrid className="text-yellow-400" />
                    <span className="text-sm">{whale.nft_num}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiActivity className="text-purple-400" />
                    <span className="text-sm">{whale.collection_num}</span>
                  </div>
                </div>

                {/* Last Trade */}
                {whale.last_trade && (
                  <div className="pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <FiClock className="flex-shrink-0" />
                        <span>
                          {format(new Date(whale.last_trade.time), "MMM dd, HH:mm")}
                        </span>
                      </div>
                      <a
                        href={`https://etherscan.io/tx/${whale.last_trade.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Details</span>
                        <FiArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center border-2 border-dashed border-gray-700 rounded-xl">
          <p className="text-gray-400">No whale activity detected</p>
        </div>
      )}
    </motion.div>
  );
};

export default WhaleActivity;