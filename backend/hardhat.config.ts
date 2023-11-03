import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const url = process.env.RPC || ""
const chainId = Number(process.env.CHAIN_ID) || 1
const key = process.env.PRIV_KEY || ""

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    maxxChain: {
      url,
      chainId,
      accounts: [key]
    }
  },
  etherscan: {
    apiKey: {
      maxxChain: "10201"
    },
    customChains: [
      {
        network: "maxxChain",
        chainId,
        urls: {
          apiURL: `${url}/api`,
          browserURL: url
        }
      }
    ]
  }
};

export default config;
