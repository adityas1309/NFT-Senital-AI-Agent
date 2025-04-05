import { useState, useEffect } from "react";
import OpenSea from "./OpenSea";
import AiAnalysis from "./AiAnalysis";
import TwitterMsg from "./TwitterMsg";
import AiTrade from "./AiTrade";

const AISection = () => {
  const [tradeData, setTradeData] = useState(() => {
    const savedData = localStorage.getItem("tradeData");
    return savedData ? JSON.parse(savedData) : null;
  });
  const [loading, setLoading] = useState(!tradeData);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://nft-senital-ai-agent-mx3d.vercel.app/api/auto-trade");
      if (!response.ok) {
        throw new Error("Failed to fetch AI analysis");
      }
      const data = await response.json();

      console.log("📡 Received Trade Data:", data); // Debugging API response

      if (data && data.token) {
        setTradeData(data);
        localStorage.setItem("tradeData", JSON.stringify(data)); // ✅ Save to localStorage
      }
      setError(null);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError("Failed to fetch AI analysis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tradeData) {
      fetchData();
    }
    const interval = setInterval(fetchData, 180000); // 🔄 Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>⏳ Loading AI Analysis...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!tradeData) return <p>No trade data available</p>;

  const { 
    token = "N/A", 
    telegramMessage = "No message found", 
    twitterMessages = [], 
    openSeaData = null,
    aiDecision = { action: "No Action", reason: "No AI analysis available" }, // ✅ Ensure structure
  } = tradeData;

  console.log("🎯 Processed AI Decision:", aiDecision); // Debugging AI decision

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-4 sm:p-8">
      {/* Radial Gradient Background */}
      <div className="fixed inset-0 -z-10" 
           style={{
             background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0) 70%)'
           }} />
  
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Top Row: AI Trade & Market Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Trading Card (Compact) */}
          <div className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Live Trading Signal
            </h3>
            <AiTrade token={token} action={aiDecision.action} telegramMessage={telegramMessage} />
          </div>
  
          {/* NFT Market Data */}
          <div className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              NFT Market Pulse
            </h3>
            <OpenSea openSeaData={openSeaData} />
          </div>
        </div>
  
        {/* Social Sentiment Row */}
        <div className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Social Sentiment
          </h3>
          <TwitterMsg twitterMessages={twitterMessages} />
        </div>
  
        {/* AI Analysis Section */}
        <div className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Predictive Insights
          </h3>
          <AiAnalysis aiAnalysis={aiDecision.reason} />
        </div>
      </div>
    </div>
  );
};

export default AISection;