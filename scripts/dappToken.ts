import { run, ethers, network } from "hardhat";
import { TokenFactory } from "../typechain-types";

async function main() {
  console.log(network.name);

  let factoryAddr = '';
  try {
    const testAddrModule = await import(`../deployments/${network.name}/TokenFactory.json`);
    factoryAddr = testAddrModule.default.address;
    console.log(factoryAddr);
  } catch (error) {
    console.error("Error getting factory address:", error);
    return;
  }

  // Create a contract instance using the ABI and address from deployment
  const tokenFactoryContract: TokenFactory = await ethers.getContractAt("TokenFactory", factoryAddr);

  const signer = (await ethers.getSigners())[0];

  // TEST 
  try {
    const result = await tokenFactoryContract.Deployer();
    console.log("Deployer Address:", result);
  } catch (error) {
    console.error("Error calling function:", error);
  }

  try {
    const result = await tokenFactoryContract.MSW();
    console.log("MSW Address:", result);
  } catch (error) {
    console.error("Error calling function:", error);
  }

  try {
    const result = await tokenFactoryContract.deployDappToken(
      "Nebula TGOLD",
      "TBOND",
      18,
      'staging-weepy-fitting-caph',
      '0xcC54c83C43e1c5A5d351435D313d1Cd259907E22'
    );

    await result.wait();
    const address = await tokenFactoryContract.latestToken();
    console.log("deployDappToken token address:", address)
    console.log("deployDappToken result:", result);
  } catch (error) {
    console.error("Error calling function deployDappToken:", error);
  }
}

main();
