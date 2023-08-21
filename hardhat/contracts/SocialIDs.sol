// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SocialIDs {
    address public owner;

    mapping(address => string) private linkedinIDs;
    mapping(address => string) private twitterIDs;
    mapping(address => string) private facebookIDs;

    constructor() {
        owner = msg.sender;
    }

    function setLinkedinID(
        address _user,
        string memory _id
    ) external onlyOwner {
        linkedinIDs[_user] = _id;
    }

    function getLinkedinID(
        address _user
    ) external view returns (string memory) {
        return linkedinIDs[_user];
    }

    function setTwitterID(address _user, string memory _id) external onlyOwner {
        twitterIDs[_user] = _id;
    }

    function getTwitterID(address _user) external view returns (string memory) {
        return twitterIDs[_user];
    }

    function setFacebookID(
        address _user,
        string memory _id
    ) external onlyOwner {
        facebookIDs[_user] = _id;
    }

    function getFacebookID(
        address _user
    ) external view returns (string memory) {
        return facebookIDs[_user];
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }
}
