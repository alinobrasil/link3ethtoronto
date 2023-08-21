const ethers = require('ethers');
require("dotenv").config({ path: ".env" })

const contractArtifact = require("./SocialIDs.json")

const providerUrl = process.env.SEPOLIA_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log("provider and key: ", providerUrl, PRIVATE_KEY)

const contractAddress = "0xD674273B88947f01e6D83d13346277441671abC4"


console.log("setting up provider and signer.....")
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const thecontract = new ethers.Contract(
    contractAddress,
    contractArtifact.abi,
    signer
);

console.log("Contract Address: ", thecontract.address)
const setFacebook = async (address, data) => {
    try {
        let tx = await thecontract.setFacebookID(address, data)
        let result = await tx.wait()
        console.log(result)

        return result
    } catch (err) {
        console.log(err)
    }
}

const setLinkedin = async (address, data) => {
    try {
        let tx = await thecontract.setLinkedinID(address, data)
        let result = await tx.wait()
        console.log(result)

        return result
    } catch (err) {
        console.log(err)
    }
}



module.exports = { setFacebook, setLinkedin }

// setFacebook("0xFC78985EBC569796106dd4b350a3e0Ac6c5c110c", "MichaelJordan");

