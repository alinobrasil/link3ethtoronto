require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" })


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    defaultNetwork: "sepolia",
    networks: {
        sepolia: {
            url: process.env.SEPOLIA_RPC,
            accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY2],
        },
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_KEY
        }
    }

};
