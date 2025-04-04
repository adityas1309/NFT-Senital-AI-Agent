import { useContext, useEffect } from "react";
import { WalletContext } from "../context/WalletContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock } from "react-icons/fi";

const Login = () => {
  const { account, connectWallet, isConnecting } = useContext(WalletContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (account) navigate("/home");
  }, [account, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10" />

      <motion.div 
        className="relative z-10 bg-gray-900/80 backdrop-blur-xl rounded-[3rem] p-12 border border-gray-700/50 shadow-2xl max-w-md w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
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

        <div className="text-center space-y-8">
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            >
            <div className="mb-8 flex justify-center">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500">
                <FiLock className="w-12 h-12 text-white" strokeWidth="1.5" />
                </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Secure Web3 Access
            </h1>
            <p className="text-gray-400 text-lg">
                Connect your wallet to unlock AI-powered NFT trading insights
            </p>
        </motion.div>

          <motion.button
            onClick={connectWallet}
            disabled={isConnecting}
            className="group relative w-full bg-gradient-to-br from-cyan-500 to-blue-500 p-1 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30"
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative z-10 bg-gray-900 rounded-xl p-5 transition-all duration-300 group-hover:bg-gray-900/50">
              <div className="flex items-center justify-center gap-3">
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-cyan-500 rounded-full animate-spin" />
                    <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Connecting...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Connect Wallet
                    </span>
                    <FiArrowRight className="w-5 h-5 text-cyan-400 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -inset-[100px] bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#3b82f6_50%,#22d3ee_100%)] animate-shimmer" />
            </div>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-500 mt-8"
          >
            Supports MetaMask, Coinbase Wallet, and WalletConnect
          </motion.p>
        </div>
      </motion.div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  );
};

export default Login;