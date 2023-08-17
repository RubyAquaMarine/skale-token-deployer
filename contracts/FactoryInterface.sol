//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.2;

interface ITokenManager {
    function addERC20TokenByOwner(
        string calldata targetChainName,
        address erc20OnMainnet,
        address erc20OnSchain
    ) external;
}

interface ITokenManagerLinker {
    function connectSchain(string calldata targetChainName) external;
    function isConnectedChain(string calldata targetChainName) external view returns (bool);
    function hasSchain(string calldata targetChainName) external view returns (bool);
}
