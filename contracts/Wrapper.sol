pragma solidity 0.6.2;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ERC20Wrapper.sol";

contract SkaleS2SERC20Wrapper is ERC20Wrapper {

    constructor(
        string memory contractName,
        string memory contractSymbol,
        IERC20 originToken
    ) public 
        ERC20Wrapper(originToken)
        ERC20(contractName, contractSymbol)
    {
        
    }
}