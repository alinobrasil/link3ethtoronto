// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract LinkThreeProfile {
    address public owner;

    struct UserProfile {
        string about;
        string linkedin;
        string twitter;
        string github;
    }

    mapping(address => UserProfile) private userProfiles;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    function setLinkedin(
        string memory _linkedin,
        address _user
    ) external onlyOwner {
        userProfiles[_user].linkedin = _linkedin;
    }

    function setTwitter(
        string memory _twitter,
        address _user
    ) external onlyOwner {
        userProfiles[_user].twitter = _twitter;
    }

    function setGithub(
        string memory _github,
        address _user
    ) external onlyOwner {
        userProfiles[_user].github = _github;
    }

    function setAbout(string memory _about) external {
        userProfiles[msg.sender].about = _about;
    }

    function getUserProfile(
        address _user
    ) external view returns (UserProfile memory) {
        return userProfiles[_user];
    }
}
