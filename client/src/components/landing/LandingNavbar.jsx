import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLogIn, FiBox } from "react-icons/fi";

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 ${
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <FiBox className="w-6 h-6 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Web3AI
            </span>
          </motion.div>

          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-blue-600/80 to-cyan-500/80 backdrop-blur-md px-6 py-3 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
          >
            <FiLogIn className="w-5 h-5" />
            <span>Get Started</span>
            <div className="absolute inset-0 border-2 border-blue-400/30 rounded-xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default LandingNavbar;