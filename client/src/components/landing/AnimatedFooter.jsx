import React from 'react';
import { motion } from "framer-motion";
import { FiArrowUp, FiTwitter, FiGithub } from 'react-icons/fi';

const AnimatedFooter = () => {
  const socialLinks = [
    { name: 'Twitter', icon: <FiTwitter />, url: '#' },
    { name: 'GitHub', icon: <FiGithub />, url: '#' },
    { name: 'Medium', icon: <FiArrowUp />, url: '#' }
  ];

  return (
    <footer className="relative border-t border-gray-700/50 mt-32 py-16 px-6 bg-gray-900/30 backdrop-blur-lg">

      <div className="absolute inset-0 opacity-20 bg-grid-white/5 [mask-image:linear-gradient(to_top,transparent,black,transparent)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {socialLinks.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-gray-400 hover:text-transparent cursor-pointer p-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: 'spring', stiffness: 120 }
                }
              }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-2">
                {React.cloneElement(item.icon, { 
                  className: "w-5 h-5 group-hover:text-cyan-400 transition-colors",
                  strokeWidth: 1.5
                })}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text group-hover:animate-gradient-x">
                  {item.name}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="text-gray-400 text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          © {new Date().getFullYear()} <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Web3AI</span>. All rights reserved.
        </motion.p>

        
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl hover:border-cyan-400/30 transition-all group"
          whileHover={{ scale: 1.1 }}
        >
          <FiArrowUp className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </motion.button>
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-shimmer" />
    </footer>
  )
}

export default AnimatedFooter;