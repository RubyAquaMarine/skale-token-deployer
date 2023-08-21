import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";

/*
import "./tasks/ima_registration";
import "./tasks/launch";
import "./tasks/launch_order_public_mint";
import "./tasks/launch_public_mint";
*/
dotenv.config();

const PRIVATE_KEY: string | undefined = process.env.ADMIN_KEY_TESTNET;// ADMIN_KEY_TESTNET or ADMIN_KEY
if (!PRIVATE_KEY) {
  throw new Error("Private Key Not Set in .env");
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.5.0",
      },
      {
        version: "0.5.5",
        settings: {},
      },
      {
        version: "0.5.16",
        settings: {},
      },
      {
        version: "0.6.2",
        settings: {},
      },
      {
        version: "0.6.7",
        settings: {},
      },
      {
        version: "0.8.0",
        settings: {},
      },
      {
        version: "0.8.1",
        settings: {},
      },
      {
        version: "0.8.9",
        settings: {},
      },
      {
        version: "0.8.19",
        settings: {},
      },
    ],
  },
  networks: {
    calypso: {
      url: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague",
      accounts: [PRIVATE_KEY],
    },
    europa: {
      chainId: 2046399126,
      url: "https://mainnet.skalenodes.com/v1/elated-tan-skat",
      accounts: [PRIVATE_KEY],
      gas: 100000000,
    },
    nebula: {
      url: "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
      accounts: [PRIVATE_KEY],
    },
    "calypso-testnet": {
      url: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
      accounts: [PRIVATE_KEY],
    },
    "chaos-testnet": {
      url: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
      accounts: [PRIVATE_KEY],
    },
    "nebula-testnet": {
      url: "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
      accounts: [PRIVATE_KEY],
    },
    "europa-testnet": {
      url: "https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor",
      accounts: [PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    tokenOwner: 1,
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  },
};

export default config;
