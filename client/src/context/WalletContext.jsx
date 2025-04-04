import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(localStorage.getItem("walletAddress") || null);

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is required to connect your wallet.");
        return;
      }
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]); // Store in localStorage
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress"); // Clear storage
  };

  // Ensure the wallet remains connected on reload
  useEffect(() => {
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
