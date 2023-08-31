import { run, ethers as ethersV671, network } from "hardhat";
import { TokenFactory } from "../typechain-types";

const roles_abi = [{
  "type": "function",
  "name": "grantRole",
  "constant": false,
  "payable": false,
  "inputs": [
    {
      "type": "bytes32",
      "name": "role"
    },
    {
      "type": "address",
      "name": "account"
    }
  ],
  "outputs": []
}]

const token_manager_abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldValue",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newValue",
        "type": "address"
      }
    ],
    "name": "DepositBoxWasChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "chainHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "erc20OnMainChain",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "erc20OnSchain",
        "type": "address"
      }
    ],
    "name": "ERC20TokenAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "chainHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "erc20OnMainChain",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "erc20OnSchain",
        "type": "address"
      }
    ],
    "name": "ERC20TokenCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "chainHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contractOnMainnet",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ERC20TokenReady",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "chainHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "erc20OnMainChain",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "erc20OnSchain",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ERC20TokenReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "AUTOMATIC_DEPLOY_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAINNET_HASH",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAINNET_NAME",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOKEN_REGISTRAR_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "targetChainName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "erc20OnMainChain",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "erc20OnSchain",
        "type": "address"
      }
    ],
    "name": "addERC20TokenByOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "schainName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "newTokenManager",
        "type": "address"
      }
    ],
    "name": "addTokenManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ERC20OnChain",
        "name": "",
        "type": "address"
      }
    ],
    "name": "addedClones",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "automaticDeploy",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newDepositBox",
        "type": "address"
      }
    ],
    "name": "changeDepositBoxAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "clonesErc20",
    "outputs": [
      {
        "internalType": "contract ERC20OnChain",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "communityLocker",
    "outputs": [
      {
        "internalType": "contract ICommunityLocker",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "depositBox",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "deprecatedClonesErc20",
    "outputs": [
      {
        "internalType": "contract ERC20OnChain",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "disableAutomaticDeploy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "enableAutomaticDeploy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "contractOnMainnet",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "exitToMainERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRoleMember",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleMemberCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "schainName",
        "type": "string"
      }
    ],
    "name": "hasTokenManager",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "newChainName",
        "type": "string"
      },
      {
        "internalType": "contract IMessageProxyForSchain",
        "name": "newMessageProxy",
        "type": "address"
      },
      {
        "internalType": "contract ITokenManagerLinker",
        "name": "newIMALinker",
        "type": "address"
      },
      {
        "internalType": "contract ICommunityLocker",
        "name": "newCommunityLocker",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newDepositBox",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "newSchainName",
        "type": "string"
      },
      {
        "internalType": "contract IMessageProxyForSchain",
        "name": "newMessageProxy",
        "type": "address"
      },
      {
        "internalType": "contract ITokenManagerLinker",
        "name": "newIMALinker",
        "type": "address"
      },
      {
        "internalType": "contract ICommunityLocker",
        "name": "newCommunityLocker",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newDepositBox",
        "type": "address"
      }
    ],
    "name": "initializeTokenManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "messageProxy",
    "outputs": [
      {
        "internalType": "contract IMessageProxyForSchain",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "fromChainHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "postMessage",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "schainName",
        "type": "string"
      }
    ],
    "name": "removeTokenManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "schainHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenManagerLinker",
    "outputs": [
      {
        "internalType": "contract ITokenManagerLinker",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "tokenManagers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "",
        "type": "address"
      }
    ],
    "name": "totalSupplyOnMainnet",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "targetSchainName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "contractOnMainnet",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferToSchainERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "transferredAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]


async function main() {
  ////console.log(network.name);
  //console.log("config network is ", network.config?.url)

  //console.log("ethers is ", ethersV671.version)

  let factoryAddr = '';
  try {
    const testAddrModule = await import(`../deployments/${network.name}/TokenFactory.json`);
    factoryAddr = testAddrModule.default.address;
    //console.log(factoryAddr);
  } catch (error) {
    //console.error("Error getting factory address:", error);
    return;
  }

  console.log("factory address", factoryAddr)

  const signer = (await ethersV671.getSigners())[0];


  //console.log(" signer maybe not correct ", signer)

  const tokenManagerContract = new ethersV671.Contract('0xD2aAA00500000000000000000000000000000000', token_manager_abi, signer);
  //  //console.log("tokenManagerContract ,", tokenManagerContract);

  const TOKEN_REGISTRAR_ROLE = ethersV671.id("TOKEN_REGISTRAR_ROLE");
  const REGISTRAR_ROLE = ethersV671.id("REGISTRAR_ROLE");


  // ethers v6
  const roleREGISTRAR = ethersV671.getBytes(REGISTRAR_ROLE);
  const roleTOKEN_REGISTRAR = ethersV671.getBytes(TOKEN_REGISTRAR_ROLE);
  const roleDEFAULT_ADMIN = ethersV671.getBytes('0x0000000000000000000000000000000000000000000000000000000000000000');


  console.log("Testing Roles on tokenManagerContract")

  // TEST 
  try {
    const result = await tokenManagerContract.MAINNET_HASH();
    //console.log("MAINNET_HASH:", result);
  } catch (error) {
    //console.error("Error calling function:", error);
  }
  // TEST 
  try {
    const result = await tokenManagerContract.depositBox();
    console.log("MAINNET L1 depositBox:", result);
  } catch (error) {
    //console.error("Error calling function:", error);
  }

  // TEST 
  try {
    const result = await tokenManagerContract.communityLocker();
    //console.log("communityLocker:", result);
  } catch (error) {
    //console.error("Error calling function:", error);
  }

  // TEST : todo, get the value of how many, then loop over to get all admins, then make sure this key has the correct roles to assign more roles 
  try {
    const result = await tokenManagerContract.getRoleMemberCount(roleDEFAULT_ADMIN);// staging europa deployer admin key is index 1 
    //console.log("getRoleMember: How many Default Admin", result);
  } catch (error) {
    //console.error("Error calling function:", error);
  }
  try {
    const result = await tokenManagerContract.getRoleMemberCount(roleTOKEN_REGISTRAR);// staging europa deployer admin key is index 1 
    //console.log("getRoleMember: How many Token Reg Admin", result);
  } catch (error) {
    //console.error("Error calling function:", error);
  }

  // TEST : check if deployer key has the correct role to grant another , if not, the script should stop here and throw error
  try {
    const result = await tokenManagerContract.getRoleMember(roleDEFAULT_ADMIN, 1);// staging europa deployer admin key is index 1 
    //console.log("getRoleMember: Default Admin", result);
  } catch (error) {
    //console.error("Error calling function:", error);
    throw new Error("You need to grant your private key the DEFAULT_ADMIN_ROLE to the token manageer contract first ")
  }

  // TEST 
  try {
    const result = await tokenManagerContract.getRoleMember(roleTOKEN_REGISTRAR, 2);// staging europa deployer admin key is index 2 
    //console.log("getRoleMember: Token Registrar", result);
  } catch (error) {
    //console.error("Error calling function:", error);
  }




  try {
    const result = await tokenManagerContract.hasRole(roleTOKEN_REGISTRAR, factoryAddr);
    //console.log("Deployer Address has role:", result);
  } catch (error) {
    //console.error("Error calling function:", error);
  }




  // TEST contract.foo(Typed.address(addr))
  //Uint8Array ethers.utils.hexlify
  const stringType = ethersV671.hexlify(roleTOKEN_REGISTRAR);
  //console.log("hexlify",  typeof stringType, stringType,)

  //console.log(" type of ", typeof roleTOKEN_REGISTRAR,  roleTOKEN_REGISTRAR ,ethersV671.hexlify(roleTOKEN_REGISTRAR))
  //console.log("address", typeof factoryAddr, factoryAddr)




  const result = await tokenManagerContract.grantRole(roleTOKEN_REGISTRAR, factoryAddr, { gasLimit: 900000000 });
  console.log("Deployer Address:", result);
  await result.wait();
  console.log("Deployer Address:", result);






}

main();

/*
TOKEN_REGISTRAR_ROLE  0xfda70c2cc66a36c14884ee85424961f51b1d92b4494751699b6d105b3bcbcba8
TOKEN_REGISTRAR_ROLE  Uint8Array(32) [
  253, 167,  12,  44, 198, 106,  54, 193,
   72, 132, 238, 133,  66,  73,  97, 245,
   27,  29, 146, 180,  73,  71,  81, 105,
  155, 109,  16,  91,  59, 203, 203, 168

  */
