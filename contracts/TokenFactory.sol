//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.2;

import "hardhat/console.sol";
import "./ContractFactory.sol";
import "./SkaleMappedERC20Token.sol";
import "./Wrapper.sol";
import {ITokenManager, ITokenManagerLinker} from "./FactoryInterface.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// -- MSW/Deployer can deploy ERC20 tokens and registerToken to TokenManager within 1 functino call
// Assign these roles to this deployed contract address
// Roles REGISTRAR_ROLE  (connectSchain)
// Roles TOKEN_REGISTRAR_ROLE (addERC20byOwner)

contract TokenFactory is ContractFactory {
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

    function isConnected(string memory _chainName)
        public
        view
        returns (bool _isConnected)
    {
        _isConnected = tokenManagerLinker.hasSchain(_chainName);
        return _isConnected;
    }

    function connectToChain(string memory _chainName)
        public
        returns (bool _isConnected)
    {
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
        // uint8 dec = latestToken.decimals();// working
        // string memory sym = latestToken.symbol();// working
        // now map the token
        _mapToken(_fromChainName, _fromToken, _tokenAddress);
        return _tokenAddress;
    }

    function _mapToken(
        string memory _chainName,
        address _chainOrigin,
        address _chainHosted
    ) internal {
       
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
        console.log("_mapToken: finished");
    }

    // Not complete because its impossible to automate 100% of the steps to onboard tokens from l1
    // testing with wrapper
    function deployMainnetToken(
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        string memory _fromChainName,
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

        // latestWrapper
        latestWrapper = IERC20(_tokenAddress);

        //deploy wrapper token
        string memory wr = "Wrapper";
        string memory w = "w";
        //concat strings
        latestToken = new SkaleS2SERC20Wrapper(
            _name,
            _symbol,
            latestWrapper
        );
        _wrapperTokenAddress = address(latestToken);
        console.log(
            "Deploying ERC20 Wrapper with address:",
            _wrapperTokenAddress
        );
        registerWrapper(_wrapperTokenAddress);

        // now map the token (impossible? depositBoxSC on L1: how about messageProxy)
        // _mapToken(_fromChainName, _fromToken, _tokenAddress);

        return (_tokenAddress, _wrapperTokenAddress);
    }
}
