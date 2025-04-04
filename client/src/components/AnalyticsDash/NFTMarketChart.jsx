import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import useMarketVolume from "../../hooks/useMarketVolume";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NFTMarketChart = () => {
  const chartData = useMarketVolume();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#cbd5e1", font: { size: 14 } },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#e2e8f0",
        bodyColor: "#cbd5e1",
        borderColor: "#334155",
        borderWidth: 1,
      },
    },
    scales: {
      x: { grid: { color: "rgba(51, 65, 85, 0.2)" }, ticks: { color: "#94a3b8" } },
      y: {
        grid: { color: "rgba(51, 65, 85, 0.2)" },
        ticks: {
          color: "#94a3b8",
          callback: (value) => `${value} USD`,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gray-800/30 p-6 rounded-2xl border border-gray-700 backdrop-blur-lg"
    >
      {/* Gradient Border Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl -z-10" />      

      {/* Chart Container */}
      <div className="h-96">
        {chartData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="animate-pulse h-full w-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-xl" />
        )}
      </div>
    </motion.div>
  );
};

export default NFTMarketChart;
