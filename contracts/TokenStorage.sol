//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.2;

import "hardhat/console.sol";

contract TokenStorage {
    /*
     *  Events
     */
    event ContractInstantiation(address sender, address instantiation);

    /*
     *  Storage
     */
    mapping(address => bool) public isInstantiation;
    mapping(address => address[]) public tokens;

    mapping(address => bool) public isInstantiationWrapper;
    mapping(address => address[]) public wrapperTokens;

    /*
     * Public functions
     */
    /// @dev Returns number of tokens by creator.
    /// @param creator Contract creator.
    /// @return Returns number of tokens by creator.
    function getInstantiationCount(address creator)
        public
        view
        returns (uint256, uint256)
    {
        return (tokens[creator].length, wrapperTokens[creator].length);
    }
    
    /*
     * Internal functions
     */
    /// @dev Registers contract in factory registry.
    /// @param instantiation Address of contract instantiation.
    function registerToken(address instantiation) internal {
        isInstantiation[instantiation] = true;
        tokens[msg.sender].push(instantiation);
        console.log("Registered ERC20 with address:", instantiation);
        emit ContractInstantiation(msg.sender, instantiation);
    }

    /*
     * Internal functions
     */
    /// @dev Registers contract in factory registry.
    /// @param instantiation Address of contract instantiation.
    function registerWrapper(address instantiation) internal {
        isInstantiationWrapper[instantiation] = true;
        wrapperTokens[msg.sender].push(instantiation);
        console.log("Registered ERC20 with address:", instantiation);
        emit ContractInstantiation(msg.sender, instantiation);
    }
}
