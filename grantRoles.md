MSW needs the DEFAULT_ADMIN_ROLE on ConfigController and TokenManager and TokenLinker 

and/or

ADMIN_DEPLOYER_PKEY should have the following roles to perform the following function calls to grant the specific roles to the smart contract(TokenDeployer)
1. DEFAULT_ADMIN_ROLE →
0x0000000000000000000000000000000000000000000000000000000000000000
on Smart contracts 
- ConfigController
- TokenManager
- TokenLinker 


Roles REGISTRAR_ROLE  (connectSchain) = TokenManagerLinker =
    0xD2aAA00800000000000000000000000000000000;
Roles TOKEN_REGISTRAR_ROLE (addERC20byOwner) = TokenManager = 
    0xD2aAA00500000000000000000000000000000000

    Roles hash bytecode

    TOKEN_REGISTRAR_ROLE (hash: fda70c2cc66a36c14884ee85424961f51b1d92b4494751699b6d105b3bcbcba8

## old code
   const provider = new ethers.JsonRpcProvider(network.config?.url);
  const tokenManagerContract = new ethers.Contract('0xD2aAA00500000000000000000000000000000000', roles_abi,provider);
  const test = await tokenManagerContract.grantRole('',factoryAddr );
  // V2 Use Hardhat's Ethereum provider and signer
  const provider = ethersHH.provider;

    const [deployer, alice, bob] = await ethersHH.getSigners();

  console.log("address user ,", signer?.address);
  console.log("address user ,", deployer?.address);
  console.log("address user ,", alice?.address);
  console.log("address user ,", bob?.address);

  const hardhatSigner: HardhatEthersSigner = deployer; // Assuming 'signer' is of type HardhatEthersSigner
 //   const genericSigner: ethersV5.Signer = hardhatSigner;


# ethers v5 to v6 
 // ethers v5 
const roleREGISTRAR = ethersV5.arrayify(REGISTRAR_ROLE);

  // ethers v6
  const roleREGISTRAR = ethersV5.getBytes(REGISTRAR_ROLE);


    // TEST 
  try {
    const result = await tokenManagerContract.grantRole(roleTOKEN_REGISTRAR, factoryAddr);
    console.log("Deployer Address:", result);
    await result.wait();
    console.log("Deployer Address:", result);
  } catch (error) {
    console.error("Error calling function:", error);
  }