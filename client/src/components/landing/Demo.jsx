import React from 'react'
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiActivity, FiDollarSign } from 'react-icons/fi';

const Demo = () => {
  return (
    <section className="relative py-28 px-6 border-t border-gray-800/50 bg-gradient-to-b from-gray-900/30 to-transparent">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient-x">
            Live AI Trading Demo
          </span>
        </motion.h2>

        <motion.div 
          className="group bg-gray-800/30 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-gray-700/50 hover:border-cyan-400/20 transition-all duration-300 relative overflow-hidden"
          whileHover={{ scale: 1.005 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
        
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
          
          
          <div className="relative h-[500px] bg-gray-700/20 rounded-2xl overflow-hidden border border-gray-700/50">
            
            <div className="absolute inset-0">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-30 animate-shimmer" />
            </div>
            
            
            <div className="absolute left-8 top-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500">
                  <FiActivity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">ETH/USD</h3>
                  <p className="text-cyan-400 font-mono">$3,427.52 <span className="text-green-400">+2.4%</span></p>
                </div>
              </div>
            </div>

            <div className="absolute right-8 bottom-8 flex gap-4">
              <button className="bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
                <FiArrowUpRight className="w-5 h-5" />
                <span>Buy Position</span>
              </button>
              <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
                <FiArrowUpRight className="w-5 h-5" />
                <span>Sell Position</span>
              </button>
            </div>
          </div>

          
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-400">
              <FiDollarSign className="w-5 h-5" />
              <span className="font-mono">Connected to Mainnet</span>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform">
              Connect Wallet
            </button>
          </div>

          
          <div className="absolute inset-0 -z-10">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      
      <div className="absolute left-1/2 -translate-x-1/2 bottom-24 opacity-10 blur-3xl">
        <div className="w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
      </div>
    </section>
  );
};

export default Demo;