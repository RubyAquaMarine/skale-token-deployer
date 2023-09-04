# Token Deployer : Skale Ecosystem
Dapp chain owners are required to deploy and map tokens from other skale chains in order to use the `ima-bridge/metaport/s2s/` aka multichain-transfers 

The `TokenFactory` smart contracts make it possible to deploy and map tokens from the chain owners MSW or deployer key within 1 transaction. 

## requirements 
- Add your Skale Chain network to the `hardhat.config.ts` file

The deployed contract `TokenFactory` must be granted the following roles.
- REGISTRAR_ROLE : `connectSchain()`
- TOKEN_REGISTRAR_ROLE : `addERC20byOwner()`



## function call 
For dapp chain owners that want to import tokens from another chain aka the EuropaHub, the user will insert `elated-tan-skat` into `_fromChainName` and the token wrapper address from that chain. 
```solidity
deployDappToken(
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        string memory _fromChainName,
        address _fromToken
```

## Deployment
```shell
cd token-deployer
npm install
npm run compile
npm run deploy -- --network <network>

or
yarn install
yarn compile 
yarn deploy --network <network>
```

## hardhat


```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
This project uses the following Hardhat [packages](https://www.npmjs.com/package/hardhat?activeTab=versions) 

- branch OZ-3.1 :  `hardhat: ^2.17.0`

## Linting and autoformat

All of Hardhat projects use [prettier](https://prettier.io/) and
[tslint](https://palantir.github.io/tslint/).

- `npm run lint` : check your code before any commits
- `npm run lint:fix` : fix your code before submitting to repo
 



## OpenZepplin

This project uses the following OpenZepplin [packages](https://www.npmjs.com/package/@openzeppelin/contracts?activeTab=versions) depending on the branch

- branch `OZ-3.1` : uses the  `@openzeppelin/contracts: ^3.1.0` 
- - project source  `solidity 0.6.2`
- branch `OZ-4.9` : uses the  `@openzeppelin/contracts: ^4.9.3` 
- - project source  `solidity 0.8.1`

### todo
- upgrade to solidiy 0.8.0 and latest OZ v4 
- contract verification

- make script to grant the roles to the TokenFactory 

 "@typechain/ethers-v5" : "5.7.1"

 # Role Assignment Flow-chart
The purpose of the `Token-Deployer` is to simplify the process of onboarding L1 tokens to EuropaHub in a gas-free manner and allow other Skale chains to map EuropaHub tokens to their chain within one on-chain transaction. 
- Use the backup Multisig for `grantRoles` to the Token-Deployer address. Then use the Multisig or deployer key to deploy and map `ERC20 tokens` easily.
- - Suggestion (red-dotted-line) : allow IMA-Schain to communicate with L1 `depositbox.addERC20byAdmin()` to complete all necessary mainnet to skale chain mapping, ERC20 clone deployment, mapping L2 to L1, and ERC20 wrapper deployment within one transaction from L2.

Below you will see the common transaction flow using GnosisSafe MSW to assign roles on L1(left image) and L2(bottom image) while interacting on Ethereum. 

The proposed flow-chart (top image) will only the Skale-Network for token deployments and token mapping. 
- `IMA Schain` needs to communicate with `IMA Mainnet.depositBoxERC20`


![ima](https://github.com/RubyAquaMarine/skale-chain-roles-cli/blob/main/img/IMA.png)
