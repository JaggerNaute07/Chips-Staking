// app.js
const CONTRACT_ADDRESS = "0xd65281b7a2ba17407CD3FBbcD5dcD866D908EF16";
const FEE_RECEIVER = "0x0079352b27fDce7DDB744644dEFBcdB99cb5A9b9";
const RPC_URLS = ["http://20.63.3.101:8545", "https://holistic-purple-period.glitch.me"];
const CHAIN_ID = "0x2ca"; // 714 in hex
const USDT_ADDRESS = "0x47C9e3E4078Edb31b24C72AF65d64dA21041801E"; 
const CHIPS_ADDRESS = "0x0000000000000000000000000000000000000000";   
const DECIMALS = 18;
const MIN_APR = 360;
const MAX_APR = 10000;

// Placeholder for ABIs (to be filled by you)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "rewardToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newAllocatedReward",
        "type": "uint256"
      }
    ],
    "name": "AllocatedRewardUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newApr",
        "type": "uint256"
      }
    ],
    "name": "AprUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "beacon",
        "type": "address"
      }
    ],
    "name": "BeaconUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newFee",
        "type": "uint256"
      }
    ],
    "name": "CreationFeeUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "payer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FeePaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newLockPeriod",
        "type": "uint256"
      }
    ],
    "name": "LockPeriodUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "activator",
        "type": "address"
      }
    ],
    "name": "PoolActivated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "stakeToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "apr",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lockPeriod",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "initialRewards",
        "type": "uint256[]"
      }
    ],
    "name": "PoolCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "PoolDeactivated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lockPeriod",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxRewardPerUser",
        "type": "uint256"
      }
    ],
    "name": "PoolParametersUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "funder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "rewardToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "RewardFunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "rewardToken",
        "type": "address"
      }
    ],
    "name": "RewardTokenValidated",
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "Staked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newTotalStaked",
        "type": "uint256"
      }
    ],
    "name": "TotalStakedUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "Unstaked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ADMIN_ROLE",
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
    "name": "MAX_APR",
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
    "inputs": [],
    "name": "MAX_STAKE",
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
    "inputs": [],
    "name": "MIN_RATE",
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
    "inputs": [],
    "name": "SECONDS_PER_YEAR",
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
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "activatePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "chipsToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
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
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "stakeToken",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "rewardTokens",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "apr",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "initialRewards",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "lockPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxRewardPerUser",
        "type": "uint256"
      }
    ],
    "name": "createPool",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "creationFee",
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
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "deactivatePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeReceiver",
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
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "rewardToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "fundReward",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "startIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      }
    ],
    "name": "getAllPoolIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getContractBalances",
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
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      }
    ],
    "name": "getCreatorPoolIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "getPoolInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "stakeToken",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "rewardTokens",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "apr",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalStaked",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "stakeDecimals",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "stakerCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lockPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxRewardPerUser",
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
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getStakeInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "rewards",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
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
        "internalType": "address",
        "name": "_feeReceiver",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
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
    "name": "poolCount",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pools",
    "outputs": [
      {
        "internalType": "address",
        "name": "stakeToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "apr",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalStaked",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "stakeDecimals",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "stakerCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lockPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxRewardPerUser",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastAprUpdate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pendingApr",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastRewardUpdate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rewardSchedules",
    "outputs": [
      {
        "internalType": "address",
        "name": "rewardToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalReward",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "releasedReward",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newFee",
        "type": "uint256"
      }
    ],
    "name": "setCreationFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "stakes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
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
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newApr",
        "type": "uint256"
      }
    ],
    "name": "updateApr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newLockPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newMaxRewardPerUser",
        "type": "uint256"
      }
    ],
    "name": "updatePoolParameters",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      }
    ],
    "name": "upgradeTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "rewardToken",
        "type": "address"
      }
    ],
    "name": "withdrawFromPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];
const IERC20_ABI = [
    {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
    {"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},
    {"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},
    {"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},
    {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},
    {"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},
    {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"}
];

// Global variables
let web3;
let contract;
let account = null;
let isOwner = false;
let isCreator = false;
let isNewPoolsHidden = false;
let isCreatePoolHidden = false;
let userInteractions = [];
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID"
};

async function initFirebase() {
  try {
    let attempts = 0;
    const maxAttempts = 5;
    while (!window.firebase && window.firebase.firestore && attempts < maxAttempts) {
      console.log('Waiting for Firebase SDK to load... Attempt ${attempts + 1}');
      await new Promise(resolve => setTimeout(resolve, 500));
      attempts++;
    }
    if (!window.firebase || window.firebase.firestore) {
      throw new Error('Firebase SDK not loaded. Ensure Firebase scripts are included in index.html');
    }
    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(firebaseConfig);
    }
    db = window.firebase.firestore();
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    db = null; // Pastikan db null kalau gagal
  }
}

// Panggil initFirebase saat aplikasi dimulai
initFirebase().catch(error => console.error('Failed to initialize Firebase:', error));

// Initialize Web3 with RPC fallback
async function initWeb3() {
  try {
    let provider;
    let attempts = 0;
    const maxAttempts = 10;
    while (!window.ethereum && attempts < maxAttempts) {
      console.log('Waiting for window.ethereum...');
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    provider = window.ethereum;
    if (!provider) {
      console.error('No wallet provider detected');
      document.getElementById('walletStatus').innerText = 'Please install MetaMask';
      return false;
    }

    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }
    account = accounts[0].toLowerCase();
    console.log('Connected account:', account);

    web3 = new Web3(provider);
    contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);

    const chainId = await web3.eth.getChainId();
    console.log(`Current chainId: ${chainId}, Expected: ${parseInt(CHAIN_ID, 16)}`);
    if (chainId !== parseInt(CHAIN_ID, 16)) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CHAIN_ID }],
        });
      } catch (switchError) {
        if (switchError.code === 4902 || switchError.code === -32602) {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: CHAIN_ID,
              chainName: 'Testnet',
              rpcUrls: RPC_URLS,
              nativeCurrency: { name: 'CHIPS', symbol: 'CHIPS', decimals: DECIMALS },
              blockExplorerUrls: [],
            }],
          });
        } else {
          console.error('Chain switch error:', switchError);
          document.getElementById('walletStatus').innerText = 'Please switch to Testnet (chain ID 714)';
          return false;
        }
      }
    }

    provider.on('accountsChanged', (accounts) => {
      console.log('Accounts changed:', accounts);
      if (accounts.length > 0) {
        account = accounts[0].toLowerCase();
        checkRoles();
        loadAllTabs();
      } else {
        disconnectWallet();
      }
    });

    provider.on('chainChanged', async (chainId) => {
      console.log('Chain changed to:', chainId);
      const expectedChainId = parseInt(CHAIN_ID, 16);
      if (Number(chainId) !== expectedChainId) {
        document.getElementById('walletStatus').innerText = 'Wrong network, please switch to Testnet';
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CHAIN_ID }],
          });
          await loadAllTabs();
        } catch (error) {
          console.error('Chain switch failed:', error.message);
        }
      } else {
        await loadAllTabs();
      }
    });

    console.log(`Connected to wallet: ${provider.isMetaMask ? 'MetaMask' : 'Other'}`);
    await checkRoles();
    return true;
  } catch (error) {
    console.error('Web3 initialization error:', error);
    document.getElementById('walletStatus').innerText = 'Failed to initialize Web3';
    return false;
  }
}

// Connect wallet
async function connectWallet() {
  try {
    const connected = await initWeb3();
    if (connected && account) {
      document.getElementById('connectWallet').textContent = `${account.slice(0, 6)}...${account.slice(-4)}`;
      document.getElementById('connectWallet').onclick = disconnectWallet;
      document.getElementById('walletStatus').textContent = 'Connected';
      updateTabsVisibility();
      await loadAllTabs();
    }
  } catch (error) {
    console.error('Error connecting wallet:', error.message);
    document.getElementById('walletStatus').textContent = 'Failed to connect wallet';
  }
}

