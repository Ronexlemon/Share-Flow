//SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
//import "./AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ShareFlow is Ownable, ReentrancyGuard {
    using SafeMath for uint;
    error TokenNotAllowed(address _token);
    //tokenAddress => chainlinkPriceFeed
    mapping(address => address) public l_tokenPriceFeed;
    mapping(address => address) public l_tokenCollateralPriceFeed;

    //array to store allowed tokens
    address[] public l_allowedTokens;
    //array to store allowed collateral tokens
    address[] public l_allowedCollateralTokens;
    //user =>collateralAmount
    mapping(address => uint) l_userCollateralAmount;
    //userAccount => token Address => amount
    mapping(address => mapping(address => uint)) public l_tokenBorrow;
    //userAccount => token Address => amount
    mapping(address => mapping(address => uint)) public l_tokenDeposit;
    //userAccount => token Address => amount
    mapping(address => mapping(address => uint)) public l_collateraldeposit;

    event CreateRequest(
        address token,
        address collateral,
        uint tokenAmount,
        uint CollateralAmount
    );
    event lendout(address lender, address borrower, uint amount);
    event liquidateCollateral(
        address liquidator,
        address liquidateFrom,
        uint amount
    );

    struct Information {
        address userRequest;
        address lender;
        uint timestart;
        uint duration;
        uint tokenAmountToBorrow;
        uint collateralAmount;
        uint interest;
        address tokenAddressToBorrow;
        address tokenAddressForCollateral;
        bool lended;
        uint _poolId;
    }
    struct DashBoard {
        address borrower;
        address lender;
        uint tokenBorrowed;
        uint collateral;
        address collateralAddressToken;
        address tokenBorrowedAddress;
        uint _profit;
        uint _poolId;
    }
    uint requestIndex;
    mapping(uint => Information) public l_createRequest;
    uint requestDash;
    mapping(uint => DashBoard) public l_myDashBoard;

    function createRequest(
        uint _duration,
        uint _tokenAmountToBorrow,
        uint _collateralAmount,
        address _tokenAddressToBorrow,
        address _tokenAddressForCollateral,
        uint _interest
    ) external nonReentrant {
        require(
            isTokenListed(_tokenAddressToBorrow) == true &&
                isCollateralTokenListed(_tokenAddressForCollateral),
            "token not allowed"
        );
        require(
            getCollateralTokenValue(
                _tokenAddressForCollateral,
                _collateralAmount
            ) > getTokenValue(_tokenAddressToBorrow, _tokenAmountToBorrow),
            "collateral is less"
        );
        uint _requestIndex = requestIndex;
        l_createRequest[_requestIndex] = Information(
            msg.sender,
            address(0),
            block.timestamp,
            (_duration + block.timestamp),
            _tokenAmountToBorrow,
            _collateralAmount,
            _interest,
            _tokenAddressToBorrow,
            _tokenAddressForCollateral,
            false,
            _requestIndex
        );
        IERC20(_tokenAddressForCollateral).transferFrom(
            msg.sender,
            address(this),
            _collateralAmount
        );
        l_collateraldeposit[msg.sender][
            _tokenAddressForCollateral
        ] += _collateralAmount;
        requestIndex = requestIndex.add(1);
        emit CreateRequest(
            _tokenAddressToBorrow,
            _tokenAddressForCollateral,
            _tokenAmountToBorrow,
            _collateralAmount
        );
    }

    function lend(uint _index) public payable nonReentrant {
        Information storage info = l_createRequest[_index];
        require(info.tokenAmountToBorrow == msg.value, "wrong amount");
        // IERC20(info.tokenAddressToBorrow).transferFrom(msg.sender, info.userRequest, info.tokenAmountToBorrow);
        payable(info.userRequest).transfer(info.tokenAmountToBorrow);

        // Create a new Information struct with msg.sender as the lender
        Information memory updatedInfo = Information(
            info.userRequest,
            msg.sender,
            info.timestart,
            info.duration,
            info.tokenAmountToBorrow,
            info.collateralAmount,
            info.interest,
            info.tokenAddressToBorrow,
            info.tokenAddressForCollateral,
            true,
            _index
        );

        l_createRequest[_index] = updatedInfo; // Replace the existing struct with the updated struct

        uint _requestDash = requestDash;
        l_myDashBoard[_requestDash] = DashBoard(
            info.userRequest,
            msg.sender,
            info.tokenAmountToBorrow,
            info.collateralAmount,
            info.tokenAddressForCollateral,
            info.tokenAddressToBorrow,
            info.interest,
            _requestDash
        );
        requestDash = requestDash.add(1);
        emit lendout(msg.sender, info.userRequest, info.tokenAmountToBorrow);
    }

    function repay(uint _index) external payable {
        Information storage info = l_createRequest[_index];
        uint totalAmount = info.tokenAmountToBorrow + info.interest;
        require(msg.value == totalAmount, "incorrect amount");
        require(info.lender != address(0), "null address");
        // IERC20(info.tokenAddressToBorrow).transferFrom(msg.sender,info.lender,totalAmount);
        payable(info.lender).transfer(totalAmount);
        unchecked {
            l_collateraldeposit[msg.sender][info.tokenAddressToBorrow] -= info
                .tokenAmountToBorrow;
        }
        IERC20(info.tokenAddressForCollateral).transfer(
            info.userRequest,
            info.collateralAmount
        );
    }

    function liquidate(uint _index) public {
        require(
            l_createRequest[_index].lender == msg.sender,
            "only the lender can liquidate"
        );
        require(
            l_createRequest[_index].duration < block.timestamp,
            "can liquidate on expire duration"
        );
        IERC20(l_createRequest[_index].tokenAddressForCollateral).transfer(
            l_createRequest[_index].lender,
            l_createRequest[_index].collateralAmount
        );
        emit liquidateCollateral(
            msg.sender,
            l_createRequest[_index].userRequest,
            l_createRequest[_index].collateralAmount
        );
    }

    function getAllRequest() public view returns (Information[] memory infos) {
        uint unlendedIndex = 0;
        for (uint i = 0; i < requestIndex; ++i) {
            if (l_createRequest[i].lended == false) {
                unlendedIndex = unlendedIndex.add(1);
            }
        }

        infos = new Information[](unlendedIndex);
        uint index = 0;
        for (uint i = 0; i < requestIndex; ++i) {
            if (l_createRequest[i].lended == false) {
                infos[index] = l_createRequest[i];
                index = index.add(1);
            }
        }

        return infos;
    }

    function getMyRequest(
        address user
    ) public view returns (Information[] memory infos) {
        uint unlendedIndex = 0;
        for (uint i = 0; i < requestIndex; ++i) {
            if (l_createRequest[i].userRequest == user) {
                unlendedIndex = unlendedIndex.add(1);
            }
        }

        infos = new Information[](unlendedIndex);
        uint index = 0;
        for (uint i = 0; i < requestIndex; ++i) {
            if (l_createRequest[i].userRequest == user) {
                infos[index] = l_createRequest[i];
                index = index.add(1);
            }
        }

        return infos;
    }

    function getAllDashBoard(
        address user
    ) public view returns (DashBoard[] memory dash) {
        uint unlendedIndex = 0;
        for (uint i = 0; i < requestDash; ++i) {
            if (l_myDashBoard[i].lender == user) {
                unlendedIndex = unlendedIndex.add(1);
            }
        }

        dash = new DashBoard[](unlendedIndex);
        uint index = 0;
        for (uint i = 0; i < requestDash; ++i) {
            if (l_myDashBoard[i].lender == user) {
                dash[index] = l_myDashBoard[i];
                index = index.add(1);
            }
        }

        return dash;
    }

    function allowToken(address _token, address _priceFeed) public onlyOwner {
        l_tokenPriceFeed[_token] = _priceFeed;
        l_allowedTokens.push(_token);
    }

    function allowCollateralToken(
        address _token,
        address _priceFeed
    ) public onlyOwner {
        l_tokenCollateralPriceFeed[_token] = _priceFeed;
        l_allowedCollateralTokens.push(_token);
    }

    function isTokenListed(address _token) public view returns (bool) {
        for (uint i; i < l_allowedTokens.length; ++i) {
            if (l_allowedTokens[i] == _token) {
                return true;
            }
        }
        return false;
    }

    function isCollateralTokenListed(
        address _token
    ) public view returns (bool) {
        for (uint i; i < l_allowedCollateralTokens.length; ++i) {
            if (l_allowedCollateralTokens[i] == _token) {
                return true;
            }
        }
        return false;
    }

    function getTokenValue(
        address _token,
        uint256 amount
    ) public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            l_tokenPriceFeed[_token]
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return (amount * uint256(price));
    }

    function getCollateralTokenValue(
        address _token,
        uint256 amount
    ) public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            l_tokenCollateralPriceFeed[_token]
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return (amount * uint256(price));
    }
}
