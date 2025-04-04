import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";

const TopCollections = ({ topCollections }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gray-800/30 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg"
    >
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl -z-10" />
      
      <div className="mb-6">
        <p className="text-gray-400 mt-2">Most valuable NFT collections this week</p>
      </div>

      {topCollections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCollections.map((nft, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all"
            >
              <div className="space-y-4">
                {/* Collection Header */}
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-600 group-hover:border-cyan-400 transition-all">
                      {nft.image ? (
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-medium bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent truncate">
                      {nft.name || "Unknown NFT"}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {nft.collection?.name || "Unknown Collection"}
                    </p>
                  </div>
                </div>

                {/* Price Section */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
                    <p className="text-xs text-blue-400 mb-1">Floor Price</p>
                    <div className="flex items-center gap-1">
                      <FaEthereum className="text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">
                        {nft.last_price?.value
                          ? Number(nft.last_price.value).toFixed(2)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    nft.price_change_eth >= 0 
                      ? "bg-green-900/20 border-green-700/30" 
                      : "bg-red-900/20 border-red-700/30"
                  }`}>
                    <p className="text-xs text-gray-400 mb-1">24h Change</p>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-medium ${
                        nft.price_change_eth >= 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        {nft.price_change_eth?.toFixed(2) || "N/A"} ETH
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rarity Section */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="px-2 py-1 bg-gray-700/30 rounded-md">
                      #{nft.rarity?.rank ?? "N/A"}
                    </span>
                    <span className="text-cyan-300">
                      Rarity Score: {nft.rarity?.score?.toFixed(2) || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Owner Section */}
                {nft.owner?.address && (
                  <div className="pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="truncate">
                          {nft.owner.address.slice(0, 6)}...{nft.owner.address.slice(-4)}
                        </span>
                      </div>
                      <a
                        href={`https://etherscan.io/address/${nft.owner.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Profile</span>
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
          <p className="text-gray-400">No collection data available</p>
        </div>
      )}
    </motion.div>
  );
};

export default TopCollections;