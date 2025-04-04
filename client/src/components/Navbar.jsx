import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { FaPlug, FaWallet } from "react-icons/fa";
import { FiDroplet, FiCopy } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = () => {
  const { account, balance, connectWallet } = useContext(WalletContext);

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
  };

  return (
    <nav className="w-full p-4 bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Web3AI
        </h1>
      </div>
      {account ? (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600">
            <FiDroplet className="text-cyan-400" />
            <span className="font-mono text-sm text-cyan-300">
              {parseFloat(balance).toFixed(3)} ETH
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600 group cursor-pointer"
               onClick={copyAddress}>
            <FaWallet className="text-blue-400" />
            <span className="font-mono text-sm text-gray-300">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <FiCopy className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={connectWallet}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
        >
          <FaPlug className="text-lg" />
          <span>Connect Wallet</span>
        </motion.button>
      )}
    </nav>
  );
};

export default Navbar;