async function main() {

    // --- Deploy the contract ---
    const { ethers } = require("hardhat");

    // Obtain the deployer and other users information
    const [deployer, user1, user2] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Obtain the deployer's balance
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", balance.toString());

    // Deploy the contract
    const CommitRevealRandom = await ethers.getContractFactory("CommitRevealRandom");
    const commitRevealRandom = await CommitRevealRandom.deploy();

    // Wait for the contract to be deployed
    await commitRevealRandom.waitForDeployment();
    console.log("CommitRevealRandom contract deployed to:", commitRevealRandom.target);

    // --- Interact with the contract ---
    // Get the contract address
    const contractAddress = commitRevealRandom.target;
    const commitRevealRandomContract = await ethers.getContractAt("CommitRevealRandom", contractAddress);

    // User1 commits a secret
    const secret1 = ethers.encodeBytes32String("secret1");
    const hash1 = ethers.keccak256(secret1);
    await commitRevealRandomContract.connect(user1).commit(hash1);
    console.log("User1 committed with hash:", hash1);

    // User2 commits a secret
    const secret2 = ethers.encodeBytes32String("secret2");
    const hash2 = ethers.keccak256(secret2);
    await commitRevealRandomContract.connect(user2).commit(hash2);
    console.log("User2 committed with hash:", hash2);

    // User1 reveals the secret
    await commitRevealRandomContract.connect(user1).reveal(secret1);
    console.log("User1 revealed secret1");

    // User2 reveals the secret
    await commitRevealRandomContract.connect(user2).reveal(secret2);
    console.log("User2 revealed secret2");

    // Get the random number
    const randomNumber = await commitRevealRandomContract.getRandomNumber();
    console.log("Random number:", randomNumber.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
