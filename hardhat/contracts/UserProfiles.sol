// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract UserProfiles {
    address public owner;

    struct UserProfile {
        string bio;
        string link;
        string linkedin;
        string twitter;
        string github;
    }

    mapping(address => UserProfile) private userProfiles;

    constructor() {
        owner = msg.sender;
    }

    function setUserProfile(
        address _user,
        string memory _bio,
        string memory _link,
        string memory _linkedin,
        string memory _twitter,
        string memory _github
    ) external onlyOwner {
        UserProfile storage profile = userProfiles[_user];

        if (bytes(_bio).length > 0) {
            profile.bio = _bio;
        }

        if (bytes(_link).length > 0) {
            profile.link = _link;
        }

        if (bytes(_linkedin).length > 0) {
            profile.linkedin = _linkedin;
        }

        if (bytes(_twitter).length > 0) {
            profile.twitter = _twitter;
        }

        if (bytes(_github).length > 0) {
            profile.github = _github;
        }
    }

    function setUserBioAndLink(
        string memory _bio,
        string memory _link
    ) external {
        UserProfile storage profile = userProfiles[msg.sender];

        if (bytes(_bio).length > 0) {
            profile.bio = _bio;
        }

        if (bytes(_link).length > 0) {
            profile.link = _link;
        }
    }

    function getUserProfile(
        address _user
    ) external view returns (UserProfile memory) {
        return userProfiles[_user];
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }
}
