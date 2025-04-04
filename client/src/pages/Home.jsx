import React, { useState } from "react";
import { FiHome, FiDollarSign, FiActivity, FiSettings, FiMenu } from "react-icons/fi";
import Navbar from "../components/Navbar";

const Home = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-16 bg-gray-800 flex flex-col transition-all duration-300 ease-in-out z-50"> {/* Added z-50 */}
          <div className="flex items-center justify-center p-4 border-b border-gray-700">
            <FiMenu className="text-2xl text-cyan-400" />
          </div>

          <nav className="flex-1 p-2 space-y-2">
            {[
              { icon: <FiHome />, text: "Dashboard", section: "dashboard" },
              { icon: <FiDollarSign />, text: "Transactions", section: "transactions" },
              { icon: <FiActivity />, text: "Live Trading", section: "live-trading" },
              { icon: <FiSettings />, text: "Settings", section: "settings" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(item.section)}
                className={`w-full flex items-center justify-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-cyan-400 transition-colors group relative ${
                  activeSection === item.section ? "bg-gray-700 text-cyan-400" : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <div className="absolute left-16 ml-2 hidden group-hover:block bg-gray-800 px-3 py-1 rounded-md text-sm shadow-lg z-50"> {/* Added z-50 */}
                  {item.text}
                </div>
              </button>
            ))}
          </nav>
        </aside>

        
        <main className="flex-1 overflow-y-auto p-2">
          
          {activeSection === "live-trading" && <AnalyticsDashboard />}
        </main>
      </div>
    </div>
  );
};

export default Home;
