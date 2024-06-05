async function main() {
    const { ethers } = require("hardhat");

    // --- Deploy the contract ---
    // Obtain the deployer information
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    
    // Obtain the deployer's balance
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", balance.toString());
    
    // Deploy the contract
    const Lock = await ethers.getContractFactory("Lock");
    const unlockTime = Math.floor(Date.now() / 1000) + 30; // 30 seconds from now
    const lock = await Lock.deploy(unlockTime);

    // Wait for the contract to be deployed
    await lock.waitForDeployment();
    console.log("Lock contract deployed to:", lock.target);

    // Verify the contract
    const contractUnlockTime = await lock.unlockTime();
    const contractOwner = await lock.owner();
    console.log("Contract owner:", contractOwner);
    console.log("Contract unlock time:", contractUnlockTime.toString());
    

    // --- Interact with the contract ---
    // Get the contract address
    const contractAddress = lock.target;
    const lockContract = await ethers.getContractAt("Lock", contractAddress);

    // Send some Ether to the contract
    const tx = await deployer.sendTransaction({
        to: contractAddress,
        value: ethers.parseEther("1")
    })
    await tx.wait();
    console.log("Sent 1 Ether to the contract");
    console.log("Contract balance:", (await deployer.provider.getBalance(contractAddress)).toString());

    // Get the contract owner and unlock time
    const unlockTimeFromContract = await lockContract.unlockTime();
    const ownerFromContract = await lockContract.owner();
    console.log("Contract owner:", ownerFromContract);
    console.log("Contract unlock time:", unlockTimeFromContract.toString());

    console.log("Waited for 30 seconds");
    await delay(30000); // Wait for 30 seconds
    // Attempt to withdraw
    try {
        const tx = await lockContract.withdraw();
        await tx.wait();
        console.log("Withdrawn Ether from the contract");
        console.log("Contract balance:", ((await deployer.provider.getBalance(contractAddress)).toString()));
    } catch (error) {
        console.log("Cannot withdraw before the unlock time");
    }
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}