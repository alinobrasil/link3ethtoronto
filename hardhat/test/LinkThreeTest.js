const { expect } = require('chai');
const { ethers } = require('hardhat');
const artifact = require('../artifacts/contracts/LinkThreeProfile.sol/LinkThreeProfile.json');

describe('LinkThree Contract', function () {
    let theContract;
    let owner;
    let user;

    before(async function () {
        theContract = await ethers.getContractAt(
            artifact.abi,
            '0xbe4c1F5E32744C26b3d6Ad802f99696c1239f0Cc'
        );

        [owner, user] = await ethers.getSigners();
        console.log("owner: ", owner.address);
        console.log("user: ", user.address);

    });

    it('owner should set user linkedin', async function () {
        const newValue = "kobe";
        const tx = await theContract.connect(owner).setLinkedin(newValue, user.address);
        await tx.wait();

        const userProfile = await theContract.getUserProfile(user.address);
        console.log(userProfile)

        expect(userProfile.linkedin).to.equal(newValue);


    });

    it('user should set about', async function () {
        const newAboutText = "im #24";
        const tx = await theContract.connect(user).setAbout(newAboutText);
        await tx.wait();

        const userProfile = await theContract.getUserProfile(user.address);
        console.log(userProfile)

        expect(userProfile.about).to.equal(newAboutText);

    });

    it('owner sets about text', async function () {

        const newAboutText = "asdfasdfasdfasdf";
        const tx = await theContract.connect(owner).setAbout(newAboutText);
        await tx.wait();

        const userProfile = await theContract.getUserProfile(owner.address);
        console.log(userProfile)

        expect(userProfile.about).to.equal(newAboutText);

    });



});


