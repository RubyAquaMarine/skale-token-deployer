import { ethers, run } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
console.log(" DEPLOY");
const deployFunction: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(" deployer address:", deployer);

  // Deploy your contracts
  await deploy("TokenFactory", {
    from: deployer,
    log: true,
    args: [deployer],
    skipIfAlreadyDeployed: false, // Set this to false if you want to deploy regardless
  });
};

deployFunction.tags = ["TokenFactory"]; // Set the tag for the deployment

export default deployFunction;
