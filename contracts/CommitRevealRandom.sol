// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommitRevealRandom {
    struct Commit {
        bytes32 hash;
        bool revealed;
    }

    mapping(address => Commit) public commits;
    uint256 public revealedCount;
    bytes32 public combinedHash;

    function commit(bytes32 _hash) public {
        require(commits[msg.sender].hash == bytes32(0), "Already committed");
        commits[msg.sender] = Commit(_hash, false);
    }

    function reveal(bytes32 _secret) public {
        require(commits[msg.sender].hash == keccak256(abi.encodePacked(_secret)), "Invalid secret");
        commits[msg.sender].revealed = true;
        combinedHash = keccak256(abi.encodePacked(combinedHash, _secret));
        revealedCount++;
    }

    function getRandomNumber() public view returns (uint256) {
        require(revealedCount > 0, "No reveals yet");
        return uint256(combinedHash);
    }
}