async function main() {

    // --- Deploy the contract ---
    const { ethers } = require("hardhat");

    // Get deployer account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get deployer balance
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", balance.toString());

    // Deploy contract
    const Token = await ethers.getContractFactory("MyToken");
    const initialSupply = ethers.parseUnits("1000000", 18); // 1 million tokens
    const token = await Token.deploy(initialSupply);

    // Wait for the contract to be deployed
    await token.waitForDeployment();
    console.log("Token contract deployed to:", token.target);

    // --- Interact with the contract ---
    // Get the contract address
    const contractAddress = token.target;
    const tokenContract = await ethers.getContractAt("MyToken", contractAddress);

    // Get the contract owner and total supply
    const ownerFromContract = await tokenContract.owner();
    const totalSupply = await tokenContract.totalSupply();
    console.log("Contract owner:", ownerFromContract);
    console.log("Total supply:", totalSupply.toString());

    // Transfer some tokens
    const [_, receiver] = await ethers.getSigners();
    const transferAmount = ethers.parseUnits("100", 18); // Transfer 100 tokens

    // Transfer tokens
    const transferTx = await tokenContract.transfer(receiver.address, transferAmount);
    await transferTx.wait();
    console.log("Transferred 100 tokens to:", receiver.address);

    // Verify the receiver's balance
    const receiverBalance = await tokenContract.balanceOf(receiver.address);
    console.log("Receiver balance:", receiverBalance.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