// Get token decimals
async function getTokenDecimals(token) {
  if (token === "0x0000000000000000000000000000000000000000") {
    return 18;
  }
  try {
    const abi = [{ "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "type": "function" }];
    const contract = new web3.eth.Contract(abi, token);
    const decimals = await contract.methods.decimals().call();
    return parseInt(decimals);
  } catch (error) {
    console.error("Error fetching token decimals:", error);
    return 18;
  }
}

// Get token name
async function getTokenName(tokenAddress) {
  if (tokenAddress.toLowerCase() === '0x0000000000000000000000000000000000000000') return 'CHIPS';
  try {
    if (!web3.utils.isAddress(tokenAddress)) throw new Error('Invalid token address');
    const tokenContract = new web3.eth.Contract([
      { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "type": "function" }
    ], tokenAddress);
    const name = await tokenContract.methods.name().call();
    return name;
  } catch (error) {
    console.error('Error fetching token name:', error);
    return 'Unknown Token';
  }
}

// Global function untuk update field reward token dan saldo pool
async function updateRewardTokenField(typeId, isOwner = false) {
  try {
    const poolIdElement = document.getElementById(isOwner ? `${typeId}PoolId` : `creator${typeId.charAt(0).toUpperCase() + typeId.slice(1)}PoolId`);
    const balanceElement = document.getElementById(isOwner ? `${typeId}PoolBalance` : `creator${typeId.charAt(0).toUpperCase() + typeId.slice(1)}PoolBalance`);
    const tokenElement = document.getElementById(isOwner ? (typeId === 'fund' ? 'rewardToken' : 'withdrawToken') : 'creatorWithdrawToken');

    if (!poolIdElement || !balanceElement || !tokenElement) {
      console.warn(`Missing DOM elements for ${typeId} (isOwner=${isOwner}): poolIdElement=${!!poolIdElement}, balanceElement=${!!balanceElement}, tokenElement=${!!tokenElement}`);
      if (balanceElement) balanceElement.textContent = 'Error: Missing form elements';
      if (tokenElement) tokenElement.value = '';
      return;
    }

    const poolId = poolIdElement.value;
    if (!poolId || isNaN(Number(poolId))) {
      balanceElement.textContent = 'No pool selected';
      tokenElement.value = '';
      console.log(`Invalid or no pool selected for ${typeId}PoolId:`, poolId);
      return;
    }

    // Ambil pool info langsung dari contract
    const pool = await contract.methods.getPoolInfo(poolId).call();
    console.log(`Pool ${poolId} info:`, pool);
    if (!pool.active) {
      balanceElement.textContent = 'Pool is inactive';
      tokenElement.value = '';
      console.log(`Pool ${poolId} is inactive`);
      return;
    }

    // Validasi rewardToken
    let rewardToken = pool.rewardTokens && pool.rewardTokens.length > 0 ? pool.rewardTokens[0] : '0x0000000000000000000000000000000000000000';
    if (!web3.utils.isAddress(rewardToken)) {
      console.warn(`Invalid rewardToken for pool ${poolId}:`, rewardToken);
      rewardToken = '0x0000000000000000000000000000000000000000';
    }

    let rewardTicker = '';
    if (rewardToken === '0x0000000000000000000000000000000000000000') {
      rewardTicker = 'CHIPS';
    } else {
      try {
        rewardTicker = await getTokenName(rewardToken) || 'Unknown';
      } catch (error) {
        console.warn(`Error fetching reward token ticker for pool ${poolId}:`, error);
        rewardTicker = 'Unknown';
      }
    }

    // Ambil total reward dari event
    const balanceInWei = await getTotalRewardFromEvents(poolId, rewardToken);
    const balance = parseInt(web3.utils.fromWei(balanceInWei, 'ether'));
    balanceElement.textContent = `Pool Balance: ${balance} ${rewardTicker}`;
    tokenElement.value = rewardToken;
    console.log(`Updated ${typeId} fields for pool ${poolId}:`, { balance, rewardToken, rewardTicker });

    // Aktifkan tombol Withdraw jika token terisi
    const withdrawButton = document.getElementById(isOwner ? 'withdrawButton' : 'creatorWithdrawButton');
    if (withdrawButton) {
      withdrawButton.disabled = !tokenElement.value || !web3.utils.isAddress(tokenElement.value);
    }
  } catch (error) {
    console.error(`Error updating ${typeId} token field:`, error);
    if (balanceElement) balanceElement.textContent = 'Error loading pool';
    if (tokenElement) tokenElement.value = '';
    const withdrawButton = document.getElementById(isOwner ? 'withdrawButton' : 'creatorWithdrawButton');
    if (withdrawButton) withdrawButton.disabled = true;
  }
}

// Ambil total reward dari event RewardFunded
async function getTotalRewardFromEvents(poolId, rewardToken) {
  try {
    // Retry mechanism untuk handle RPC delay
    let attempts = 3;
    let events = [];
    while (attempts > 0) {
      try {
        events = await contract.getPastEvents('RewardFunded', {
          filter: { 
            poolId: poolId, 
            rewardToken: rewardToken.toLowerCase() // Case-insensitive
          },
          fromBlock: 0,
          toBlock: 'latest'
        });
        break;
      } catch (error) {
        console.warn(`Attempt ${4 - attempts} failed fetching RewardFunded events:`, error);
        attempts--;
        if (attempts === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 detik
      }
    }

    let totalReward = web3.utils.toBN(0);
    console.log(`Raw RewardFunded events for pool ${poolId}, rewardToken ${rewardToken}:`, events);
    for (const event of events) {
      if (event.returnValues.poolId == poolId && event.returnValues.rewardToken.toLowerCase() === rewardToken.toLowerCase()) {
        totalReward = totalReward.add(web3.utils.toBN(event.returnValues.amount));
      }
    }

    console.log(`Total reward for pool ${poolId}, rewardToken ${rewardToken}: ${totalReward.toString()}`);
    return totalReward.toString();
  } catch (error) {
    console.error(`Error fetching RewardFunded events for pool ${poolId}, rewardToken ${rewardToken}:`, error);
    return '0';
  }
}

// Disconnect wallet
function disconnectWallet() {
  try {
    account = null;
    isOwner = false;
    isCreator = false;
    document.getElementById('connectWallet').textContent = 'Connect Wallet';
    document.getElementById('connectWallet').onclick = connectWallet;
    document.getElementById('walletStatus').textContent = 'Disconnected';
    updateTabsVisibility();
    document.querySelectorAll('.tab').forEach(tab => {
      tab.innerHTML = '<p>Please connect your wallet</p>';
    });
    console.log('Wallet disconnected');
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    document.getElementById('walletStatus').textContent = 'Error disconnecting wallet';
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  try {
    document.getElementById('connectWallet').textContent = 'Connect Wallet';
    document.getElementById('connectWallet').onclick = connectWallet;
    document.getElementById('walletStatus').textContent = 'Not connected';
    updateTabsVisibility();
  } catch (error) {
    console.error('Initialization error:', error);
    document.getElementById('walletStatus').textContent = 'Error initializing app';
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const fundDropdown = document.getElementById('fundPoolId');
  if (fundDropdown) {
    fundDropdown.innerHTML = await getPoolOptionsForDropdown();
  }
});
window.addEventListener('poolUpdated', async (event) => {

  const { poolId } = event.detail;
  if (typeof loadPool === 'function') {
    await loadPool([poolId]);
  }
});
// Check if user is Owner or Creator
async function checkRoles() {
  try {
    if (!account || !contract) {
      console.log('Account or contract not initialized');
      return;
    }
    const defaultAdminRole = await contract.methods.DEFAULT_ADMIN_ROLE().call();
    const adminRole = await contract.methods.ADMIN_ROLE().call();
    console.log('DEFAULT_ADMIN_ROLE hash:', defaultAdminRole);
    isOwner = await contract.methods.hasRole(defaultAdminRole, account).call();
    isCreator = isOwner || await contract.methods.hasRole(adminRole, account).call();
    console.log(`Roles: isOwner=${isOwner}, isCreator=${isCreator}`);
    updateTabsVisibility();
    if (account) {
      document.getElementById('connectWallet').textContent = `${account.slice(0, 6)}...${account.slice(-4)}`;
      document.getElementById('connectWallet').onclick = disconnectWallet;
      document.getElementById('walletStatus').textContent = 'Connected';
    }
  } catch (error) {
    console.error('Error checking roles:', error);
    document.getElementById('walletStatus').textContent = 'Error checking roles';
  }
}

// Update Tabs Visibility
function updateTabsVisibility() {
  try {
    console.log('Updating tabs visibility at:', new Date().toLocaleString());
    console.log('isCreator:', isCreator, 'isOwner:', isOwner);

    const creatorToolsTabButton = document.querySelector('button[onclick="showTab(\'creatorTools\')"]');
    const ownerToolsTabButton = document.querySelector('button[onclick="showTab(\'ownerTools\')"]');
    const creatorToolsTabContent = document.getElementById('creatorTools');
    const ownerToolsTabContent = document.getElementById('ownerTools');
    const newPoolsTab = document.getElementById('newPools');
    const createPoolTab = document.getElementById('createPool');
    const defaultPoolTab = document.getElementById('defaultPool');
    const ownerStatus = document.getElementById('ownerStatus');

    if (creatorToolsTabButton) {
      creatorToolsTabButton.style.display = isCreator ? 'inline-block' : 'none';
    }
    if (ownerToolsTabButton) {
      ownerToolsTabButton.style.display = isOwner ? 'inline-block' : 'none';
    }

    if (creatorToolsTabContent) {
      creatorToolsTabContent.style.display = 'none';
    }
    if (ownerToolsTabContent) {
      ownerToolsTabContent.style.display = 'none';
    }

    if (defaultPoolTab) {
      defaultPoolTab.style.display = 'block';
    }
    if (newPoolsTab) {
      newPoolsTab.style.display = isNewPoolsHidden && !isOwner ? 'none' : 'none';
    }
    if (createPoolTab) {
      createPoolTab.style.display = isCreatePoolHidden && !isOwner ? 'none' : 'none';
    }
    if (ownerStatus) {
      ownerStatus.textContent = isOwner ? 'Owner access granted' : '';
    }

    console.log('Tabs visibility updated');
  } catch (error) {
    console.error('Error updating tabs visibility:', error.message);
  }
}

// Disable tabs when disconnected
function disableTabs() {
  document.querySelectorAll('.tabs button').forEach(btn => {
    const tabId = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
    if (['newPools', 'createPool', 'myCreatedPools', 'myStakes', 'creatorTools', 'ownerTools'].includes(tabId)) {
      btn.disabled = true;
      btn.style.display = 'none';
    }
  });
}

// Show specific tab
function showTab(tabId) {
  try {
    console.log(`Showing tab: ${tabId}`);
    document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    const tabElement = document.getElementById(tabId);
    if (tabElement) {
      tabElement.style.display = 'block';
      const tabButton = document.querySelector(`button[onclick="showTab('${tabId}')"]`);
      if (tabButton) tabButton.classList.add('active');
    } else {
      console.error(`Tab with ID ${tabId} not found`);
      return;
    }

    if (!account) {
      tabElement.innerHTML = '<p>Please connect your wallet</p>';
      console.log(`Wallet not connected for tab: ${tabId}`);
      return;
    }

    switch (tabId) {
      case 'defaultPool':
        loadDefaultPool();
        break;
      case 'newPools':
        loadNewPools();
        break;
      case 'myCreatedPools':
        loadMyCreatedPools();
        break;
      case 'myStakes':
        loadMyStakes();
        break;
      case 'createPool':
        loadCreatePoolForm();
        break;
      case 'creatorTools':
        loadCreatorTools();
        break;
      case 'ownerTools':
        loadOwnerTools();
        break;
    }
  } catch (error) {
    console.error(`Error showing tab ${tabId}:`, error);
  }
}

// Show creator tab
function showCreatorTab(tabId) {
  showTab(tabId);
}

// Load all tabs
async function loadAllTabs() {
  try {
    if (!account) {
      console.log('No account connected, skipping loadAllTabs');
      return;
    }
    console.log('Starting loadAllTabs at:', new Date().toLocaleString());
    
    await loadDefaultPool();
    
    await new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });
    
    await updateUI();
    
    console.log('loadAllTabs completed at:', new Date().toLocaleString());
  } catch (error) {
    console.error('Error loading tabs:', error.message);
  }
}

// Update UI content
async function updateUI() {
  try {
    if (!web3) throw new Error('Web3 not initialized');
    if (!contract) throw new Error('Contract not initialized');

    console.log('Updating UI at:', new Date().toLocaleString());
    console.log('Contract address:', contract.options.address);
    console.log('USDT_ADDRESS:', USDT_ADDRESS);
    console.log('CHIPS_ADDRESS:', CHIPS_ADDRESS);

    const poolBalanceElement = document.getElementById('poolBalance');
    const poolBalanceChipsElement = document.getElementById('poolBalanceChips');
    const totalStakerElement = document.getElementById('totalStaker');

    if (!poolBalanceElement || !poolBalanceChipsElement || !totalStakerElement) {
      console.error('DOM elements not found:', {
        poolBalance: !!poolBalanceElement,
        poolBalanceChips: !!poolBalanceChipsElement,
        totalStaker: !!totalStakerElement
      });
      return;
    }

    let totalStakedUSDT = BigInt(0);
    let totalStakedCHIPS = BigInt(0);
    let totalStakers = 0;

    let poolCount = 0;
    try {
      poolCount = Number(await contract.methods.poolCount().call());
      console.log('Pool count:', poolCount);
    } catch (error) {
      console.error('Error fetching pool count:', error.message);
      poolBalanceElement.innerText = '0';
      poolBalanceChipsElement.innerText = '0';
      totalStakerElement.innerText = '0';
      return;
    }

    if (poolCount === 0) {
      console.warn('No pools found in contract!');
      poolBalanceElement.innerText = '0';
      poolBalanceChipsElement.innerText = '0';
      totalStakerElement.innerText = '0';
      return;
    }

    for (let i = 0; i < poolCount; i++) {
      try {
        const pool = await contract.methods.getPoolInfo(i).call();
        console.log(`Raw pool ${i} data:`, JSON.stringify(pool, null, 2));

        if (!pool.active) {
          console.log(`Pool ${i} is inactive, skipping...`);
          continue;
        }

        const stakeToken = pool.stakeToken
          ? pool.stakeToken.toLowerCase().trim()
          : '0x0000000000000000000000000000000000000000';
        console.log(`Pool ${i} stakeToken:`, stakeToken);

        const totalStaked = pool.totalStaked
          ? BigInt(pool.totalStaked.toString() || '0')
          : BigInt(0);
        const stakerCount = pool.stakerCount
          ? Number(pool.stakerCount.toString() || '0')
          : 0;

        console.log(`Pool ${i} info:`, {
          stakeToken,
          totalStaked: totalStaked.toString(),
          stakerCount,
          active: pool.active
        });

        if (stakeToken === USDT_ADDRESS.toLowerCase().trim()) {
          totalStakedUSDT += totalStaked;
          console.log(`Added ${web3.utils.fromWei(totalStaked.toString(), 'ether')} USDT to total`);
        } else if (stakeToken === CHIPS_ADDRESS.toLowerCase().trim()) {
          totalStakedCHIPS += totalStaked;
          console.log(`Added ${web3.utils.fromWei(totalStaked.toString(), 'ether')} CHIPS to total`);
        } else {
          console.warn(`Unknown stakeToken in pool ${i}:`, stakeToken);
          console.log(`Expected USDT_ADDRESS: ${USDT_ADDRESS.toLowerCase().trim()}, CHIPS_ADDRESS: ${CHIPS_ADDRESS.toLowerCase().trim()}`);
        }

        totalStakers += stakerCount;
      } catch (poolError) {
        console.error(`Error fetching pool ${i}:`, poolError.message);
        continue;
      }
    }

    const usdtBalance = Number(web3.utils.fromWei(totalStakedUSDT.toString(), 'ether')).toFixed(2);
    const chipsBalance = Number(web3.utils.fromWei(totalStakedCHIPS.toString(), 'ether')).toFixed(2);

    poolBalanceElement.innerText = usdtBalance;
    poolBalanceChipsElement.innerText = chipsBalance;
    totalStakerElement.innerText = totalStakers.toString();

    console.log('UI updated:', {
      totalStakedUSDT: usdtBalance,
      totalStakedCHIPS: chipsBalance,
      totalStakers
    });
  } catch (error) {
    console.error('Update UI error:', error.message);
    const poolBalanceElement = document.getElementById('poolBalance');
    const poolBalanceChipsElement = document.getElementById('poolBalanceChips');
    const totalStakerElement = document.getElementById('totalStaker');
    if (poolBalanceElement) poolBalanceElement.innerText = '0';
    if (poolBalanceChipsElement) poolBalanceChipsElement.innerText = '0';
    if (totalStakerElement) totalStakerElement.innerText = '0';
  }
}

// Load default pool
async function loadDefaultPool() {
  try {
    const defaultPoolCard = document.getElementById('defaultPoolCard');
    if (!defaultPoolCard) {
      console.error('Element defaultPoolCard not found');
      return;
    }
    defaultPoolCard.innerHTML = '';
    if (!contract || !account) {
      console.error('Contract or account not initialized');
      defaultPoolCard.innerHTML = '<p>Please connect wallet</p>';
      return;
    }

    // Ambil pinned pool IDs dari Firestore
    const pinnedPoolIds = await loadPinnedPoolIds();
    console.log('Pinned Pool IDs:', pinnedPoolIds);

    if (pinnedPoolIds.length === 0) {
      defaultPoolCard.innerHTML = '<p>No pools available</p>';
      console.log('No pinned pools found');
      return;
    }

    defaultPoolCard.classList.add('pool-grid');
    let pools = [];
    for (let id of pinnedPoolIds) {
      try {
        if (!id || isNaN(Number(id))) continue;
        const pool = await contract.methods.getPoolInfo(id).call();
        if (!pool.active) {
          console.log(`Pool ${id} is inactive, skipping...`);
          continue;
        }
        pools.push({ id, pool });
      } catch (poolError) {
        console.error(`Error loading pool ${id}:`, poolError);
      }
    }

    if (pools.length === 0) {
      defaultPoolCard.innerHTML = '<p>No active pinned pools found</p>';
      console.log('No active pinned pools found');
      return;
    }

    pools.sort((a, b) => {
      const stakerDiff = Number(b.pool.stakerCount || 0) - Number(a.pool.stakerCount || 0);
      if (stakerDiff !== 0) return stakerDiff;
      return Number(b.pool.totalStaked || 0) - Number(a.pool.totalStaked || 0);
    });

    for (let { id, pool } of pools) {
      console.log(`Pinned Pool ${id}:`, pool);
      const poolCard = await createPoolCard(id, pool, true); // isPinned = true
      defaultPoolCard.appendChild(poolCard);
    }

    console.log('Default Pool loaded with pinned pools');
  } catch (error) {
    console.error('Error loading default pool:', error);
    document.getElementById('defaultPoolCard').innerHTML = '<p>No pools available</p>';
  }
}

// Load new pools
async function loadNewPools() {
  try {
    const content = document.getElementById('newPoolCard');
    content.innerHTML = '';
    if (!contract || !account) {
      console.error('Contract or account not initialized');
      content.innerHTML = '<p>Please connect wallet</p>';
      return;
    }
    console.log('Current account:', account);
    console.log('Contract address:', contract.options.address);
    const poolCount = Number(await contract.methods.poolCount().call());
    console.log('Pool count:', poolCount);
    if (poolCount === 0) {
      content.innerHTML = '<p>No pools available</p>';
      return;
    }
    let poolIds = [];
    try {
      const defaultAdminRole = await contract.methods.DEFAULT_ADMIN_ROLE().call();
      const isAdmin = await contract.methods.hasRole(defaultAdminRole, account).call();
      console.log('Is admin (DEFAULT_ADMIN_ROLE):', isAdmin);
      if (!isAdmin) {
        console.warn('Account is not admin, falling back to manual pool iteration');
        throw new Error('Not admin, using fallback');
      }
      console.log(`Calling getAllPoolIds(0, ${Math.min(poolCount, 10)}) for account: ${account}`);
      poolIds = await contract.methods.getAllPoolIds(0, Math.min(poolCount, 10)).call();
    } catch (error) {
      console.error('Error fetching all pool IDs:', error.message);
      console.error('Full error:', error);
      for (let i = 0; i < poolCount; i++) {
        try {
          const pool = await contract.methods.getPoolInfo(i).call();
          if (pool.active) poolIds.push(i);
        } catch (poolError) {
          console.error(`Error fetching pool ${i}:`, poolError);
        }
      }
    }
    console.log('Pool IDs:', poolIds);

    // Filter out pinned pools
    const pinnedPoolIds = await loadPinnedPoolIds();
    poolIds = poolIds.filter(id => !pinnedPoolIds.includes(Number(id)));
    console.log('Filtered New Pool IDs (excluding pinned):', poolIds);

    let pools = [];
    for (let id of poolIds) {
      try {
        if (!id || isNaN(Number(id))) continue;
        const pool = await contract.methods.getPoolInfo(id).call();
        if (!pool.active) continue;
        pools.push({ id, pool });
      } catch (poolError) {
        console.error(`Error loading pool ${id}:`, poolError);
      }
    }
    pools.sort((a, b) => {
      const stakerDiff = Number(b.pool.stakerCount || 0) - Number(a.pool.stakerCount || 0);
      if (stakerDiff !== 0) return stakerDiff;
      return Number(b.pool.totalStaked || 0) - Number(a.pool.totalStaked || 0);
    });
    content.classList.add('pool-grid');
    for (let { id, pool } of pools) {
      console.log(`Pool ${id}:`, pool);
      const card = await createPoolCard(id, pool, false, 'newPool_');
      content.appendChild(card);
    }
    if (content.innerHTML === '') {
      content.innerHTML = '<p>No active pools found</p>';
    }
  } catch (error) {
    console.error('Error loading new pools:', error);
    document.getElementById('newPoolCard').innerHTML = '<p>No active pools found</p>';
  }
}

// Load my created pools
async function loadMyCreatedPools() {
  try {
    const poolList = document.getElementById('poolList');
    poolList.innerHTML = '';
    if (!contract || !account) {
      poolList.innerHTML = '<p>Please connect wallet</p>';
      return;
    }

    console.log('Fetching creator pools for account:', account);
    let poolIds = [];

    try {
      console.log(`Calling getCreatorPoolIds(${account}, 0, 10)`);
      // Tambahkan `from: account` untuk memastikan pemanggilnya jelas
      poolIds = await contract.methods.getCreatorPoolIds(account, 0, 10).call({ from: account });
    } catch (error) {
      console.warn('getCreatorPoolIds failed (fallback to manual scan):', error.message);

      const poolCount = Number(await contract.methods.poolCount().call());
      for (let i = 0; i < poolCount; i++) {
        try {
          const pool = await contract.methods.getPoolInfo(i).call();
          if (pool.active && pool.creator.toLowerCase() === account.toLowerCase()) {
            poolIds.push(i);
          }
        } catch (poolError) {
          console.error(`Error fetching pool ${i}:`, poolError.message);
        }
      }
    }

    console.log('Creator pool IDs:', poolIds);
    let pools = [];

    for (let poolId of poolIds) {
      try {
        if (!poolId || isNaN(Number(poolId))) continue;
        const pool = await contract.methods.getPoolInfo(poolId).call();
        if (!pool.active) continue;
        pools.push({ id: poolId, pool });
      } catch (poolError) {
        console.error(`Error loading pool ${poolId}:`, poolError.message);
      }
    }

    pools.sort((a, b) => {
      const stakerDiff = Number(b.pool.stakerCount || 0) - Number(a.pool.stakerCount || 0);
      if (stakerDiff !== 0) return stakerDiff;
      return Number(b.pool.totalStaked || 0) - Number(a.pool.totalStaked || 0);
    });

    poolList.classList.add('pool-grid');
    for (let { id, pool } of pools) {
      console.log(`Pool ${id}:`, pool);
      const card = await createPoolCard(id, pool);
      poolList.appendChild(card);
    }

    if (poolList.innerHTML === '') {
      poolList.innerHTML = '<p>No pools created</p>';
    }
  } catch (error) {
    console.error('Error loading created pools:', error.message);
    document.getElementById('poolList').innerHTML = '<p>No pools created</p>';
  }
}

// Load my stakes
async function loadMyStakes() {
  try {
    if (!web3 || !contract || !account) {
      console.log('Web3, contract, or account not initialized, skipping loadMyStakes');
      return;
    }

    console.log('Loading user stakes at:', new Date().toLocaleString());
    const myStakesElement = document.getElementById('myStakesCard');
    if (!myStakesElement) {
      console.error('myStakesCard element not found');
      return;
    }
    myStakesElement.innerHTML = '';
    myStakesElement.classList.add('pool-grid');

    let poolIds = [];
    try {
      if (typeof contract.methods.getUserStakedPoolIds === 'function') {
        console.log(`Calling getUserStakedPoolIds(${account}, 0, 10)`);
        poolIds = await contract.methods.getUserStakedPoolIds(account, 0, 10).call();
      } else {
        const poolCount = Number(await contract.methods.poolCount().call());
        console.log('Pool count for my stakes:', poolCount);
        for (let i = 0; i < poolCount; i++) {
          try {
            let stakeAmount = '0.00';
            if (typeof contract.methods.getUserStake === 'function') {
              const userStake = await contract.methods.getUserStake(i, account).call();
              stakeAmount = userStake.amount
                ? Number(web3.utils.fromWei(userStake.amount.toString(), 'ether')).toFixed(2)
                : '0.00';
            } else if (typeof contract.methods.userStake === 'function') {
              const userStake = await contract.methods.userStake(i, account).call();
              stakeAmount = userStake.amount
                ? Number(web3.utils.fromWei(userStake.amount.toString(), 'ether')).toFixed(2)
                : '0.00';
            } else if (typeof contract.methods.stakes === 'function') {
              const userStake = await contract.methods.stakes(i, account).call();
              stakeAmount = userStake.amount
                ? Number(web3.utils.fromWei(userStake.amount.toString(), 'ether')).toFixed(2)
                : '0.00';
            }
            if (Number(stakeAmount) > 0) {
              poolIds.push(i);
            }
          } catch (error) {
            console.error(`Error checking stake for pool ${i}:`, error.message);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching staked pool IDs:', error.message);
    }

    console.log('Staked pool IDs:', poolIds);
    let pools = [];
    for (let poolId of poolIds) {
      try {
        if (!poolId || isNaN(Number(poolId))) continue;
        const pool = await contract.methods.getPoolInfo(poolId).call();
        if (!pool.active) continue;
        pools.push({ id: poolId, pool });
      } catch (poolError) {
        console.error(`Error loading pool ${poolId}:`, poolError.message);
      }
    }

    pools.sort((a, b) => {
      const stakerDiff = Number(b.pool.stakerCount || 0) - Number(a.pool.stakerCount || 0);
      if (stakerDiff !== 0) return stakerDiff;
      return Number(b.pool.totalStaked || 0) - Number(a.pool.totalStaked || 0);
    });

    for (let { id, pool } of pools) {
      console.log(`Pool ${id}:`, pool);
      const card = await createPoolCard(id, pool, false, 'myStakes_');
      myStakesElement.appendChild(card);
    }

    if (myStakesElement.innerHTML === '') {
      myStakesElement.innerHTML = '<p>No stakes found</p>';
    }
    console.log('loadMyStakes completed');
  } catch (error) {
    console.error('loadMyStakes error:', error.message);
    document.getElementById('myStakesCard').innerHTML = '<p>No stakes found</p>';
  }
}

// Helper untuk tampilkan angka tanpa .0 jika bulat
function formatNumberSmart(n, decimals = 2) {
  const num = parseFloat(n);
  if (isNaN(num)) return n;
  return num % 1 === 0 ? num.toString() : num.toFixed(decimals);
}

// Create pool card
async function createPoolCard(poolId, pool, isPinned = false, tabPrefix = '') {
  const card = document.createElement('div');
  card.className = 'pool-card';

  try {
    if (!pool) {
      console.error(`Pool ${poolId} is undefined`);
      card.innerHTML = '<p>Waiting for pool data...</p>';
      return card;
    }

    let stakeTokenTicker = '';
    if (pool.stakeToken === '0x0000000000000000000000000000000000000000') {
      stakeTokenTicker = 'CHIPS';
    } else {
      try {
        stakeTokenTicker = await getTokenName(pool.stakeToken);
      } catch {
        stakeTokenTicker = 'Unknown';
      }
    }

    let rewardToken = pool.rewardTokens?.[0] || '0x0000000000000000000000000000000000000000';
    let rewardTokenTicker = rewardToken === '0x0000000000000000000000000000000000000000' ? 'CHIPS' : '';
    if (rewardToken !== '0x0000000000000000000000000000000000000000') {
      try {
        rewardTokenTicker = await getTokenName(rewardToken);
      } catch {
        rewardTokenTicker = 'Unknown';
      }
    }

    // 🟡 Ambil sisa reward token dari getContractBalances atau fallback ke event
    let totalReward = 0;
    try {
      if (typeof contract.methods.getContractBalances === 'function') {
        const rewardInWei = await contract.methods.getContractBalances(rewardToken).call();
        totalReward = Number(web3.utils.fromWei(rewardInWei, 'ether'));
        console.log(`✅ Fetched reward from getContractBalances: ${totalReward}`);
      } else {
        throw new Error('getContractBalances not available, fallback to events');
      }
    } catch (err) {
      console.warn(`Fallback: reading reward from events for pool ${poolId}`);
      try {
        const [createdEvents, fundedEvents] = await Promise.all([
          contract.getPastEvents('PoolCreated', {
            filter: { poolId },
            fromBlock: 0,
            toBlock: 'latest'
          }),
          contract.getPastEvents('RewardFunded', {
            filter: { poolId, rewardToken },
            fromBlock: 0,
            toBlock: 'latest'
          })
        ]);

        if (createdEvents.length > 0) {
          const init = createdEvents[0].returnValues.initialRewards?.[0] || '0';
          totalReward += Number(web3.utils.fromWei(init, 'ether'));
        }

        for (const ev of fundedEvents) {
          totalReward += Number(web3.utils.fromWei(ev.returnValues.amount || '0', 'ether'));
        }
      } catch (error) {
        console.warn(`Gagal ambil reward dari event:`, error);
      }
    }

    const rewardDisplay = `${Number(totalReward) % 1 === 0 ? Number(totalReward) : Number(totalReward).toFixed(2)} ${rewardTokenTicker}`;

    const aprValue = Number(pool.apr || 0);
    const stakeInfo = account
      ? contract.methods.getStakeInfo(poolId, account).call()
      : Promise.resolve({ amount: '0', rewards: [], timestamp: '0' });

    await stakeInfo.then(async info => {
      let userReward = '0';
      if (info.amount && Number(info.amount) > 0 && pool.active) {
        try {
          const userStake = Number(web3.utils.fromWei(info.amount, 'ether'));
          const timeElapsed = Math.floor(Date.now() / 1000) - Number(info.timestamp || 0);
          const aprPerSecond = aprValue / (365 * 24 * 60 * 60);
          userReward = (userStake * aprPerSecond * timeElapsed).toString();
          userReward = Number(userReward).toFixed(6);
        } catch {
          userReward = '0';
        }
      } else {
        userReward = info.rewards && Array.isArray(info.rewards)
          ? web3.utils.fromWei(info.rewards.reduce((sum, r) => sum + Number(r || 0), 0).toString(), 'ether')
          : '0';
      }

      card.innerHTML = `
        ${isOwner || pool.creator.toLowerCase() === account.toLowerCase() ? `<p>Pool ID: ${poolId}</p>` : ''}
        <p>Stake: ${stakeTokenTicker}</p>
        <p>Reward Token: ${rewardDisplay}</p>
        <p>APR: ${aprValue}%</p>
        <p>Total Staked: ${web3.utils.fromWei(pool.totalStaked || '0', 'ether')} ${stakeTokenTicker}</p>
        <p>Staker: ${pool.stakerCount || 0}</p>
        <p>Lock Period: ${(Number(pool.lockPeriod || 0) / 86400) % 1 === 0 ? Number(pool.lockPeriod / 86400) : (Number(pool.lockPeriod || 0) / 86400).toFixed(1)} days</p>
        <p>Active: ${pool.active ? 'Yes' : 'No'}</p>
        <p>Your Stake: ${web3.utils.fromWei(info.amount || '0', 'ether')} ${stakeTokenTicker}</p>
        <p>Your Reward: ${parseFloat(userReward).toFixed(6)} ${rewardTokenTicker}</p>
        <div><input type="number" id="${tabPrefix}stakeAmount${poolId}" placeholder="Amount" step="0.01" min="0.01"><button onclick="stake(${poolId}, '${tabPrefix}')">Stake</button></div>
        <div><input type="number" id="${tabPrefix}unstakeAmount${poolId}" placeholder="Amount" step="0.01" min="0.01"><button onclick="unstake(${poolId}, '${tabPrefix}')">Unstake</button></div>
        <button onclick="claimRewards(${poolId})">Claim Reward</button>
      `;
    }).catch(error => {
      console.error('Error fetching stake info:', error.message);
      card.innerHTML = '<p>Failed to load pool details</p>';
    });

    return card;
  } catch (error) {
    console.error('Error creating pool card:', error.message);
    card.innerHTML = '<p>Failed to load pool</p>';
    return card;
  }
}

// Load create pool form
function loadCreatePoolForm() {
  const createPoolContent = document.getElementById('createPoolForm');
  if (!createPoolContent) {
    console.error('Elemen createPoolForm tidak ditemukan');
    return;
  }
  createPoolContent.innerHTML = `
    <div class="card">
      <h3>Create New Pool</h3>
      <p>Pool Creation Fee: <span id="creationFee">0</span> CHIPS</p>
      <label for="stakeToken">Stake Token:</label>
      <select id="stakeToken">
        <option value="${CHIPS_ADDRESS}">CHIPS</option>
        <option value="${USDT_ADDRESS}">USDT</option>
      </select>
      <label for="rewardToken">Reward Token Address:</label>
      <input type="text" id="rewardToken" placeholder="0x...">
      <p id="rewardTokenInfo"></p>
      <label for="apr">APR (360–10000%):</label>
      <input type="number" id="apr" placeholder="APR" min="360" max="10000">
      <label for="initialReward">Initial Reward Amount:</label>
      <input type="number" id="initialReward" placeholder="Amount" step="0.01" min="0.01">
      <label for="lockPeriod">Lock Period (days):</label>
      <input type="number" id="lockPeriod" placeholder="Days" min="0">
      <label for="maxRewardPerUser">Max Reward Per User:</label>
      <input type="number" id="maxRewardPerUser" placeholder="Amount" step="0.01" min="0.01">
      <button onclick="createPool()">Create Pool</button>
      <p id="createStatus"></p>
    </div>
  `;
  updateCreationFee();
  document.getElementById('rewardToken').addEventListener('input', async () => {
    const rewardToken = document.getElementById('rewardToken').value;
    if (web3.utils.isAddress(rewardToken) && rewardToken !== CHIPS_ADDRESS) {
      const tokenContract = new web3.eth.Contract(IERC20_ABI, rewardToken);
      try {
        const name = await tokenContract.methods.name().call();
        const balance = await tokenContract.methods.balanceOf(account).call();
        document.getElementById('rewardTokenInfo').innerText = `Token: ${name}, Balance: ${web3.utils.fromWei(balance.toString(), 'ether')}`;
      } catch (error) {
        document.getElementById('rewardTokenInfo').textContent = 'Invalid token';
      }
    } else if (rewardToken === CHIPS_ADDRESS) {
      const balance = await web3.eth.getBalance(account);
      document.getElementById('rewardTokenInfo').textContent = `Token: CHIPS, Balance: ${web3.utils.fromWei(balance.toString(), 'ether')}`;
    } else {
      document.getElementById('rewardTokenInfo').innerText = '';
    }
  });
}

// Update creation fee
async function updateCreationFee() {
  try {
    if (!contract) throw new Error('Contract not initialized');
    const fee = await contract.methods.creationFee().call();
    document.getElementById('creationFee').innerText = web3.utils.fromWei(fee.toString(), 'ether');
  } catch (error) {
    console.log('Update creation fee error:', error);
    document.getElementById('creationFee').innerText = '0';
  }
}

// Load owner controls with individual cards
async function loadOwnerTools() {
  try {
    const ownerToolContent = document.getElementById('ownerToolContent');
    if (!ownerToolContent) {
      console.error('Element ownerToolContent not found');
      return;
    }
    ownerToolContent.innerHTML = '';
    if (!contract || !account) {
      ownerToolContent.innerHTML = '<p>Please connect wallet</p>';
      return;
    }
    if (!isOwner) {
      ownerToolContent.innerHTML = '<p>Access restricted to owners</p>';
      return;
    }
    console.log('Loading owner tools for:', account);

    let creationFee = '0';
    try {
      creationFee = await contract.methods.creationFee().call();
    } catch (error) {
      console.warn('Error fetching creation fee:', error.message);
    }

    // Cache pool info untuk efisiensi
    window.poolInfoCache = {};
    const poolCount = Number(await contract.methods.poolCount().call());
    for (let i = 0; i < poolCount; i++) {
      try {
        window.poolInfoCache[i] = await contract.methods.getPoolInfo(i).call();
      } catch (error) {
        console.error(`Error fetching pool info for ID ${i}:`, error);
      }
    }

    // Dapatkan ticker untuk dropdown
    let poolOptionsWithTicker = [];
    for (let id in window.poolInfoCache) {
      try {
        const pool = window.poolInfoCache[id];
        if (!pool.active) continue;
        let stakeTicker = '';
        if (pool.stakeToken === '0x0000000000000000000000000000000000000000') {
          stakeTicker = 'CHIPS';
        } else {
          stakeTicker = await getTokenName(pool.stakeToken) || 'Unknown';
        }
        poolOptionsWithTicker.push({ id, ticker: stakeTicker });
      } catch (error) {
        console.warn(`Error fetching ticker for pool ${id}:`, error);
        poolOptionsWithTicker.push({ id, ticker: 'Unknown' });
      }
    }

    ownerToolContent.innerHTML = `
      <div class="pool-grid">
        <div class="control-section">
          <h3>Pin/Unpin Pools</h3>
          <div class="control-group">
            <label for="pinPoolId">Select Pool (ID - Ticker):</label>
            <select id="pinPoolId">
              <option value="">Select a pool</option>
              ${poolOptionsWithTicker.map(({ id, ticker }) => `<option value="${id}">Pool ${id} - ${ticker}</option>`).join('')}
            </select>
            <button onclick="pinPool()">Pin Pool</button>
            <button onclick="unpinPool()">Unpin Pool</button>
            <p id="pinStatus"></p>
          </div>
        </div>
        <div class="control-section">
          <h3>Fund Pool Rewards</h3>
          <div class="control-group">
            <label for="fundPoolId">Select Pool ID:</label>
            <select id="fundPoolId" onchange="updateRewardTokenField('fund', true)">
              <option value="">Select a pool</option>
              ${Object.keys(window.poolInfoCache).filter(id => window.poolInfoCache[id].active).map(id => `<option value="${id}">Pool ${id}</option>`).join('')}
            </select>
            <p id="fundPoolBalance">No pool selected</p>
            <label for="rewardToken">Reward Token:</label>
            <input type="text" id="rewardToken" readonly placeholder="Select a pool to show token">
            <label for="fundAmount">Amount:</label>
            <input type="number" id="fundAmount" placeholder="Amount" step="0.01" min="0.01">
            <button onclick="fundReward()">Fund Reward</button>
            <p id="fundStatus"></p>
          </div>
        </div>
        <div class="control-section">
          <h3>Update Pool APR</h3>
          <div class="control-group">
            <label for="aprPoolId">Select Pool ID:</label>
            <select id="aprPoolId">${await getPoolOptions()}</select>
            <label for="newApr">New APR (%):</label>
            <input type="number" id="newApr" placeholder="360–10000%" min="360" max="10000">
            <button onclick="updateApr('owner')">Update APR</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Update Pool Parameters</h3>
          <div class="control-group">
            <label for="paramPoolId">Select Pool ID:</label>
            <select id="paramPoolId">${await getPoolOptions()}</select>
            <label for="newLockPeriod">Lock Period (days):</label>
            <input type="number" id="newLockPeriod" placeholder="Days" min="0" max="365">
            <label for="newMaxReward">Max Reward Per User:</label>
            <input type="number" id="newMaxReward" placeholder="Amount" step="0.01" min="0.01">
            <button onclick="updatePoolParameters()">Update Parameters</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Withdraw from Pool</h3>
          <div class="control-group">
            <label for="withdrawPoolId">Select Pool ID:</label>
            <select id="withdrawPoolId" onchange="updateRewardTokenField('withdraw', true)">
              <option value="">Select a pool</option>
              ${Object.keys(window.poolInfoCache).filter(id => window.poolInfoCache[id].active).map(id => `<option value="${id}">Pool ${id}</option>`).join('')}
            </select>
            <p id="withdrawPoolBalance">No pool selected</p>
            <label for="withdrawPoolAmount">Amount:</label>
            <input type="number" id="withdrawPoolAmount" placeholder="Amount" step="0.01" min="0.01">
            <label for="withdrawToken">Token:</label>
            <input type="text" id="withdrawToken" readonly placeholder="Select a pool to show token">
            <button id="withdrawButton" onclick="withdrawFromPool('owner')" disabled>Withdraw</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Deactivate Pools</h3>
          <div class="control-group">
            <label for="poolIdDeactivate">Select Pool ID:</label>
            <select id="poolIdDeactivate">${await getPoolOptions()}</select>
            <button onclick="deactivatePool('owner')">Deactivate Pool</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Activate Pools</h3>
          <div class="control-group">
            <label for="poolIdActivate">Select Pool ID:</label>
            <select id="poolIdActivate">${await getPoolOptions()}</select>
            <button onclick="activatePool('owner')">Activate Pool</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Initialize Contract</h3>
          <div class="control-group">
            <label for="newImplementationAddress">New Implementation Address:</label>
            <input type="text" id="newImplementationAddress" placeholder="0x...">
            <button onclick="upgradeTo()">Authorize Upgrade</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Contract Controls</h3>
          <div class="control-group">
            <button onclick="pauseContract()">Pause Contract</button>
            <button onclick="unpauseContract()">Unpause Contract</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Withdraw Tokens</h3>
          <div class="control-group">
            <label for="withdrawTokenAddress">Token Address:</label>
            <input type="text" id="withdrawTokenAddress" placeholder="0x0 for ETH">
            <label for="withdrawAmount">Amount:</label>
            <input type="number" id="withdrawAmount" placeholder="Amount" step="0.01" min="0.01">
            <button onclick="withdrawTokens()">Withdraw Tokens</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Set Creation Fee</h3>
          <div class="control-group">
            <label for="newCreationFee">New Fee (CHIPS):</label>
            <input type="number" id="newCreationFee" placeholder="New Fee" step="0.01" min="0">
            <button onclick="setCreationFee()">Set Creation Fee</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Manage Admins</h3>
          <div class="control-group">
            <label for="adminAddress">Wallet Address:</label>
            <input type="text" id="adminAddress" placeholder="0x...">
            <button onclick="addAdmin()">Add Admin</button>
            <button onclick="removeAdmin()">Remove Admin</button>
            <p id="adminStatus"></p>
          </div>
        </div>
        <div class="control-section">
          <h3>Get All Pool IDs</h3>
          <div class="control-group">
            <button onclick="getAllPoolIds()">Show All Pool IDs</button>
            <p id="allPoolIds"></p>
          </div>
        </div>
        <div class="control-section">
          <h3>Get Creator Pool IDs</h3>
          <div class="control-group">
            <label for="creatorAddress">Creator Address:</label>
            <input type="text" id="creatorAddress" placeholder="0x...">
            <button onclick="getCreatorPoolIds()">Show Creator Pool IDs</button>
            <p id="creatorPoolIds"></p>
          </div>
        </div>
        <div class="control-section">
          <h3>Download User Interactions</h3>
          <div class="control-group">
            <button onclick="downloadUserInteractions()">Download PDF</button>
          </div>
        </div>
      </div>
    `;

    // Inisialisasi dengan pemeriksaan elemen DOM
    if (document.getElementById('fundPoolId') && document.getElementById('fundPoolBalance') && document.getElementById('rewardToken')) {
      await updateRewardTokenField('fund', true);
    } else {
      console.warn('Fund pool elements not found, skipping updateRewardTokenField for fund');
    }
    if (document.getElementById('withdrawPoolId') && document.getElementById('withdrawPoolBalance') && document.getElementById('withdrawToken')) {
      await updateRewardTokenField('withdraw', true);
      // Aktifkan tombol Withdraw saat pool dipilih
      const withdrawButton = document.getElementById('withdrawButton');
      const withdrawPoolId = document.getElementById('withdrawPoolId');
      if (withdrawButton && withdrawPoolId) {
        withdrawPoolId.addEventListener('change', async () => {
          await updateRewardTokenField('withdraw', true);
          const withdrawTokenInput = document.getElementById('withdrawToken');
          if (withdrawTokenInput) {
            withdrawButton.disabled = !withdrawTokenInput.value || !web3.utils.isAddress(withdrawTokenInput.value);
          }
        });
      }
    } else {
      console.warn('Withdraw pool elements not found, skipping updateRewardTokenField for withdraw');
    }
  } catch (error) {
    console.error('Error loading owner tools:', error);
    if (ownerToolContent) {
      ownerToolContent.innerHTML = '<p>Please try again</p>';
    }
  }
}

// Fungsi untuk menambahkan admin
async function addAdmin() {
  try {
    const adminAddress = document.getElementById('adminAddress').value;
    const adminStatus = document.getElementById('adminStatus');
    if (!web3.utils.isAddress(adminAddress)) {
      throw new Error('Invalid wallet address');
    }
    if (!isOwner) {
      throw new Error('Owner access required');
    }
    const defaultAdminRole = await contract.methods.DEFAULT_ADMIN_ROLE().call();
    await contract.methods.grantRole(defaultAdminRole, adminAddress).send({ from: account });
    adminStatus.textContent = 'Admin added successfully';
    userInteractions.push({
      wallet: account,
      action: `Add Admin: ${adminAddress}`,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error adding admin:', error);
    document.getElementById('adminStatus').textContent = `Error: ${error.message}`;
  }
}

// Fungsi untuk menghapus admin
async function removeAdmin() {
  try {
    const adminAddress = document.getElementById('adminAddress').value;
    const adminStatus = document.getElementById('adminStatus');
    if (!web3.utils.isAddress(adminAddress)) {
      throw new Error('Invalid wallet address');
    }
    if (!isOwner) {
      throw new Error('Owner access required');
    }
    const defaultAdminRole = await contract.methods.DEFAULT_ADMIN_ROLE().call();
    await contract.methods.revokeRole(defaultAdminRole, adminAddress).send({ from: account });
    adminStatus.textContent = 'Admin removed successfully';
    userInteractions.push({
      wallet: account,
      action: `Remove Admin: ${adminAddress}`,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error removing admin:', error);
    document.getElementById('adminStatus').textContent = `Error: ${error.message}`;
  }
}

// Load creator tools with individual cards
async function loadCreatorTools() {
  try {
    const creatorToolContent = document.getElementById('creatorToolContent');
    if (!creatorToolContent) {
      console.error('Element creatorToolContent is null');
      return;
    }
    creatorToolContent.innerHTML = '';
    if (!contract || !account) {
      creatorToolContent.innerHTML = '<p>Please connect wallet</p>';
      return;
    }
    console.log('Loading creator tools for:', account);
    console.log('isOwner:', isOwner, 'isCreator:', isCreator);

    let poolIds = [];
    try {
      const poolCount = Number(await contract.methods.poolCount().call());
      console.log('Pool count:', poolCount);
      if (poolCount === 0) {
        console.log('No pools available, skipping pool check');
      } else {
        // Tambahkan delay untuk memastikan blockchain sinkron
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
          console.log(`Calling getCreatorPoolIds for account: ${account}`);
          poolIds = await contract.methods.getCreatorPoolIds(account, 0, 100).call();
        } catch (error) {
          console.warn('getCreatorPoolIds failed:', error.message);
          console.log('Falling back to manual check');
          for (let i = 0; i < poolCount; i++) {
            try {
              const pool = await contract.methods.getPoolInfo(i).call();
              if (pool.creator.toLowerCase() === account.toLowerCase() && pool.active) {
                poolIds.push(i);
              }
            } catch (poolError) {
              console.error(`Error fetching pool ${i}:`, poolError);
            }
          }
        }
      }
    } catch (error) {
      console.warn('Error fetching pool count:', error.message);
      creatorToolContent.innerHTML = '<p>Error loading pools</p>';
      return;
    }

    // Jika ada pool yang dibuat oleh akun, tampilkan UI meskipun bukan owner/creator
    if (poolIds.length === 0) {
      creatorToolContent.innerHTML = '<p>No pools created</p>';
      return;
    }

    // Filter pool aktif yang dibuat oleh creator
    const creatorPoolIds = [];
    for (let id of poolIds) {
      try {
        const pool = await contract.methods.getPoolInfo(id).call();
        if (pool.active && pool.creator.toLowerCase() === account.toLowerCase()) {
          creatorPoolIds.push(id);
        }
      } catch (error) {
        console.error(`Error fetching pool info for ID ${id}:`, error);
      }
    }

    // Jika tidak ada pool aktif, tampilkan pesan
    if (creatorPoolIds.length === 0) {
      creatorToolContent.innerHTML = '<p>No active pools created</p>';
      return;
    }

    creatorToolContent.innerHTML = `
      <div class="pool-grid">
        <div class="control-section">
          <h3>Fund Pool Rewards</h3>
          <div class="control-group">
            <label for="fundPoolId">Select Pool:</label>
            <select id="fundPoolId" onchange="updateRewardTokenField('fund')">
              <option value="">Select a pool</option>
              ${creatorPoolIds.map(id => `<option value="${id}">Pool ${id}</option>`).join('')}
            </select>
            <p id="fundPoolBalance">No pool selected</p>
            <label for="rewardToken">Reward Token:</label>
            <input type="text" id="rewardToken" readonly placeholder="Select a pool to show token">
            <label for="fundAmount">Amount:</label>
            <input type="number" id="fundAmount" placeholder="Amount" step="0.01" min="0.01">
            <button onclick="fundReward()">Fund Reward</button>
            <p id="fundStatus"></p>
          </div>
        </div>
        <div class="control-section">
          <h3>Withdraw from Pool</h3>
          <div class="control-group">
            <label for="creatorWithdrawPoolId">Select Pool:</label>
            <select id="creatorWithdrawPoolId" onchange="updateRewardTokenField('withdraw')">
              <option value="">Select a pool</option>
              ${creatorPoolIds.map(id => `<option value="${id}">Pool ${id}</option>`).join('')}
            </select>
            <p id="creatorWithdrawPoolBalance">No pool selected</p>
            <label for="creatorWithdrawAmount">Amount:</label>
            <input type="number" id="creatorWithdrawAmount" placeholder="Amount" step="0.01" min="0.01">
            <label for="creatorWithdrawToken">Token:</label>
            <input type="text" id="creatorWithdrawToken" readonly placeholder="Select a pool to show token">
            <button id="creatorWithdrawButton" onclick="withdrawFromPool('creator')" disabled>Withdraw</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Update Pool Parameters</h3>
          <div class="control-group">
            <label for="creatorParamPoolId">Select Pool:</label>
            <select id="creatorParamPoolId">${await getPoolOptionsForCreator()}</select>
            <label for="creatorNewLockPeriod">Lock Period (days):</label>
            <input type="number" id="creatorNewLockPeriod" placeholder="Days" min="0" max="365">
            <label for="creatorNewMaxReward">Max Reward Per User:</label>
            <input type="number" id="creatorNewMaxReward" placeholder="Amount" step="0.01" min="0.01">
            <button onclick="updatePoolParameters()">Update Parameters</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Activate/Deactivate Pool</h3>
          <div class="control-group">
            <label for="creatorManagePoolId">Select Pool:</label>
            <select id="creatorManagePoolId">${await getPoolOptionsForCreator()}</select>
            <button onclick="activatePool('creator')">Activate Pool</button>
            <button onclick="deactivatePool('creator')">Deactivate Pool</button>
          </div>
        </div>
        <div class="control-section">
          <h3>Update APR</h3>
          <div class="control-group">
            <label for="creatorUpdatePoolId">Select Pool:</label>
            <select id="creatorUpdatePoolId">${await getPoolOptionsForCreator()}</select>
            <label for="creatorNewApr">New APR (%):</label>
            <input type="number" id="creatorNewApr" placeholder="360–10000%" min="360" max="10000">
            <button onclick="updateApr('creator')">Update APR</button>
          </div>
        </div>
      </div>
    `;

    // Inisialisasi dengan pemeriksaan elemen DOM
    if (document.getElementById('fundPoolId') && document.getElementById('fundPoolBalance') && document.getElementById('rewardToken')) {
      await updateRewardTokenField('fund');
    } else {
      console.warn('Fund pool elements not found, skipping updateRewardTokenField for fund');
    }
    if (document.getElementById('creatorWithdrawPoolId') && document.getElementById('creatorWithdrawPoolBalance') && document.getElementById('creatorWithdrawToken')) {
      await updateRewardTokenField('withdraw');
      // Aktifkan tombol Withdraw saat pool dipilih
      const withdrawButton = document.getElementById('creatorWithdrawButton');
      const withdrawPoolId = document.getElementById('creatorWithdrawPoolId');
      if (withdrawButton && withdrawPoolId) {
        withdrawPoolId.addEventListener('change', async () => {
          await updateRewardTokenField('withdraw');
          const withdrawTokenInput = document.getElementById('creatorWithdrawToken');
          if (withdrawTokenInput) {
            withdrawButton.disabled = !withdrawTokenInput.value;
          }
        });
      }
    } else {
      console.warn('Withdraw pool elements not found, skipping updateRewardTokenField for withdraw');
    }
  } catch (error) {
    console.error('Load creator tools error:', error);
    if (creatorToolContent) {
      creatorToolContent.innerHTML = '<p>Please try again</p>';
    }
  }
}

// Grant Role (Add Admin)
async function grantRole() {
  try {
    const roleAddress = document.getElementById('roleAddress').value;
    const roleHash = document.getElementById('roleHash').value;
    if (!web3.utils.isAddress(roleAddress)) throw new Error('Invalid address');
    if (!roleHash || !web3.utils.isHexStrict(roleHash)) throw new Error('Invalid role hash');
    await contract.methods.grantRole(roleHash, roleAddress).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    loadOwnerTools();
  } catch (error) {
    console.error('Error granting role:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Revoke Role (Remove Admin)
async function revokeRole() {
  try {
    const roleAddress = document.getElementById('roleAddress').value;
    const roleHash = document.getElementById('roleHash').value;
    if (!web3.utils.isAddress(roleAddress)) throw new Error('Invalid address');
    if (!roleHash || !web3.utils.isHexStrict(roleHash)) throw new Error('Invalid role hash');
    await contract.methods.revokeRole(roleHash, roleAddress).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    loadOwnerTools();
  } catch (error) {
    console.error('Error revoking role:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Get pool options for creator dropdown
async function getPoolOptionsForDropdown() {
  try {
    if (!contract) throw new Error('Contract not initialized');
    const poolCount = await contract.methods.poolCount().call();
    console.log(`Total pools from poolCount: ${poolCount}`);
    let options = '<option value="">Select Pool</option>';
    for (let i = 0; i < poolCount; i++) {
      try {
        const pool = await contract.methods.getPoolInfo(i).call();
        console.log(`Pool ${i} info:`, pool);
        const ticker = pool.stakeToken.toLowerCase() === CHIPS_ADDRESS.toLowerCase() ? 'CHIPS' : await getTokenName(pool.stakeToken);
        options += `<option value="${i}">${ticker} (Pool ${i})</option>`;
      } catch (error) {
        console.error(`Error fetching pool ${i}:`, error.message);
        options += `<option value="${i}" disabled>Pool ${i} (Error)</option>`;
      }
    }
    return options;
  } catch (error) {
    console.error('Get pool options error:', error.message);
    return '<option value="">No pools available</option>';
  }
}

// Get pool options
async function getPoolOptions() {
  try {
    if (!contract) return '<option value="">No pools</option>';
    let poolIds = [];
    try {
      const poolCount = await contract.methods.poolCount().call();
      poolIds = Array.from({ length: poolCount }, (_, i) => i);
      console.log(`Pool IDs from poolCount: ${poolIds}`);
    } catch (error) {
      console.warn('Error fetching pool IDs:', error.message);
      return '<option value="">No pools available</option>';
    }
    let options = '<option value="">Select Pool</option>';
    for (let poolId of poolIds) {
      try {
        const pool = await contract.methods.getPoolInfo(poolId).call();
        const ticker = pool.stakeToken.toLowerCase() === CHIPS_ADDRESS.toLowerCase() ? 'CHIPS' : await getTokenName(pool.stakeToken);
        options += `<option value="${poolId}">${ticker} (Pool ${poolId})</option>`;
      } catch (poolError) {
        console.error(`Error fetching pool ${poolId}:`, poolError.message);
        options += `<option value="${poolId}" disabled>Pool ${poolId} (Error)</option>`;
      }
    }
    return options;
  } catch (error) {
    console.error('Get pool options error:', error.message);
    return '<option value="">No pools</option>';
  }
}

// Get pool options for creator
async function getPoolOptionsForCreator() {
  try {
    if (!contract || !account) {
      console.error('Contract or account not initialized');
      return '<option value="">No pools</option>';
    }
    let poolIds = [];
    try {
      console.log(`Fetching creator pool IDs for account: ${account}`);
      poolIds = await contract.methods.getCreatorPoolIds(account, 0, 100).call();
      console.log(`Creator pool IDs: ${poolIds}`);
    } catch (error) {
      console.warn('getCreatorPoolIds failed, falling back to manual check:', error.message);
      const poolCount = Number(await contract.methods.poolCount().call());
      for (let i = 0; i < poolCount; i++) {
        try {
          const pool = await contract.methods.getPoolInfo(i).call();
          if (pool.creator.toLowerCase() === account.toLowerCase()) {
            poolIds.push(i);
          }
        } catch (poolError) {
          console.error(`Error fetching pool ${i}:`, poolError.message);
        }
      }
    }
    let options = '<option value="">Select Pool</option>';
    for (let poolId of poolIds) {
      try {
        const pool = await contract.methods.getPoolInfo(poolId).call();
        const ticker = pool.stakeToken.toLowerCase() === CHIPS_ADDRESS.toLowerCase() ? 'CHIPS' : await getTokenName(pool.stakeToken);
        options += `<option value="${poolId}">${ticker} (Pool ${poolId})</option>`;
      } catch (poolError) {
        console.error(`Error fetching pool ${poolId}:`, poolError.message);
        options += `<option value="${poolId}" disabled>Pool ${poolId} (Error)</option>`;
      }
    }
    return options;
  } catch (error) {
    console.error('Get pool options for creator error:', error.message);
    return '<option value="">No pools</option>';
  }
}

// Create new pool
async function createPool() {
  try {
    const stakeToken = document.getElementById('stakeToken').value;
    let rewardToken = document.getElementById('rewardToken').value;
    const apr = document.getElementById('apr').value;
    const initialReward = document.getElementById('initialReward').value;
    const lockPeriod = document.getElementById('lockPeriod').value;
    const maxRewardPerUser = document.getElementById('maxRewardPerUser').value;
    const createStatus = document.getElementById('createStatus');

    if (!web3.utils.isAddress(stakeToken) || !web3.utils.isAddress(rewardToken)) {
      throw new Error('Invalid token address');
    }
    if (!apr || apr < 360 || apr > 10000) {
      throw new Error('APR must be between 360 and 10000');
    }
    if (!initialReward || initialReward <= 0) {
      throw new Error('Initial reward must be greater than 0');
    }
    if (!lockPeriod || lockPeriod < 0) {
      throw new Error('Lock period cannot be negative');
    }
    if (!maxRewardPerUser || maxRewardPerUser <= 0) {
      throw new Error('Max reward per user must be greater than 0');
    }

    const creationFee = await contract.methods.creationFee().call();
    let value = creationFee;

    if (rewardToken.toLowerCase() === '0x0000000000000000000000000000000000000000') {
      value = web3.utils.toBN(creationFee).add(web3.utils.toBN(web3.utils.toWei(initialReward.toString(), 'ether')));
    } else {
      const tokenContract = new web3.eth.Contract(IERC20_ABI, rewardToken);
      const allowance = await tokenContract.methods.allowance(account, contract.options.address).call();
      if (web3.utils.toBN(allowance).lt(web3.utils.toBN(web3.utils.toWei(initialReward.toString(), 'ether')))) {
        await tokenContract.methods.approve(contract.options.address, web3.utils.toWei(initialReward.toString(), 'ether')).send({ from: account });
      }
    }

    const lockPeriodInSeconds = lockPeriod * 86400;
    const initialRewardInWei = web3.utils.toWei(initialReward.toString(), 'ether');
    const maxRewardPerUserInWei = web3.utils.toWei(maxRewardPerUser.toString(), 'ether');

    console.log('Creating pool with params:', {
      stakeToken,
      rewardToken,
      apr,
      initialRewardInWei,
      lockPeriodInSeconds,
      maxRewardPerUserInWei,
      value: value.toString()
    });

    const receipt = await contract.methods.createPool(
      stakeToken,
      [rewardToken],
      apr,
      [initialRewardInWei],
      lockPeriodInSeconds,
      maxRewardPerUserInWei
    ).send({ from: account, value });

    console.log('Pool creation receipt:', receipt);
    const poolId = receipt.events.PoolCreated.returnValues.poolId;

    createStatus.textContent = `Pool ${poolId} created successfully`;
    userInteractions.push({
      wallet: account,
      action: `Create Pool: ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Create Pool: ${poolId}`);
    loadCreatePoolForm();
  } catch (error) {
    console.error('Create pool error:', error);
    document.getElementById('createStatus').textContent = `Error: ${error.message}`;
  }
}

// Fund reward
async function fundReward() {
  try {
    const poolId = document.getElementById('fundPoolId').value;
    const amount = document.getElementById('fundAmount').value;
    let rewardToken = document.getElementById('rewardToken').value;
    const fundStatus = document.getElementById('fundStatus');

    if (!poolId || isNaN(Number(poolId))) {
      throw new Error('Invalid pool ID');
    }
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (!web3.utils.isAddress(rewardToken)) {
      throw new Error('Invalid reward token address');
    }

    let value = '0';
    if (rewardToken.toLowerCase() === '0x0000000000000000000000000000000000000000') {
      value = web3.utils.toWei(amount.toString(), 'ether');
    } else {
      const tokenContract = new web3.eth.Contract(IERC20_ABI, rewardToken);
      const allowance = await tokenContract.methods.allowance(account, contract.options.address).call();
      if (web3.utils.toBN(allowance).lt(web3.utils.toBN(web3.utils.toWei(amount.toString(), 'ether')))) {
        await tokenContract.methods.approve(contract.options.address, web3.utils.toWei(amount.toString(), 'ether')).send({ from: account });
      }
    }

    console.log('Funding reward with params:', { poolId, rewardToken, amount: web3.utils.toWei(amount.toString(), 'ether'), value });

    await contract.methods.fundReward(
      poolId,
      rewardToken,
      web3.utils.toWei(amount.toString(), 'ether')
    ).send({ from: account, value });

    fundStatus.textContent = 'Reward funded successfully';
    userInteractions.push({
      wallet: account,
      action: `Fund Reward: ${amount} to Pool ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Fund Reward: ${amount} to Pool ${poolId}`);
    await updateRewardTokenField('fund', isOwner);
  } catch (error) {
    console.error('Fund reward error:', error);
    fundStatus.textContent = `Error: ${error.message}`;
  }
}

// Withdraw from pool
async function withdrawFromPool(caller) {
  try {
    const poolIdElement = document.getElementById(caller === 'owner' ? 'withdrawPoolId' : 'creatorWithdrawPoolId');
    const amountElement = document.getElementById(caller === 'owner' ? 'withdrawPoolAmount' : 'creatorWithdrawAmount');
    const tokenElement = document.getElementById(caller === 'owner' ? 'withdrawToken' : 'creatorWithdrawToken');
    const poolId = poolIdElement.value;
    const amount = amountElement.value;
    const token = tokenElement.value;

    if (!poolId || isNaN(Number(poolId))) {
      throw new Error('Invalid pool ID');
    }
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (!web3.utils.isAddress(token)) {
      throw new Error('Invalid token address');
    }

    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    console.log('Withdrawing from pool with params:', { poolId, token, amount: amountInWei });

    await contract.methods.withdrawReward(poolId, token, amountInWei).send({ from: account });

    const statusElement = caller === 'owner' ? document.getElementById('withdrawStatus') : document.getElementById('creatorWithdrawStatus');
    if (statusElement) {
      statusElement.textContent = 'Withdrawal successful';
    }
    userInteractions.push({
      wallet: account,
      action: `Withdraw: ${amount} from Pool ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Withdraw: ${amount} from Pool ${poolId}`);
    await updateRewardTokenField(caller === 'owner' ? 'withdraw' : 'withdraw', caller === 'owner');
  } catch (error) {
    console.error('Withdraw from pool error:', error);
    const statusElement = caller === 'owner' ? document.getElementById('withdrawStatus') : document.getElementById('creatorWithdrawStatus');
    if (statusElement) {
      statusElement.textContent = `Error: ${error.message}`;
    }
  }
}

// Update APR
async function updateApr(caller) {
  try {
    const poolId = document.getElementById(caller === 'owner' ? 'aprPoolId' : 'creatorUpdatePoolId').value;
    const newApr = document.getElementById(caller === 'owner' ? 'newApr' : 'creatorNewApr').value;

    if (!poolId || isNaN(Number(poolId))) {
      throw new Error('Invalid pool ID');
    }
    if (!newApr || newApr < 360 || newApr > 10000) {
      throw new Error('APR must be between 360 and 10000');
    }

    console.log('Updating APR with params:', { poolId, newApr });

    await contract.methods.updateApr(poolId, newApr).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Update APR: ${newApr}% for Pool ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Update APR: ${newApr}% for Pool ${poolId}`);
    loadCreatorTools();
  } catch (error) {
    console.error('Update APR error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Update pool parameters
async function updatePoolParameters() {
  try {
    const poolId = document.getElementById(isOwner ? 'paramPoolId' : 'creatorParamPoolId').value;
    const lockPeriod = document.getElementById(isOwner ? 'newLockPeriod' : 'creatorNewLockPeriod').value;
    const maxReward = document.getElementById(isOwner ? 'newMaxReward' : 'creatorNewMaxReward').value;

    if (!poolId || isNaN(Number(poolId))) {
      throw new Error('Invalid pool ID');
    }
    if (!lockPeriod || lockPeriod < 0) {
      throw new Error('Lock period cannot be negative');
    }
    if (!maxReward || maxReward <= 0) {
      throw new Error('Max reward must be greater than 0');
    }

    const lockPeriodInSeconds = lockPeriod * 86400;
    const maxRewardInWei = web3.utils.toWei(maxReward.toString(), 'ether');

    console.log('Updating pool parameters with:', { poolId, lockPeriodInSeconds, maxRewardInWei });

    await contract.methods.updatePoolParameters(poolId, lockPeriodInSeconds, maxRewardInWei).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Update Parameters: Pool ${poolId}, Lock ${lockPeriod} days, Max Reward ${maxReward}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Update Parameters: Pool ${poolId}, Lock ${lockPeriod} days, Max Reward ${maxReward}`);
    loadCreatorTools();
  } catch (error) {
    console.error('Update pool parameters error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Activate pool
async function activatePool(caller) {
  try {
    const poolId = document.getElementById(caller === 'owner' ? 'poolIdActivate' : 'creatorManagePoolId').value;

    if (!poolId || isNaN(Number(poolId))) {
      throw new Error('Invalid pool ID');
    }

    console.log('Activating pool:', poolId);

    await contract.methods.activatePool(poolId).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Activate Pool: ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Activate Pool: ${poolId}`);
    if (caller === 'owner') {
      loadOwnerTools();
    } else {
      loadCreatorTools();
    }
  } catch (error) {
    console.error('Activate pool error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Deactivate pool
async function deactivatePool(caller) {
  try {
    const poolId = document.getElementById(caller === 'owner' ? 'poolIdDeactivate' : 'creatorManagePoolId').value;

    if (!poolId || isNaN(Number(poolId))) {
      throw new Error('Invalid pool ID');
    }

    console.log('Deactivating pool:', poolId);

    await contract.methods.deactivatePool(poolId).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Deactivate Pool: ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Deactivate Pool: ${poolId}`);
    if (caller === 'owner') {
      loadOwnerTools();
    } else {
      loadCreatorTools();
    }
  } catch (error) {
    console.error('Deactivate pool error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Stake
async function stake(poolId, tabPrefix = '') {
  try {
    const amount = document.getElementById(`${tabPrefix}stakeAmount${poolId}`).value;
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const pool = await contract.methods.getPoolInfo(poolId).call();
    const stakeToken = pool.stakeToken.toLowerCase();
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    console.log('Staking with params:', { poolId, stakeToken, amount: amountInWei });

    if (stakeToken === '0x0000000000000000000000000000000000000000') {
      await contract.methods.stake(poolId, amountInWei).send({ from: account, value: amountInWei });
    } else {
      const tokenContract = new web3.eth.Contract(IERC20_ABI, stakeToken);
      const allowance = await tokenContract.methods.allowance(account, contract.options.address).call();
      if (web3.utils.toBN(allowance).lt(web3.utils.toBN(amountInWei))) {
        await tokenContract.methods.approve(contract.options.address, amountInWei).send({ from: account });
      }
      await contract.methods.stake(poolId, amountInWei).send({ from: account });
    }

    userInteractions.push({
      wallet: account,
      action: `Stake: ${amount} in Pool ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Stake: ${amount} in Pool ${poolId}`);
    showTab(tabPrefix.includes('myStakes') ? 'myStakes' : 'defaultPool');
  } catch (error) {
    console.error('Stake error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Unstake
async function unstake(poolId, tabPrefix = '') {
  try {
    const amount = document.getElementById(`${tabPrefix}unstakeAmount${poolId}`).value;
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    console.log('Unstaking with params:', { poolId, amount: amountInWei });

    await contract.methods.unstake(poolId, amountInWei).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Unstake: ${amount} from Pool ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Unstake: ${amount} from Pool ${poolId}`);
    showTab(tabPrefix.includes('myStakes') ? 'myStakes' : 'defaultPool');
  } catch (error) {
    console.error('Unstake error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Claim rewards
async function claimRewards(poolId) {
  try {
    console.log('Claiming rewards for pool:', poolId);

    await contract.methods.claimRewards(poolId).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Claim Rewards: Pool ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Claim Rewards: Pool ${poolId}`);
    showTab('myStakes');
  } catch (error) {
    console.error('Claim rewards error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Pause contract
async function pauseContract() {
  try {
    await contract.methods.pause().send({ from: account });
    document.getElementById('walletStatus').textContent = 'Contract paused';
    userInteractions.push({
      wallet: account,
      action: 'Pause Contract',
      timestamp: Date.now()
    });
    await saveUserInteraction(account, 'Pause Contract');
  } catch (error) {
    console.error('Pause contract error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Unpause contract
async function unpauseContract() {
  try {
    await contract.methods.unpause().send({ from: account });
    document.getElementById('walletStatus').textContent = 'Contract unpaused';
    userInteractions.push({
      wallet: account,
      action: 'Unpause Contract',
      timestamp: Date.now()
    });
    await saveUserInteraction(account, 'Unpause Contract');
  } catch (error) {
    console.error('Unpause contract error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Withdraw tokens
async function withdrawTokens() {
  try {
    const tokenAddress = document.getElementById('withdrawTokenAddress').value;
    const amount = document.getElementById('withdrawAmount').value;

    if (!web3.utils.isAddress(tokenAddress)) {
      throw new Error('Invalid token address');
    }
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    console.log('Withdrawing tokens with params:', { tokenAddress, amount: amountInWei });

    await contract.methods.withdraw(tokenAddress, amountInWei).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Withdraw Tokens: ${amount} ${tokenAddress}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Withdraw Tokens: ${amount} ${tokenAddress}`);
    loadOwnerTools();
  } catch (error) {
    console.error('Withdraw tokens error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Set creation fee
async function setCreationFee() {
  try {
    const newFee = document.getElementById('newCreationFee').value;
    if (!newFee || newFee < 0) {
      throw new Error('Fee cannot be negative');
    }

    const feeInWei = web3.utils.toWei(newFee.toString(), 'ether');
    console.log('Setting creation fee:', feeInWei);

    await contract.methods.setCreationFee(feeInWei).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Set Creation Fee: ${newFee} CHIPS`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Set Creation Fee: ${newFee} CHIPS`);
    loadOwnerTools();
  } catch (error) {
    console.error('Set creation fee error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Upgrade contract
async function upgradeTo() {
  try {
    const newImplementation = document.getElementById('newImplementationAddress').value;
    if (!web3.utils.isAddress(newImplementation)) {
      throw new Error('Invalid implementation address');
    }

    console.log('Upgrading contract to:', newImplementation);

    await contract.methods.upgradeTo(newImplementation).send({ from: account });

    userInteractions.push({
      wallet: account,
      action: `Upgrade Contract: ${newImplementation}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Upgrade Contract: ${newImplementation}`);
    loadOwnerTools();
  } catch (error) {
    console.error('Upgrade contract error:', error);
    document.getElementById('walletStatus').textContent = `Error: ${error.message}`;
  }
}

// Get all pool IDs
async function getAllPoolIds() {
  try {
    const allPoolIds = document.getElementById('allPoolIds');
    let poolIds = [];
    try {
      poolIds = await contract.methods.getAllPoolIds(0, 100).call();
    } catch (error) {
      console.warn('getAllPoolIds failed, falling back to manual check:', error.message);
      const poolCount = Number(await contract.methods.poolCount().call());
      for (let i = 0; i < poolCount; i++) {
        try {
          const pool = await contract.methods.getPoolInfo(i).call();
          if (pool.active) poolIds.push(i);
        } catch (poolError) {
          console.error(`Error fetching pool ${i}:`, poolError.message);
        }
      }
    }
    allPoolIds.textContent = `Pool IDs: ${poolIds.join(', ')}`;
    userInteractions.push({
      wallet: account,
      action: 'Get All Pool IDs',
      timestamp: Date.now()
    });
    await saveUserInteraction(account, 'Get All Pool IDs');
  } catch (error) {
    console.error('Get all pool IDs error:', error);
    document.getElementById('allPoolIds').textContent = `Error: ${error.message}`;
  }
}

// Get creator pool IDs
async function getCreatorPoolIds() {
  try {
    const creatorAddress = document.getElementById('creatorAddress').value;
    const creatorPoolIds = document.getElementById('creatorPoolIds');
    if (!web3.utils.isAddress(creatorAddress)) {
      throw new Error('Invalid creator address');
    }
    let poolIds = [];
    try {
      poolIds = await contract.methods.getCreatorPoolIds(creatorAddress, 0, 100).call();
    } catch (error) {
      console.warn('getCreatorPoolIds failed, falling back to manual check:', error.message);
      const poolCount = Number(await contract.methods.poolCount().call());
      for (let i = 0; i < poolCount; i++) {
        try {
          const pool = await contract.methods.getPoolInfo(i).call();
          if (pool.creator.toLowerCase() === creatorAddress.toLowerCase() && pool.active) {
            poolIds.push(i);
          }
        } catch (poolError) {
          console.error(`Error fetching pool ${i}:`, poolError.message);
        }
      }
    }
    creatorPoolIds.textContent = `Creator Pool IDs: ${poolIds.join(', ')}`;
    userInteractions.push({
      wallet: account,
      action: `Get Creator Pool IDs: ${creatorAddress}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Get Creator Pool IDs: ${creatorAddress}`);
  } catch (error) {
    console.error('Get creator pool IDs error:', error);
    document.getElementById('creatorPoolIds').textContent = `Error: ${error.message}`;
  }
}

// Load pinned pool IDs from Firestore
async function loadPinnedPoolIds() {
  try {
    if (!account) {
      console.warn('No account connected, returning empty pinned pool IDs');
      return [];
    }
    if (!db) {
      console.error('Firestore not initialized, returning empty pinned pool IDs');
      return [];
    }
    const docRef = db.collection('users').doc(account.toLowerCase());
    const doc = await docRef.get();
    if (doc.exists) {
      const data = doc.data();
      return data.pinnedPoolIds || [];
    }
    return [];
  } catch (error) {
    console.error('Error loading pinned pool IDs from Firestore:', error);
    return [];
  }
}

// Save pinned pool IDs to Firestore
async function savePinnedPoolIds(pinnedPoolIds) {
  try {
    if (!account) {
      console.warn('No account connected, cannot save pinned pool IDs');
      return;
    }
    if (!db) {
      console.error('Firestore not initialized, cannot save pinned pool IDs');
      return;
    }
    const docRef = db.collection('users').doc(account.toLowerCase());
    await docRef.set({ pinnedPoolIds }, { merge: true });
    console.log('Pinned pool IDs saved to Firestore:', pinnedPoolIds);
  } catch (error) {
    console.error('Error saving pinned pool IDs to Firestore:', error);
  }
}

// Save user interaction to Firestore
async function saveUserInteraction(wallet, action) {
  try {
    if (!wallet) {
      console.warn('No wallet address provided, cannot save interaction');
      return;
    }
    if (!db) {
      console.error('Firestore not initialized, cannot save interaction');
      return;
    }
    await db.collection('userInteractions').add({
      wallet: wallet.toLowerCase(),
      action,
      timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log(`User interaction saved: ${action}`);
  } catch (error) {
    console.error('Error saving user interaction to Firestore:', error);
  }
}

// Load user interactions from Firestore
async function loadUserInteractions() {
  try {
    if (!account) {
      console.warn('No account connected, returning empty interactions');
      return [];
    }
    if (!db) {
      console.error('Firestore not initialized, returning empty interactions');
      return [];
    }
    const querySnapshot = await db.collection('userInteractions')
      .where('wallet', '==', account.toLowerCase())
      .orderBy('timestamp', 'desc')
      .get();
    const interactions = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      interactions.push({
        wallet: data.wallet,
        action: data.action,
        timestamp: data.timestamp ? data.timestamp.toDate().getTime() : Date.now()
      });
    });
    return interactions;
  } catch (error) {
    console.error('Error loading user interactions from Firestore:', error);
    return [];
  }
}

// Initialize app data
async function initializeAppData() {
  try {
    if (!account) {
      console.warn('No account connected, skipping app data initialization');
      return;
    }
    if (!db) {
      console.error('Firestore not initialized, skipping app data initialization');
      return;
    }
    userInteractions = await loadUserInteractions();
    console.log('App data initialized with user interactions:', userInteractions.length);
  } catch (error) {
    console.error('Error initializing app data:', error);
  }
}

// Pin pool
async function pinPool() {
  try {
    const poolId = document.getElementById('pinPoolId').value;
    const pinStatus = document.getElementById('pinStatus').value;
    if (!poolId || isNaN(Number(poolId))) {
      throw new Error('Invalid pool ID');
    }
    if (!db) {
      console.error('Firestore not initialized. Please try again later.');
      pinStatus.textContent = 'Error: Firestore not initialized, please try again later';
      return;
    }

    const pinnedPoolIds = await loadPinnedPoolIds();
    if (pinnedPoolIds.includes(Number(poolId))) {
      pinStatus.textContent = 'Pool already pinned';
      return;
    }

    pinnedPoolIds.push(Number(poolId));
    await savePinnedPoolIds(pinnedPoolIds);

    pinStatus.textContent = `Pool ${poolId} pinned successfully`;
    userInteractions.push({
      wallet: account,
      action: `Pin Pool: ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Pin Pool: ${poolId}`);
    loadOwnerTools();
    showTab('defaultPool');
  } catch (error) {
    console.error('Pin pool error:', error);
    document.getElementById('pinStatus').textContent = `Error: ${error.message}`;
    };
  }

// Unpin pool
async function unpinPool() {
  try {
    const poolId = document.getElementById('pinPoolId').value;
    const pinStatus = document.getElementById('pinStatus').value;
    if (!poolId || isNaN(Number(poolId))) {
      throw new Error('Invalid pool ID');
    }
    if (!db) {
      console.error('Firestore not initialized. Please try again later');
      pinStatus.textContent = 'Error: Firestore not initialized, please try again later';
      return;
    }

    let pinnedPoolIds = await loadPinnedPoolIds();
    if (!pinnedPoolIds.includes(Number(poolId))) {
      pinStatus.textContent = 'Pool not pinned';
      return;
    }

    pinnedPoolIds = pinnerPinnedPoolIds(id => id !== Number(poolId));
    await savePinnedPoolIds(pinnedPoolIds);

    pinStatus.textContent = `Pool ${poolId} unpinned successfully`;
    userInteractions.push({
      wallet: account,
      action: `Unpin Pool: ${poolId}`,
      timestamp: Date.now()
    });
    await saveUserInteraction(account, `Unpin Pool: ${poolId}`);
    loadOwnerTools();
    document.getElementById('defaultPoolTab').click();
  } catch (error) {
    console.error('Unpin pool error:', error);
    documentById.get('pinStatus').textContent = `Error: ${error.message}`;
  }
}

// Download user interactions as PDF (tetap utuh)
function downloadUserInteractions() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text('User Interactions Report', 10, 10);
  let y = 20;

  userInteractions.forEach((interaction, index) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    const date = new Date(interaction.timestamp).toLocaleString();
    doc.text(
      `${index + 1}. Wallet: ${interaction.wallet} | Action: ${interaction.action} | Time: ${date}`,
      10,
      y
    );
    y += 10;
  });

  doc.save('user_interactions.pdf');
}
