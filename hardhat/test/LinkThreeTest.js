const { expect } = require('chai');
const { ethers } = require('hardhat');
const artifact = require('../artifacts/contracts/LinkThreeProfile.sol/LinkThreeProfile.json');

describe('LinkThree Contract', function () {
    let theContract;
    let owner;
    let user;

    const sepoliaContractAddress = '0xbe4c1F5E32744C26b3d6Ad802f99696c1239f0Cc';
    const xdcContractAddress = '0x7b741f88a74912801ec967e2fe24af633a668319'

    before(async function () {
        theContract = await ethers.getContractAt(
            artifact.abi,
            xdcContractAddress
        );

        [owner, user] = await ethers.getSigners();
        console.log("owner: ", owner.address);
        console.log("user: ", user.address);

    });



    it('Set full profile - ALi', async function () {
        let tx = await theContract.connect(owner).setLinkedin("alikim456", user.address);
        await tx.wait();

        tx = await theContract.connect(owner).setGithub("alinobrasil", user.address);
        await tx.wait();

        tx = await theContract.connect(owner).setTwitter("alik_im", user.address);
        await tx.wait();

        tx = await theContract.connect(user).setAbout("I build in Web3. Visit my site: https://alik.im/portfolio");
        await tx.wait();

        const userProfile = await theContract.getUserProfile(user.address);
        console.log(userProfile)
    });



    it('user should set about', async function () {
        const newAboutText = "I build in Web3. Visit my site: https://alik.im/portfolio";
        const tx = await theContract.connect(user).setAbout(newAboutText);
        await tx.wait();

        const userProfile = await theContract.getUserProfile(user.address);
        console.log(userProfile)

        expect(userProfile.about).to.equal(newAboutText);
    });



    it('owner setting github', async function () {
        const newValue = "erwinqxy";
        const tx = await theContract.connect(owner).setGithub(newValue, owner.address);
        await tx.wait();

        const userProfile = await theContract.getUserProfile(owner.address);
        console.log(userProfile)

        expect(userProfile.github).to.equal(newValue);
    });



    it('owner sets about text', async function () {

        const newAboutText = "I work in the crypto space";
        const tx = await theContract.connect(owner).setAbout(newAboutText);
        await tx.wait();

        const userProfile = await theContract.getUserProfile(owner.address);
        console.log(userProfile)

        expect(userProfile.about).to.equal(newAboutText);
    });



});


