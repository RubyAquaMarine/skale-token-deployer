//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.2;

import "hardhat/console.sol";
import "./TokenStorage.sol";
import "./SkaleMappedERC20Token.sol";
import "./Wrapper.sol";
import {ITokenManager, ITokenManagerLinker} from "./FactoryInterface.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// -- MSW/Deployer can deploy ERC20 tokens and registerToken to TokenManager within 1 functino call
// Assign these roles to this deployed contract address
// Roles REGISTRAR_ROLE  (connectSchain)
// Roles TOKEN_REGISTRAR_ROLE (addERC20byOwner)

contract TokenFactory is TokenStorage {
    address public MSW = 0xD244519000000000000000000000000000000000;
    address public Deployer;

    //interface
    IERC20 private latestWrapper;
    ERC20 public latestToken;
    ITokenManager private tokenManager;
    ITokenManagerLinker private tokenManagerLinker;

    address public TokenManagerLinker =
        0xD2aAA00800000000000000000000000000000000;

    address public TokenManager = 0xD2aAA00500000000000000000000000000000000;

    constructor(address _admin) public {
        Deployer = _admin;
        tokenManager = ITokenManager(TokenManager);
        tokenManagerLinker = ITokenManagerLinker(TokenManagerLinker);
    }

    function isConnected(
        string memory _chainName
    ) public view returns (bool _isConnected) {
        _isConnected = tokenManagerLinker.hasSchain(_chainName);
        return _isConnected;
    }

    function connectToChain(
        string memory _chainName
    ) public returns (bool _isConnected) {
        tokenManagerLinker.connectSchain(_chainName);
        _isConnected = tokenManagerLinker.hasSchain(_chainName);
        return _isConnected;
    }

    function deployDappToken(
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        string memory _fromChainName,
        address _fromToken
    ) public returns (address _tokenAddress) {
        require(
            msg.sender == MSW || msg.sender == Deployer,
            "Not MultiSigWallet|Deployer:"
        );
        //deploy token
        latestToken = new SkaleMappedERC20Token(
            _name,
            _symbol,
            _decimal,
            msg.sender
        );

        _tokenAddress = address(latestToken);
        console.log("Deploying ERC20 with address:", _tokenAddress);
        registerToken(_tokenAddress);

        _mapToken(_fromChainName, _fromToken, _tokenAddress);
        return _tokenAddress;
    }

    function _mapToken(
        string memory _chainName,
        address _chainOrigin,
        address _chainHosted
    ) internal {
        // make two logics depending if dapp token (schain connection required) or mainnet token
        bool isMainnet = compareStrings(_chainName, "Mainnet");

        if (isMainnet) {
            tokenManager.addERC20TokenByOwner(
                _chainName,
                _chainOrigin,
                _chainHosted
            );
        } else {
            bool _connected = tokenManagerLinker.hasSchain(_chainName); 
            if (!_connected) {
                tokenManagerLinker.connectSchain(_chainName);
                tokenManager.addERC20TokenByOwner(
                    _chainName,
                    _chainOrigin,
                    _chainHosted
                );
            } else {
                tokenManager.addERC20TokenByOwner(
                    _chainName,
                    _chainOrigin,
                    _chainHosted
                );
            }
        }

        console.log("_mapToken: finished");
    }

    // prereq: depositBoxContract.addERC20TokenByOwner requires targetChainName  and erc20OnMainnet
    // Deploy erc20 , deploy wrapper, map l2 erc20 clone token to l1
    // enter the mainnet l1 token address into _fromToken

    // Error: Chain is already connected : throws error if already connected.

    function deployMainnetToken(
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        address _fromToken
    ) public returns (address _tokenAddress, address _wrapperTokenAddress) {
        require(
            msg.sender == MSW || msg.sender == Deployer,
            "Not MultiSigWallet|Deployer:"
        );
        //deploy token
        latestToken = new SkaleMappedERC20Token(
            _name,
            _symbol,
            _decimal,
            msg.sender
        );
        //registerToken token
        _tokenAddress = address(latestToken);
        console.log("Deploying ERC20 with address:", _tokenAddress);
        registerToken(_tokenAddress);

        // the l1 side has one step - whitelist a new token to the depositbox sc , however, mapping is still required after whitelisting
        _mapToken("Mainnet", _fromToken, _tokenAddress);

        // latestWrapper
        latestWrapper = IERC20(_tokenAddress);

        //deploy wrapper token
        string memory wr = "Wrapper ";
        string memory w = "w";
        //concat strings
        latestToken = new SkaleS2SERC20Wrapper(
            _concatenateStrings(wr, _name),
            _concatenateStrings(w, _symbol),
            latestWrapper
        );
        _wrapperTokenAddress = address(latestToken);
        console.log(
            "Deploying ERC20 Wrapper with address:",
            _wrapperTokenAddress
        );
        registerWrapper(_wrapperTokenAddress);

        return (_tokenAddress, _wrapperTokenAddress);
    }

    function _concatenateStrings(
        string memory str1,
        string memory str2
    ) public pure returns (string memory) {
        bytes memory bytesStr1 = bytes(str1);
        bytes memory bytesStr2 = bytes(str2);

        bytes memory concatenated = new bytes(
            bytesStr1.length + bytesStr2.length
        );

        uint256 k = 0;
        for (uint256 i = 0; i < bytesStr1.length; i++) {
            concatenated[k++] = bytesStr1[i];
        }
        for (uint256 i = 0; i < bytesStr2.length; i++) {
            concatenated[k++] = bytesStr2[i];
        }

        return string(concatenated);
    }

    function compareStrings(
        string memory str1,
        string memory str2
    ) public pure returns (bool) {
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }
}
