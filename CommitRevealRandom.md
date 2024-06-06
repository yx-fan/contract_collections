# CommitRevealRandom Contract

The `CommitRevealRandom` contract is a simple implementation of the commit-reveal scheme for generating a random number. Users can commit a hash of their secret, and later reveal their secret. Once secrets are revealed, the combined hash can be used to generate a random number.

## Features

- **Commit**: Users can commit a hash of their secret.
- **Reveal**: Users can reveal their secret to contribute to the combined hash.
- **Random Number Generation**: A random number is generated from the combined hash of all revealed secrets.

## Contract Details

### State Variables

- `struct Commit`: Represents a user's commitment, consisting of a hash and a boolean indicating whether it has been revealed.
- `mapping(address => Commit) public commits`: Stores the commitments of users.
- `uint256 public revealedCount`: Tracks the number of revealed commitments.
- `bytes32 public combinedHash`: The combined hash of all revealed secrets.

### Functions

#### `commit(bytes32 _hash)`
Allows a user to commit a hash of their secret.
- **Parameters**:
  - `_hash`: The hash of the user's secret.
- **Requirements**:
  - The user must not have already committed.

#### `reveal(bytes32 _secret)`
Allows a user to reveal their secret.
- **Parameters**:
  - `_secret`: The user's secret.
- **Requirements**:
  - The hash of the secret must match the user's committed hash.

#### `getRandomNumber()`
Returns a random number generated from the combined hash of all revealed secrets.
- **Returns**:
  - A random number.
- **Requirements**:
  - At least one commitment must have been revealed.

## Setup and Deployment

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.io/v5/)

### Installation
1. Clone the repository: `git clone https://github.com/yx-fan/contract_collections.git`
2. Move into the project directory: `cd contract_collections`
3. Install the dependencies: `npm install`

### Deploy the Contract
1. Compile the contracts: `npx hardhat compile`
2. Start the Hardhat node: `npx hardhat node`
3. Deploy the contract to the local network: `npx hardhat run scripts/deploy_commitrevealrandom.js --network localhost`

## Notes
- This contract is for educational purposes only and has not been audited.
- The random number generation is based on the combined hash of all revealed secrets.
- The contract owner can reveal any commitment to contribute to the combined hash.

## License
This project is licensed under the [MIT License](LICENSE).
[]: # (end)