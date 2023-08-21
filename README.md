# Token Deployer : Skale Ecosystem
Dapp chain owners are required to deploy and map tokens from other skale chains in order to use the `ima-bridge/metaport/s2s/` aka multichain-transfers 

These smart contracts make it possible to deploy and map tokens from the chain owners MSW or deployer key within 1 transaction. 

## requirements 
- Add Skale Chain network to the `hardhat.config.ts`

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

## Installation
```shell
cd token-deployer
npm install
npm run compile
npm run deploy -- --network <network>
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
