# Lock Contract

This `Lock` contract allows users to lock Ether in the contract until a specified unlock time. After the unlock time has passed, only the owner of the contract can withdraw the Ether.

## Features
- **Lock Ether**: Anyone can send Ether to the contract, and it will be locked until the unlock time.
- **Withdraw Ether**: After the unlock time, only the contract owner can withdraw the Ether.
- **Receive Function**: Allows the contract to accept Ether.

## Contract Details

### State Variables
- `uint public unlockTime`: The timestamp after which the owner can withdraw the Ether.
- `address payable public owner`: The address of the contract owner who can withdraw the Ether after the unlock time.

### Events
- `event Withdrawal(uint amount, uint when)`: Emitted when the owner withdraws Ether from the contract.

### Constructor
```solidity
constructor(uint _unlockTime) payable
```
- Initializes the contract with an unlock time and sets the contract owner to the address that deploys the contract.
- Ensures the unlock time is in the future.
- Accepts Ether to be locked in the contract.

### Functions
- `function withdraw() public`: Allows the owner to withdraw the Ether after the unlock time has passed.
- `receive() external payable`: Allows the contract to accept Ether.

## Setup and Deployment
### Pre-requisites
- [Node.js](https://nodejs.org)
- [Hardhat](https://hardhat.org)
- [Ethers.js](https://docs.ethers.io/v5/)

### Installation
1. Clone the repository: `git clone https://github.com/yx-fan/contract_collections.git`
2. Move into the project directory: `cd contract_collections`
3. Install the dependencies: `npm install`

### Deploy the Contract
1. Compile the contracts: `npx hardhat compile`
2. Start the Hardhat node: `npx hardhat node`
3. Deploy the contract to the local network: `npx hardhat run scripts/deploy.js --network localhost`

## Notes
- This contract is for educational purposes only and has not been audited.
- The contract owner can withdraw the Ether after the unlock time has passed.
- The contract does not have any restrictions on the amount of Ether that can be locked.
- The `delay` function is used to simulate the passage of time in the tests.

## License
This project is licensed under the [MIT License](LICENSE).
[]: # (end)