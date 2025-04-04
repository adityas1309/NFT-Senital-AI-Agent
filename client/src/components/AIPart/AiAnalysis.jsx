import React from 'react';
import { motion } from 'framer-motion';
import { FiActivity } from 'react-icons/fi';

const AiAnalysis = ({ aiAnalysis }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gray-800/30 p-6 rounded-xl border border-gray-700 backdrop-blur-lg mt-4"
    >
      {/* Gradient Border Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-xl -z-10" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FiActivity className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Predictive Analysis Engine
        </h3>
      </div>

      {/* Content */}
      <div className="pl-9">
        <p className="text-gray-300 leading-relaxed text-lg font-medium">
          {aiAnalysis || (
            <span className="opacity-70">
              Analyzing market patterns and historical data...
            </span>
          )}
        </p>
        
        {/* Animated Status Bar */}
        {!aiAnalysis && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-3 h-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full"
          />
        )}
      </div>
    </motion.div>
  );
};

export default AiAnalysis;