// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract LinkThree {
    address public owner;

    struct UserProfile {
        string bio;
        string link;
        string linkedin;
        string twitter;
        string github;
    }

    struct UserSocialInput {
        string linkedin;
        string twitter;
        string github;
    }

    struct UserBioInput {
        string bio;
        string link;
    }

    mapping(address => UserProfile) private userProfiles;

    constructor() {
        owner = msg.sender;
    }

    function setUserProfile(
        address _user,
        UserSocialInput memory _input
    ) external onlyOwner {
        UserProfile storage profile = userProfiles[_user];

        if (bytes(_input.linkedin).length > 0) {
            profile.linkedin = _input.linkedin;
        }

        if (bytes(_input.twitter).length > 0) {
            profile.twitter = _input.twitter;
        }

        if (bytes(_input.github).length > 0) {
            profile.github = _input.github;
        }
    }

    function setUserBioAndLink(UserBioInput memory _input) external {
        UserProfile storage profile = userProfiles[msg.sender];

        if (bytes(_input.bio).length > 0) {
            profile.bio = _input.bio;
        }

        if (bytes(_input.link).length > 0) {
            profile.link = _input.link;
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
