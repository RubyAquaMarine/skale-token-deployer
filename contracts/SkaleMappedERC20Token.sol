//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SkaleMappedERC20Token is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    address public TokenManager = 0xD2aAA00500000000000000000000000000000000;
    address public MSW = 0xD244519000000000000000000000000000000000;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        address _deployer
    ) public ERC20(name, symbol) {
        _setupDecimals(decimals); // Exists on OpenZed 3.1.0(compiled within 0.6.0) | This function doesnot exist in Open Zep: 4.6
        _setupRole(DEFAULT_ADMIN_ROLE, MSW); 
        _setupRole(DEFAULT_ADMIN_ROLE, _deployer); 
        // Register to Token Manager
        _setupRole(MINTER_ROLE, TokenManager); 
        _setupRole(BURNER_ROLE, TokenManager); 
    }

    function mint(address to, uint256 amount) public virtual {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(to, amount);
    }

    function burn(uint256 amount) public virtual {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a burner");
        _burn(msg.sender, amount);
    }
}
