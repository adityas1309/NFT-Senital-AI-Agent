import React from 'react';
import { useNavigate } from "react-router";
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden isolate">
      
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-110 video-background"
          
        >
          <source src="/hero1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-purple-900/30" />
      </div>

      <div className="absolute inset-0 z-1 opacity-30">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 text-center px-6 max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
       <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                type: 'spring',
                stiffness: 120,
                damping: 20
              }
            }
          }}
        >
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient-x pb-1">
              Next-Gen
            </span> 
            <br />
            <motion.span 
              className="inline-block mt-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              style={{
                lineHeight: '1.1', 
                paddingBottom: '0.15em' 
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              NFT Trading
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                type: 'spring',
                stiffness: 100,
                delay: 0.3
              }
            }
          }}
        >
          <p className="text-2xl md:text-4xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text font-medium">
              AI-Powered Insights
            </span> for Decentralized Markets
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { 
                type: 'spring',
                stiffness: 200,
                damping: 15
              }
            }
          }}
        >
          <button
            onClick={() => navigate("/login")}
            className="group relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 text-white px-10 py-5 rounded-[2rem] font-semibold text-xl transition-all duration-300 transform hover:scale-[1.03] shadow-2xl shadow-blue-500/20 hover:shadow-cyan-500/30"
          >
            <div className="flex items-center gap-3 relative z-10">
              <span>Start Trading</span>
              <FiArrowRight className="transform group-hover:translate-x-2 transition-transform duration-200 ease-out" />
            </div>
            
            
            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
              <div className="absolute -inset-[5px] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12" />
              </div>
            </div>

            
            <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-cyan-300/50 transition-all duration-500" />
          </button>
        </motion.div>

        
        <div className="absolute inset-0 -z-10 opacity-20">
          <div 
            className="absolute inset-0 bg-grid-white/10"
            style={{ 
              maskImage: 'linear-gradient(to bottom, transparent 5%, black 30%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 30%, transparent 95%)'
            }}
          />
        </div>
      </motion.div>

     
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <div className="w-8 h-12 rounded-3xl border-2 border-cyan-400/80 flex justify-center">
          <div className="w-1 h-2 bg-cyan-400/80 rounded-full mt-2 animate-scroll-indicator" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero