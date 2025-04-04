import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiDatabase, FiDollarSign } from 'react-icons/fi';

export const BlockchainStats = () => {
  const stats = [
    { 
      id: 1,
      title: '24h Volume',
      value: '$12.4M',
      icon: <FiDollarSign />,
      change: '+3.2%',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 2,
      title: 'Collections',
      value: '2.1k',
      icon: <FiDatabase />,
      change: '+15%',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 3,
      title: 'Trades',
      value: '48.2k',
      icon: <FiTrendingUp />,
      change: '+8%',
      color: 'from-green-400 to-cyan-500'
    }
  ];

  return (
    <motion.div 
      className="relative bg-gray-900/80 backdrop-blur-xl py-8 border-y border-gray-800/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      
      <div className="absolute inset-0 opacity-10 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 animate-shimmer" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="group relative bg-gray-800/30 hover:bg-gray-700/40 rounded-2xl p-6 backdrop-blur-lg border border-gray-700/50 hover:border-cyan-400/20 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: 'spring', stiffness: 120 }
                }
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      {React.cloneElement(stat.icon, { 
                        className: 'w-6 h-6 text-white',
                        strokeWidth: 1.5
                      })}
                    </div>
                    <span className="font-medium text-gray-400">{stat.title}</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                    <span className={`text-sm ${
                      stat.change.startsWith('+') 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>

                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="absolute -top-1 -right-1">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-full animate-ping`} />
                  <div className={`w-3 h-3 relative bg-gradient-to-r ${stat.color} rounded-full`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};