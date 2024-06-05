# MyToken Contract

This `MyToken` contract is an implementation of the ERC20 token standard with ownership functionality provided by the `Ownable` contract from OpenZeppelin. The contract allows the deployment of an ERC20 token with a specified initial supply and includes basic ownership management.

## Features

- **ERC20 Standard**: Implements the ERC20 token standard with functions such as transfer, approve, and transferFrom.
- **Ownable**: Inherits the `Ownable` contract, which provides ownership management functions.
- **Minting**: The initial supply of tokens is minted to the deployer's address.

## Contract Details

### State Variables

- Inherited from `ERC20`:
  - `string public name`: The name of the token.
  - `string public symbol`: The symbol of the token.
  - `uint8 public decimals`: The number of decimals the token uses.
  - `uint256 public totalSupply`: The total supply of tokens.

- Inherited from `Ownable`:
  - `address private _owner`: The address of the current owner.

### Events

### Constructor
```solidity
constructor(uint256 initialSupply) ERC20("MyToken", "MTK") Ownable() {
    _mint(msg.sender, initialSupply);
}
```
- Initializes the contract with the specified initial supply of tokens.
- Mints the initial supply of tokens to the deployer's address.
- Sets the owner of the contract to the deployer's address.

### Functions

## Setup and Deployment
### Pre-requisites
- [Node.js](https://nodejs.org)
- [Hardhat](https://hardhat.org)
- [Ethers.js](https://docs.ethers.io/v5/)
- [OpenZeppelin Contracts]

### Installation
1. Clone the repository: `git clone https://github.com/yx-fan/contract_collections.git`
2. Move into the project directory: `cd contract_collections`
3. Install the dependencies: `npm install`

### Deploy the Contract
1. Compile the contracts: `npx hardhat compile`
2. Start the Hardhat node: `npx hardhat node`
3. Deploy the contract to the local network: `npx hardhat run scripts/deploy_mytoken.js --network localhost`

## Notes
- This contract is for educational purposes only and has not been audited.
- The contract owner can mint tokens to any address.
- The contract owner can transfer ownership to another address.
- The contract owner can renounce ownership, making the contract ownerless.

## License
This project is licensed under the [MIT License](LICENSE).
[]: # (end)