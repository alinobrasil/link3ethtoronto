const ethers = require('ethers');
require("dotenv").config({ path: ".env" })

const contractArtifact = require("./LinkThreeProfile.json")

const providerUrl = process.env.SEPOLIA_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log("provider and key: ", providerUrl, PRIVATE_KEY)

const contractAddress = process.env.CONTRACT_ADDRESS

console.log("setting up provider and signer.....")
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const thecontract = new ethers.Contract(
    contractAddress,
    contractArtifact.abi,
    signer
);

console.log("\nContract Address: ", thecontract.address)

const setLinkedin = async (data, address) => {
    try {
        const jsonString = JSON.stringify(data);

        let tx = await thecontract.setLinkedin(jsonString, address)
        let result = await tx.wait()
        // console.log(result)
        console.log("Finished writing to smart contract")

        return result
    } catch (err) {
        console.log(err)
    }
}



// const liteProfile = {
//     "localizedLastName": "Kim",
//     "profilePicture": {
//         "displayImage": "urn:li:digitalmediaAsset:C4D03AQElAkFBn3ik3w"
//     },
//     "firstName": {
//         "localized": {
//             "en_US": "Ali"
//         },
//         "preferredLocale": {
//             "country": "US",
//             "language": "en"
//         }
//     },
//     "lastName": {
//         "localized": {
//             "en_US": "Kim"
//         },
//         "preferredLocale": {
//             "country": "US",
//             "language": "en"
//         }
//     },
//     "id": "BDtqE0dI3v",
//     "localizedFirstName": "Ali"
// }
// const jsonString = JSON.stringify(liteProfile);

// setLinkedin(jsonString, "0x42A2C59dCF95D804131C859A8382aC49d55b04bd");

module.exports = { setLinkedin }

