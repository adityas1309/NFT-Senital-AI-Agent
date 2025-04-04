import React from 'react';
import { motion } from "framer-motion";
import { FiArrowUpRight } from 'react-icons/fi';

const AnimatedCTA = () => {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-gray-900 to-transparent">
      
      <div className="absolute inset-0 opacity-20 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="group relative"
        >
          
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-[2rem] blur-xl opacity-30 animate-shimmer" />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-[2rem] p-px shadow-2xl overflow-hidden"
          >
            <div className="relative bg-gray-900/80 rounded-[2rem] p-12">
              
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

              <motion.h3
                className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Start Trading Smarter Today
              </motion.h3>

              <motion.p
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Join thousands of NFT traders leveraging <span className="text-cyan-400">AI-powered insights</span>
              </motion.p>

              <motion.button
                onClick={() => navigate("/signup")}
                className="group relative bg-gradient-to-br from-blue-600 to-cyan-500 px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3 justify-center">
                  <span className="relative z-10">Get Early Access</span>
                  <FiArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-gradient-to-t from-cyan-500/20 to-transparent blur-3xl" />
    </section>
  )
}

export default AnimatedCTA