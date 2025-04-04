import { config } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

config(); // Load env vars

export default {
  solidity: "0.8.20",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
