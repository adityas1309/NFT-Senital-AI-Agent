import React from 'react'
import { motion } from 'framer-motion';
import { FiActivity, FiShield, FiBell } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiActivity />,
      title: "AI-Powered Analysis",
      description: "Our neural networks process social signals from Telegram and Twitter to generate real-time alpha",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <FiShield />,
      title: "Secure Web3 Trading",
      description: "Non-custodial transactions powered by WalletConnect with multi-chain support",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <FiBell />,
      title: "Real-Time Alerts",
      description: "Smart notifications for NFT floor sweeps and emerging collection trends",
      gradient: "from-green-400 to-cyan-500"
    }
  ];

  return (
    <section className="relative py-20 px-6 bg-gray-900/50 border-y border-gray-800/50 backdrop-blur-lg">
      
      <div className="absolute inset-0 opacity-10 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { type: 'spring', stiffness: 100 }
            }
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Why Choose Us?
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-gray-800/30 hover:bg-gray-700/40 p-8 rounded-3xl border border-gray-700/50 hover:border-cyan-400/20 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: 'spring', stiffness: 120 }
                }
              }}
              whileHover={{ scale: 1.03 }}
            >
              
              <div className={`mb-6 w-fit p-4 rounded-2xl bg-gradient-to-br ${feature.gradient}`}>
                {React.cloneElement(feature.icon, { 
                  className: "w-8 h-8 text-white",
                  strokeWidth: 1.5
                })}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>

              
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/20 transition-all duration-500 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20" />
            </motion.div>
          ))}
        </div>

        
        <div className="hidden md:block absolute inset-x-0 top-1/3 h-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-green-400/20 opacity-50" />
      </motion.div>
    </section>
  );
};

export default Features;