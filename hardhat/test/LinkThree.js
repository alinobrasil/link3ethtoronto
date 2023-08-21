const { expect } = require('chai');
const { ethers } = require('hardhat');
const artifact = require('../artifacts/contracts/LinkThree.sol/LinkThree.json');

describe('LinkThree Contract', function () {
    let theContract;
    let owner;
    let user;



    before(async function () {
        theContract = await ethers.getContractAt(
            artifact.abi,
            '0xDF4e92E8c18443882d8A7eC1A43571A888F68097'
        );

        [owner, user] = await ethers.getSigners();


    });

    // it('should set user social IDs', async function () {
    //     console.log("owner: ", owner.address);
    //     console.log("user: ", user.address);

    //     const userProfileInput = {
    //         linkedin: 'tracymcgrady',
    //         twitter: 'orlando1',
    //         github: 'raptors',
    //     };

    //     const tx = await theContract.connect(owner).setUserProfile(user.address, userProfileInput);
    //     await tx.wait();

    //     // const userProfile = await theContract.getUserProfile(user.address);
    //     // expect(userProfile.linkedin).to.equal(userProfileInput.linkedin);
    //     // expect(userProfile.twitter).to.equal(userProfileInput.twitter);
    //     // expect(userProfile.github).to.equal(userProfileInput.github);
    // });

    // it('should set user bio and link', async function () {

    //     const userBioInput = {
    //         bio: 'i play ball',
    //         link: 'michaeljordan.com',
    //     };

    //     const tx2 = await theContract.connect(user).setUserBioAndLink(userBioInput);
    //     await tx2.wait();

    //     // const userProfile = await theContract.getUserProfile(user.address);
    //     // expect(userProfile.bio).to.equal(userBioInput.bio);
    //     // expect(userProfile.link).to.equal(userBioInput.link);
    // });


    // it('update bio and link', async function () {
    //     const userBioInput = {
    //         bio: 'im the goat',
    //         link: 'messi.com',
    //     };

    //     const tx2 = await theContract.connect(owner).setUserBioAndLink(userBioInput);
    //     await tx2.wait();

    //     const userProfile = await theContract.getUserProfile(user.address);
    //     expect(userProfile.bio).to.not.equal(userBioInput.bio);
    //     expect(userProfile.link).to.not.equal(userBioInput.link);

    //     const userProfile2 = await theContract.getUserProfile(owner.address);
    //     expect(userProfile2.bio).to.equal(userBioInput.bio);
    //     expect(userProfile2.link).to.equal(userBioInput.link);

    // });

    it('update only one field of bio', async function () {
        const userBioInput = {
            bio: '',
            link: 'messi.net',
        };

        const tx2 = await theContract.connect(owner).setUserBioAndLink(userBioInput);
        await tx2.wait();

        const userProfile2 = await theContract.getUserProfile(owner.address);

        expect(userProfile2.bio).to.equal("im the goat");
        expect(userProfile2.link).to.equal(userBioInput.link);

    });



});


