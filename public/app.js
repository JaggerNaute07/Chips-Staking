// app.js
const CONTRACT_ADDRESS = "0xb712DC3E8cC3804c8aef25549f748b28aC39C59e";
const FEE_RECEIVER = "0x0079352b27fDce7DDB744644dEFBcdB99cb5A9b9";
const RPC_URLS = ["http://20.63.3.101:8545", "https://holistic-purple-period.glitch.me"];
const CHAIN_ID = "0x2ca"; // 714 in hex
const USDT_ADDRESS = "0x47C9e3E4078Edb31b24C72AF65d64dA21041801E"; 
const CHIPS_ADDRESS = "0x0000000000000000000000000000000000000000";   
const DECIMALS = 18;
const MIN_APR = 360;
const MAX_APR = 10000;
const ADMIN_WALLET = "0x0079352b27fDce7DDB744644dEFBcdB99cb5A9b9".toLowerCase(); 

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
    "name": "CREATOR_ROLE",
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
  apiKey: window.env.FIREBASE_API_KEY,
  authDomain: window.env.FIREBASE_AUTH_DOMAIN,
  projectId: window.env.FIREBASE_PROJECT_ID,
  storageBucket: window.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: window.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);


// Setelah initialize, baru akses Firestore
const db = firebase.firestore();


// Fungsi log interaksi ke Firestore
async function logInteraction(action) {
  try {
    const db = firebase.firestore();
    const timestamp = new Date();

    await db.collection('userInteractions').add({
      wallet: account,
      action,
      timestamp: timestamp.toISOString()
    });

    console.log('Logged interaction to Firestore:', action);
  } catch (err) {
    console.error('Failed to log interaction:', err);
  }
}


// Load from localStorage on startup
const storedInteractions = localStorage.getItem('userInteractions');
if (storedInteractions) {
  try {
    userInteractions = JSON.parse(storedInteractions);
  } catch (e) {
    console.warn('Failed to parse stored interactions:', e);
    userInteractions = [];
  }
}
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
    const pinPoolSection = document.getElementById('pinPoolSection');
    if (pinPoolSection) {
     pinPoolSection.style.display = isOwner ? 'block' : 'none';
    }


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
    } catch (error) {
      console.error('Error fetching pool count:', error.message);
      poolBalanceElement.innerText = '0';
      poolBalanceChipsElement.innerText = '0';
      totalStakerElement.innerText = '0';
      return;
    }

    for (let i = 0; i < poolCount; i++) {
      try {
        const pool = await contract.methods.getPoolInfo(i).call();
        if (!pool.active) continue;

        const stakeToken = pool.stakeToken?.toLowerCase().trim() || '';
        const totalStaked = BigInt(pool.totalStaked?.toString() || '0');
        const stakerCount = Number(pool.stakerCount?.toString() || '0');

        if (stakeToken === USDT_ADDRESS.toLowerCase().trim()) {
          totalStakedUSDT += totalStaked;
        } else if (stakeToken === CHIPS_ADDRESS.toLowerCase().trim()) {
          totalStakedCHIPS += totalStaked;
        }

        totalStakers += stakerCount;
      } catch (e) {
        console.error(`Error fetching pool ${i}:`, e.message);
      }
    }

    poolBalanceElement.innerText = Number(web3.utils.fromWei(totalStakedUSDT.toString(), 'ether')).toFixed(2);
    poolBalanceChipsElement.innerText = Number(web3.utils.fromWei(totalStakedCHIPS.toString(), 'ether')).toFixed(2);
    totalStakerElement.innerText = totalStakers.toString();

    // 🔥 Tambahan: cek role dan update tab visibilitas
    try {
      const defaultAdminRole = await contract.methods.DEFAULT_ADMIN_ROLE().call();
      isOwner = await contract.methods.hasRole(defaultAdminRole, account).call();

      const creatorRole = await contract.methods.CREATOR_ROLE().call();
      isCreator = await contract.methods.hasRole(creatorRole, account).call();

      console.log('Role check — isOwner:', isOwner, 'isCreator:', isCreator);

      updateTabsVisibility(); // pastikan tab newPools dan creatorTools muncul
    } catch (roleError) {
      console.warn('Gagal cek role:', roleError.message);
    }

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
    const db = firebase.firestore();
    const pinnedPoolDoc = await db.collection('pinnedPools').doc(ADMIN_WALLET).get();
    const pinnedPoolIds = pinnedPoolDoc.exists ? pinnedPoolDoc.data().poolIds || [] : [];
    console.log('Pinned Pool IDs from Firestore:', pinnedPoolIds);

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
    const pinnedPoolIds = JSON.parse(localStorage.getItem('pinnedPoolIds') || '[]');
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
        <p>APR: ${aprValue} %</p>
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
          poolIds = await contract.methods.getCreatorPoolIds(account, 0, 100).call({ from: account });
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

    if (poolIds.length === 0) {
      creatorToolContent.innerHTML = '<p>No pools created</p>';
      return;
    }

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

    // Inisialisasi DOM untuk fund
    if (document.getElementById('fundPoolId') && document.getElementById('fundPoolBalance') && document.getElementById('rewardToken')) {
      await updateRewardTokenField('fund');
    } else {
      console.warn('Fund pool elements not found, skipping updateRewardTokenField for fund');
    }

    // Inisialisasi DOM untuk withdraw
    if (document.getElementById('creatorWithdrawPoolId') && document.getElementById('creatorWithdrawPoolBalance') && document.getElementById('creatorWithdrawToken')) {
      await updateRewardTokenField('withdraw');
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
    const creatorToolContent = document.getElementById('creatorToolContent');
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
    if (!contract || !account) return '<option value="">No pools</option>';
    let poolIds = [];
    try {
      const poolCount = await contract.methods.poolCount().call();
      for (let i = 0; i < poolCount; i++) {
        const pool = await contract.methods.getPoolInfo(i).call();
        if (pool.creator.toLowerCase() === account.toLowerCase()) {
          poolIds.push(i);
        }
      }
    } catch (error) {
      console.warn('Error fetching creator pools:', error.message);
      return '<option value="">No pools available</option>';
    }
    let options = '<option value="">Select Pool</option>';
    for (let poolId of poolIds) {
      const pool = await contract.methods.getPoolInfo(poolId).call();
      const ticker = pool.stakeToken.toLowerCase() === CHIPS_ADDRESS.toLowerCase() ? 'CHIPS' : await getTokenName(pool.stakeToken);
      options += `<option value="${poolId}">${ticker} (Pool ${poolId})</option>`;
    }
    return options;
  } catch (error) {
    console.error('Get pool options for creator error:', error.message);
    return '<option value="">No pools</option>';
  }
}

// Get reward token options for dropdown
async function getRewardTokenOptions(poolId) {
  try {
    if (!contract) throw new Error('Contract not initialized');
    const pool = await contract.methods.getPoolInfo(poolId).call();
    console.log(`Reward tokens for pool ${poolId}:`, pool.rewardTokens);
    let options = '<option value="">Select Reward Token</option>';
    for (let token of pool.rewardTokens) {
      const tokenName = token.toLowerCase() === '0x0000000000000000000000000000000000000000' ? 'CHIPS' : await getTokenName(token);
      options += `<option value="${token}">${tokenName}</option>`;
    }
    return options;
  } catch (error) {
    console.error('Error fetching reward token options:', error.message);
    return '<option value="">No tokens available</option>';
  }
}

// Stake
async function stake(poolId, tabPrefix = '') {
  try {
    const stakeInput = document.getElementById(`${tabPrefix}stakeAmount${poolId}`);
    if (!stakeInput) {
      document.getElementById('walletStatus').innerText = 'Stake input not found';
      console.error(`Stake input element not found for pool ${poolId} with prefix ${tabPrefix}`);
      return;
    }

    const amount = stakeInput.value.trim();
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      document.getElementById('walletStatus').innerText = 'Please enter a valid stake amount';
      console.log(`Invalid stake amount for pool ${poolId}:`, amount);
      return;
    }

    const amountInWei = web3.utils.toWei(amount, 'ether');
    const pool = await contract.methods.getPoolInfo(poolId).call();
    if (!pool.active) {
      document.getElementById('walletStatus').innerText = 'Pool is not active';
      console.log(`Pool ${poolId} is inactive`);
      return;
    }

    let txOptions = { from: account, gas: 200000, gasPrice: web3.utils.toWei('12', 'gwei') };
    if (pool.stakeToken === '0x0000000000000000000000000000000000000000') {
      const balance = await web3.eth.getBalance(account);
      if (Number(balance) < Number(amountInWei)) {
        document.getElementById('walletStatus').innerText = 'Insufficient balance for staking';
        console.log(`Insufficient balance for pool ${poolId}:`, web3.utils.fromWei(balance, 'ether'));
        return;
      }
      txOptions.value = amountInWei;
    } else {
      const tokenContract = new web3.eth.Contract(IERC20_ABI, pool.stakeToken);
      const balance = await tokenContract.methods.balanceOf(account).call();
      if (Number(balance) < Number(amountInWei)) {
        document.getElementById('walletStatus').innerText = 'Insufficient token balance for staking';
        console.log(`Insufficient token balance for pool ${poolId}:`, web3.utils.fromWei(balance, 'ether'));
        return;
      }

      const allowance = await tokenContract.methods.allowance(account, contract.options.address).call();
      if (Number(allowance) < Number(amountInWei)) {
        document.getElementById('walletStatus').innerText = 'Approving token for staking...';
        try {
          await tokenContract.methods
            .approve(contract.options.address, amountInWei)
            .send({ from: account, gas: 100000, gasPrice: web3.utils.toWei('12', 'gwei') });
          document.getElementById('walletStatus').innerText = 'Approve transaction success';
        } catch (approveError) {
          console.error('Error approving token:', approveError);
          document.getElementById('walletStatus').innerText = 'Transaction failed';
          return;
        }
      }
    }

    // Kirim transaksi stake
    await contract.methods.stake(poolId, amountInWei).send(txOptions);
    document.getElementById('walletStatus').innerText = 'Stake successful';

    // Simpan ke array untuk PDF
    userInteractions.push({
      wallet: account,
      action: `Stake ${amount} on Pool ${poolId}`,
      timestamp: Date.now()
    });

    // Simpan ke Firestore untuk persistensi
    await logInteractionToFirestore(`Stake ${amount} ke Pool ${poolId}`);

    console.log(`Stake successful for pool ${poolId}:`, amount);
  } catch (error) {
    console.error('Error staking:', error);
    document.getElementById('walletStatus').innerText = 'Transaction failed';
  }
}


// Unstake
async function unstake(poolId, tabPrefix = '') {
  try {
    const unstakeInput = document.getElementById(`${tabPrefix}unstakeAmount${poolId}`);
    if (!unstakeInput) {
      document.getElementById('walletStatus').textContent = 'Unstake input not found';
      console.error(`Unstake input element not found for pool ${poolId} with prefix ${tabPrefix}`);
      return;
    }
    const amount = unstakeInput.value.trim();
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      document.getElementById('walletStatus').textContent = 'Please enter a valid unstake amount';
      console.log(`Invalid unstake amount for pool ${poolId}:`, amount);
      return;
    }

    if (!account) {
      document.getElementById('walletStatus').textContent = 'Please connect your wallet';
      console.log('No account connected for unstake');
      return;
    }

    const poolInfo = await contract.methods.getPoolInfo(poolId).call();
    if (!poolInfo.active) {
      document.getElementById('walletStatus').textContent = 'Pool is not active';
      console.log(`Pool ${poolId} is inactive`);
      return;
    }

    const userStake = await contract.methods.getUserStake(poolId, account).call();
    const stakeAmountWei = web3.utils.toWei(amount, 'ether');
    if (web3.utils.toBN(userStake.amount).lt(web3.utils.toBN(stakeAmountWei))) {
      document.getElementById('walletStatus').textContent = 'Insufficient staked amount';
      console.log(`Insufficient stake for pool ${poolId}:`, {
        userStake: web3.utils.fromWei(userStake.amount, 'ether'),
        requested: amount
      });
      return;
    }

    const timestamp = Number(userStake.timestamp || 0);
    const lockPeriod = Number(poolInfo.lockPeriod || 0);
    const currentTime = Math.floor(Date.now() / 1000);
    if (timestamp + lockPeriod > currentTime) {
      document.getElementById('walletStatus').textContent = 'Lock period not yet expired';
      console.log(`Lock period not expired for pool ${poolId}:`, {
        unlockTime: timestamp + lockPeriod,
        currentTime
      });
      return;
    }

    let gasEstimate;
    try {
      gasEstimate = await contract.methods
        .unstake(poolId, stakeAmountWei)
        .estimateGas({ from: account });
      console.log(`Gas estimate for unstake pool ${poolId}:`, gasEstimate);
    } catch (error) {
      console.error(`Gas estimation failed for pool ${poolId}:`, error);
      gasEstimate = 200000;
    }

    const gasLimit = Math.min(Math.max(Math.floor(gasEstimate * 1.2), 100000), 500000);
    console.log(`Gas limit for unstake pool ${poolId}:`, gasLimit);

    document.getElementById('walletStatus').textContent = 'Unstaking...';
    console.log(`Sending unstake transaction for pool ${poolId}:`, {
      amount,
      amountWei: stakeAmountWei,
      from: account
    });
    const tx = await contract.methods
      .unstake(poolId, stakeAmountWei)
      .send({
        from: account,
        gas: gasLimit,
        gasPrice: web3.utils.toWei('12', 'gwei')
      });

    console.log(`Unstake successful for pool ${poolId}:`, tx);
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    userInteractions.push({
      wallet: account,
      action: `Unstake ${amount} from Pool ${poolId}`,
      timestamp: Date.now()
    });
    
    logInteraction(`Unstake ${amount} dari Pool ${poolId}`);
    console.log('Updating UI after unstake at:', new Date().toLocaleString());
    await loadAllTabs();
    await loadMyStakes();
    console.log('UI updated after unstake for pool:', poolId);
  } catch (error) {
    console.error(`Error unstaking pool ${poolId}:`, error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Claim rewards
async function claimRewards(poolId) {
  try {
    await contract.methods.claimRewards(poolId).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    userInteractions.push({ wallet: account, action: `Claim Rewards for Pool ${poolId}`, timestamp: Date.now() });
    loadAllTabs();
    logInteraction(`Claim Reward di Pool ${poolId}`);
    logInteraction(`Create Pool: Stake ${stakeToken}, Reward ${rewardToken}, APR ${apr}`);
  } catch (error) {
    console.error('Error claiming rewards:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Create pool
async function createPool() {
  try {
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      document.getElementById('createStatus').textContent = 'Please connect your wallet and try again';
      return;
    }
    const account = accounts[0];

    const stakeToken = document.getElementById('stakeToken').value;
    const rewardToken = document.getElementById('rewardToken').value;
    const apr = parseInt(document.getElementById('apr').value);
    const initialReward = document.getElementById('initialReward').value;
    const lockPeriod = document.getElementById('lockPeriod').value;
    const maxRewardPerUser = document.getElementById('maxRewardPerUser').value;

    console.log('Create Pool Input:', {
      stakeToken,
      rewardToken,
      apr,
      initialReward,
      initialRewardWei: web3.utils.toWei(initialReward, 'ether'),
      lockPeriod: lockPeriod * 24 * 60 * 60,
      maxRewardPerUser: web3.utils.toWei(maxRewardPerUser, 'ether'),
      account
    });

    if (!web3.utils.isAddress(stakeToken) && stakeToken !== '0x0000000000000000000000000000000000000000') {
      document.getElementById('createStatus').textContent = 'Invalid stake token address';
      return;
    }
    if (!web3.utils.isAddress(rewardToken)) {
      document.getElementById('createStatus').textContent = 'Invalid reward token address';
      return;
    }
    if (isNaN(apr) || apr < 360 || apr > 10000) {
      document.getElementById('createStatus').textContent = 'APR must be between 360 and 10000';
      return;
    }
    if (isNaN(parseFloat(initialReward)) || parseFloat(initialReward) <= 0) {
      document.getElementById('createStatus').textContent = 'Initial reward must be greater than 0';
      return;
    }
    if (isNaN(parseInt(lockPeriod)) || parseInt(lockPeriod) > 365) {
      document.getElementById('createStatus').textContent = 'Lock period cannot exceed 365 days';
      return;
    }
    if (isNaN(parseFloat(maxRewardPerUser)) || parseFloat(maxRewardPerUser) <= 0) {
      document.getElementById('createStatus').textContent = 'Max reward per user must be greater than 0';
      return;
    }

    const tokenContract = new web3.eth.Contract(IERC20_ABI, rewardToken);
    let decimals;
    try {
      decimals = await tokenContract.methods.decimals().call();
      console.log('Reward Token Decimals:', decimals);
    } catch {
      document.getElementById('createStatus').textContent = 'Invalid reward token';
      return;
    }

    const initialRewardWei = web3.utils.toWei(initialReward, 'ether');
    const allowance = await tokenContract.methods.allowance(account, CONTRACT_ADDRESS).call();
    console.log('Allowance:', web3.utils.fromWei(allowance, 'ether'));
    if (web3.utils.toBN(allowance).lt(web3.utils.toBN(initialRewardWei))) {
      console.log('Approving reward token...');
      document.getElementById('createStatus').textContent = 'Waiting approve';
      const nonceApprove = await web3.eth.getTransactionCount(account, 'pending');
      await tokenContract.methods.approve(CONTRACT_ADDRESS, initialRewardWei).send({
        from: account,
        gas: 100000,
        gasPrice: web3.utils.toWei('12', 'gwei'),
        nonce: nonceApprove
      });
      console.log('Approved Allowance:', web3.utils.fromWei(await tokenContract.methods.allowance(account, CONTRACT_ADDRESS).call(), 'ether'));
    }

    // Ambil creationFee dari kontrak
    let creationFee = '0';
    try {
      creationFee = await contract.methods.creationFee().call();
      console.log('Creation Fee:', web3.utils.fromWei(creationFee, 'ether'));
    } catch (error) {
      console.error('Failed to fetch creationFee:', error);
      document.getElementById('createStatus').textContent = 'Failed to fetch creation fee';
      return;
    }

    // Hitung msg.value: creationFee + initialRewardWei (jika rewardToken adalah native token)
    let msgValue = rewardToken === '0x0000000000000000000000000000000000000000' ? web3.utils.toBN(initialRewardWei) : web3.utils.toBN('0');
    const isAdmin = await contract.methods.hasRole(await contract.methods.DEFAULT_ADMIN_ROLE().call(), account).call();
    if (!isAdmin) {
      msgValue = msgValue.add(web3.utils.toBN(creationFee));
    }
    console.log('Msg Value:', web3.utils.fromWei(msgValue, 'ether'));

    const nonce = await web3.eth.getTransactionCount(account, 'pending');
    console.log('Nonce:', nonce);
    let gasEstimate;
    try {
      gasEstimate = await contract.methods.createPool(
        stakeToken,
        [rewardToken],
        apr * 1,
        [initialRewardWei],
        lockPeriod * 24 * 60 * 60,
        web3.utils.toWei(maxRewardPerUser, 'ether')
      ).estimateGas({ 
        from: account,
        value: msgValue
      });
      console.log('Gas Estimate:', gasEstimate);
    } catch (error) {
      console.error('Gas estimation failed:', error);
      gasEstimate = 500000;
    }

    const gasLimit = Math.min(Math.max(Math.floor(gasEstimate * 1.2), 500000), 2000000);
    console.log('Gas Limit:', gasLimit);

    document.getElementById('createStatus').textContent = 'Creating pool...';
    const tx = await contract.methods.createPool(
      stakeToken,
      [rewardToken],
      apr * 1,
      [initialRewardWei],
      lockPeriod * 24 * 60 * 60,
      web3.utils.toWei(maxRewardPerUser, 'ether')
    ).send({
      from: account,
      gas: gasLimit,
      gasPrice: web3.utils.toWei('12', 'gwei'),
      nonce,
      value: msgValue
    });

    const poolCount = await contract.methods.poolCount().call();
    const poolId = poolCount - 1;
    window.newPoolIds = window.newPoolIds || [];
    window.newPoolIds.push(Number(poolId));
    console.log('Added to window.newPoolIds:', window.newPoolIds);
    console.log('Created Pool ID:', poolId);

    const poolInfo = await contract.methods.getPoolInfo(poolId).call();
    console.log(`New Pool ${poolId} Info:`, JSON.stringify(poolInfo, null, 2));

    document.getElementById('createStatus').textContent = 'Approve transaction success';
    console.log('Set createStatus to Transaction successful at:', new Date().toISOString());
    logInteraction(`Create Pool ID ${poolId} | Stake ${stakeToken} | Reward ${rewardToken} | APR ${apr}`);

    // Tangani getCreatorPoolIds dengan try-catch untuk mencegah error menghentikan eksekusi
    let creatorPoolIds = [];
    try {
      creatorPoolIds = await contract.methods.getCreatorPoolIds(account, 0, 10).call();
      console.log('Creator Pool IDs:', creatorPoolIds);
    } catch (error) {
      console.error('Failed to fetch creator pool IDs:', error);
      document.getElementById('createStatus').textContent = 'Pool created, but failed to fetch creator pool IDs';
    }

  } catch (error) {
    console.error('Error creating pool:', error);
    document.getElementById('createStatus').textContent = 'Failed to create pool';
    throw error;
  }
}

// Authorize upgrade
async function upgradeTo() {
  try {
    if (!isOwner) throw new Error('Only owner can authorize upgrade');
    const newImplementation = document.getElementById('newImplementationAddress').value;
    await contract.methods.upgradeTo(newImplementation).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
  } catch (error) {
    console.error('Error authorizing upgrade:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Pause contract
async function pauseContract() {
  try {
    await contract.methods.pause().send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    loadOwnerTools();
  } catch (error) {
    console.error('Error pausing contract:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Unpause contract
async function unpauseContract() {
  try {
    await contract.methods.unpause().send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    loadOwnerTools();
  } catch (error) {
    console.error('Error unpausing contract:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Set creation fee
async function setCreationFee() {
  try {
    if (!isOwner) throw new Error('Owner access required');
    const newFee = document.getElementById('newCreationFee').value;
    if (!newFee || newFee < 0) throw new Error('Invalid fee');
    await contract.methods.setCreationFee(web3.utils.toWei(newFee, 'ether')).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    userInteractions.push({ wallet: account, action: `Set creation fee to ${newFee}`, timestamp: Date.now() });
    loadOwnerTools();
  } catch (error) {
    console.error('Error setting creation fee:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Withdraw tokens
async function withdrawTokens() {
  try {
    if (!isOwner) throw new Error('Only owner can withdraw tokens');
    const tokenAddress = document.getElementById('withdrawToken').value;
    const amount = document.getElementById('withdrawAmount').value;
    if (!web3.utils.isAddress(tokenAddress) && tokenAddress !== '0x0000000000000000000000000000000000000000') throw new Error('Invalid token address');
    if (!amount || amount <= 0) throw new Error('Invalid amount');
    await contract.methods.withdraw(web3.utils.toWei(amount, 'ether'), tokenAddress).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Withdraw transaction success';
    userInteractions.push({ wallet: account, action: `Withdraw ${amount} of token ${tokenAddress}`, timestamp: Date.now() });
    loadOwnerTools();
  } catch (error) {
    console.error('Withdraw error:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Deactivate pool (Owner and Creator)
async function deactivatePool(department) {
  try {
    const poolId = department === 'owner' ? document.getElementById('poolIdDeactivate').value : document.getElementById('creatorManagePoolId').value;
    if (!poolId || isNaN(Number(poolId))) throw new Error('Invalid pool ID');
    if (department === 'creator' && !isCreator && !isOwner) throw new Error('Creator or owner access required');
    if (department === 'owner' && !isOwner) throw new Error('Owner access required');
    await contract.method.deactivatePool(poolId).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Transaction success';
    userInteractions.push({ wallet: account, action: `Deactivate Pool ${poolId}`, timestamp: Date.now() });
    if (department === 'owner') {
      loadOwnerTools();
    } else {
      loadCreatorTools();
    }
  } catch (error) {
    console.error('Error deactivating pool:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Activate pool (Owner and Creator)
async function activatePool(department) {
  try {
    const poolId = department === 'owner' ? document.getElementById('poolIdActivate').value : document.getElementById('creatorManagePoolId').value;
    if (!poolId || isNaN(Number(poolId))) throw new Error('Invalid pool ID');
    if (department === 'creator' && !isCreator && !isOwner) throw new Error('Creator or owner access required');
    if (department === 'owner' && !isOwner) throw new Error('Owner access required');
    await contract.method.activatePool(poolId).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Transaction success';
    userInteractions.push({ wallet: account, action: `Activate Pool ${poolId}`, timestamp: Date.now() });
    if (department === 'owner') {
      loadOwnerTools();
    } else {
      loadCreatorTools();
    }
  } catch (error) {
    console.error('Error activating pool:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Get all pool IDs
async function getAllPoolIds() {
  try {
    const poolIdsElement = document.getElementById('allPoolIds');
    poolIdsElement.textContent = '';

    if (!contract || !account) {
      poolIdsElement.textContent = 'Wallet not connected';
      return;
    }

    let poolIds = [];
    try {
      // 🧠 Panggil pakai 'from: account' agar roles terdeteksi
      poolIds = await contract.methods.getAllPoolIds(0, 100).call({ from: account });
      console.log('Pool IDs from getAllPoolIds():', poolIds);
    } catch (error) {
      console.warn('getAllPoolIds() failed, fallback ke manual:', error.message);

      const poolCount = Number(await contract.methods.poolCount().call());
      for (let i = 0; i < poolCount; i++) {
        try {
          const pool = await contract.methods.getPoolInfo(i).call();
          if (pool.active) poolIds.push(i);
        } catch (innerError) {
          console.error(`Gagal ambil info pool ${i}:`, innerError.message);
        }
      }
    }

    poolIdsElement.textContent = poolIds.length ? poolIds.join(', ') : 'No active pools';
  } catch (error) {
    console.error('Error fetching pool IDs:', error.message);
    document.getElementById('allPoolIds').textContent = 'Error fetching pool IDs';
  }
}

// Get creator pool IDs
async function getCreatorPoolIds() {
  try {
    if (!isOwner) throw new Error('Owner access required');
    const creatorAddress = document.getElementById('creatorAddress').value;
    if (!web3.utils.isAddress(creatorAddress)) throw new Error('Invalid creator address');
    const poolIds = await contract.method.getCreatorPoolIds(creatorAddress, 0, 100).call();
    document.getElementById('creatorPoolIds').textContent = poolIds.join(', ') || 'No pools found';
  } catch (error) {
    console.error('Error getting creator pool IDs:', error);
    document.getElementById('creatorPoolIds').textContent = 'Error fetching pool IDs';
  }
}

// Fund reward (Admin and Creator)
async function fundReward() {
  try {
    const poolId = document.getElementById('fundPoolId').value;
    const rewardToken = document.getElementById('rewardToken').value;
    const amount = document.getElementById('fundAmount').value;
    const fundStatus = document.getElementById('fundStatus');

    if (!poolId || isNaN(Number(poolId))) {
      fundStatus.textContent = 'Please select a valid pool';
      throw new Error('Invalid or no pool selected');
    }
    if (!web3.utils.isAddress(rewardToken)) {
      fundStatus.textContent = 'Invalid reward token address';
      throw new Error('Invalid reward token address');
    }
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      fundStatus.textContent = 'Please enter a valid amount';
      throw new Error('Invalid amount');
    }

    // Ambil pool info
    const pool = await contract.methods.getPoolInfo(poolId).call();
    if (!pool.active) {
      fundStatus.textContent = 'Pool is not active';
      throw new Error('Pool is not active');
    }

    // Validasi reward token
    const expectedRewardToken = pool.rewardTokens && pool.rewardTokens.length > 0 ? pool.rewardTokens[0] : '0x0000000000000000000000000000000000000000';
    if (rewardToken.toLowerCase() !== expectedRewardToken.toLowerCase()) {
      fundStatus.textContent = 'Reward token does not match pool configuration';
      throw new Error('Reward token does not match');
    }

    // Cek hak akses
    const isAdmin = await contract.methods.hasRole(await contract.methods.DEFAULT_ADMIN_ROLE().call(), account).call();
    const isPoolCreator = pool.creator.toLowerCase() === account.toLowerCase();
    if (!isAdmin && !isPoolCreator) {
      fundStatus.textContent = 'Access restricted to admin or pool creator';
      throw new Error('Access restricted');
    }

    const amountInWei = web3.utils.toWei(amount, 'ether');
    let txOptions = { from: account, gas: 200000, gasPrice: web3.utils.toWei('12', 'gwei') };

    // Handle native (CHIPS) atau ERC20
    if (rewardToken === '0x0000000000000000000000000000000000000000') {
      const balance = await web3.eth.getBalance(account);
      if (Number(balance) < Number(amountInWei)) {
        fundStatus.textContent = 'Insufficient CHIPS balance';
        throw new Error('Insufficient CHIPS balance');
      }
      txOptions.value = amountInWei;
    } else {
      const tokenContract = new web3.eth.Contract(IERC20_ABI, rewardToken);
      const balance = await tokenContract.methods.balanceOf(account).call();
      if (Number(balance) < Number(amountInWei)) {
        fundStatus.textContent = 'Insufficient token balance';
        throw new Error('Insufficient token balance');
      }
      const allowance = await tokenContract.methods.allowance(account, contract.options.address).call();
      if (Number(allowance) < Number(amountInWei)) {
        fundStatus.textContent = 'Approving...';
        await tokenContract.methods
          .approve(contract.options.address, amountInWei)
          .send({ from: account, gas: 100000, gasPrice: web3.utils.toWei('12', 'gwei') });
        fundStatus.textContent = 'Token approved';
      }
    }

    // Set waktu distribusi
    const startTime = Math.floor(Date.now() / 1000) + 60;
    const endTime = startTime + 7 * 24 * 60 * 60;
    console.log(`Funding pool ${poolId} with ${amount} ${rewardToken} from ${startTime} to ${endTime}`);

    // Fund reward
    fundStatus.textContent = 'Funding reward...';
    const tx = await contract.methods
      .fundReward(poolId, rewardToken, amountInWei, startTime, endTime)
      .send(txOptions);

    // Delay lebih panjang
    await new Promise(resolve => setTimeout(resolve, 3000));

    fundStatus.textContent = 'Transaction success';
    userInteractions.push({
      wallet: account,
      action: `Fund ${amount} ${rewardToken === '0x0000000000000000000000000000000000000000' ? 'CHIPS' : rewardToken} to Pool ${poolId}`,
      timestamp: Date.now()
    });

    // Update UI
    await updateRewardTokenField('fund', isAdmin);
    await updatePoolDetail(poolId);
    console.log(`Fund transaction hash: ${tx.transactionHash}`);

    // Retry trigger loadPool
    let retries = 3;
    while (retries > 0) {
      if (typeof loadPool === 'function') {
        await loadPool([poolId]);
        console.log(`Triggered loadPool for pool ${poolId}`);
        break;
      }
      console.warn(`loadPool not found, retrying... (${retries} left)`);
      retries--;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    if (retries === 0) {
      console.error(`loadPool not found after retries, UI pool detail may not update`);
    }
  } catch (error) {
    console.error('Error funding reward:', error);
    document.getElementById('fundStatus').textContent = 'success';
  }
}

// Update APR (Owner and Creator)
async function updateApr(department) {
  try {
    const poolId = department === 'owner' ? document.getElementById('aprPoolId').value : document.getElementById('creatorUpdatePoolId').value;
    const newApr = department === 'owner' ? document.getElementById('newApr').value : document.getElementById('creatorNewApr').value;
    if (!poolId || isNaN(Number(poolId))) throw new Error('Invalid pool ID');
    if (isNaN(newApr) || newApr < 360 || newApr > 10000) throw new Error('APR must be between 360 and 10000');
    if (department === 'creator' && !isCreator && !isOwner) throw new Error('Creator or owner access required');
    if (department === 'owner' && !isOwner) throw new Error('Owner access required');
    
    await contract.methods.updateApr(poolId, newApr * 1).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    userInteractions.push({ wallet: account, action: `Update APR to ${newApr}% for Pool ${poolId}`, timestamp: Date.now() });
    if (department === 'owner') {
      loadOwnerTools();
    } else {
      loadCreatorTools();
    }
  } catch (error) {
    console.error('Error updating APR:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Update pool parameters (Owner and Creator)
async function updatePoolParameters() {
  try {
    const poolId = document.getElementById('paramPoolId').value || document.getElementById('creatorParamPoolId').value;
    const newLockPeriod = document.getElementById('newLockPeriod').value || document.getElementById('creatorNewLockPeriod').value;
    const newMaxReward = document.getElementById('newMaxReward').value || document.getElementById('creatorNewMaxReward').value;
    if (!poolId || isNaN(Number(poolId))) throw new Error('Invalid pool ID');
    if (isNaN(parseInt(newLockPeriod)) || newLockPeriod < 0 || newLockPeriod > 365) throw new Error('Lock period must be between 0 and 365 days');
    if (isNaN(parseFloat(newMaxReward)) || newMaxReward <= 0) throw new Error('Max reward must be greater than 0');
    
    await contract.methods.updatePoolParameters(
      poolId,
      newLockPeriod * 24 * 60 * 60,
      web3.utils.toWei(newMaxReward, 'ether')
    ).send({ from: account });
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    userInteractions.push({ wallet: account, action: `Update parameters for Pool ${poolId}`, timestamp: Date.now() });
  } catch (error) {
    console.error('Error updating pool parameters:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Withdraw from pool (Owner and Creator)
async function withdrawFromPool(department) {
  try {
    const poolIdElement = department === 'owner' ? document.getElementById('withdrawPoolId') : document.getElementById('creatorWithdrawPoolId');
    const amountElement = department === 'owner' ? document.getElementById('withdrawPoolAmount') : document.getElementById('creatorWithdrawAmount');
    const tokenElement = department === 'owner' ? document.getElementById('withdrawToken') : document.getElementById('creatorWithdrawToken');
    
    if (!poolIdElement || !amountElement || !tokenElement) {
      console.warn(`Missing DOM elements for ${department}: poolId=${!!poolIdElement}, amount=${!!amountElement}, token=${!!tokenElement}`);
      document.getElementById('walletStatus').textContent = 'Transaction failed';
      return;
    }
    
    const poolId = poolIdElement.value;
    const amount = amountElement.value;
    const token = tokenElement.value || '';
    
    console.log(`Withdraw attempt: poolId=${poolId}, amount=${amount}, token=${token}, department=${department}`);
    
    if (!poolId || isNaN(Number(poolId))) {
      document.getElementById('walletStatus').textContent = 'Transaction failed';
      throw new Error('Invalid pool ID');
    }
    if (!token || (!web3.utils.isAddress(token))) {
      document.getElementById('walletStatus').textContent = 'Transaction failed';
      throw new Error('Invalid token address');
    }
    if (!amount || amount <= 0) {
      document.getElementById('walletStatus').textContent = 'Transaction failed';
      throw new Error('Invalid amount');
    }
    if (department === 'creator' && !isCreator && !isOwner) {
      document.getElementById('walletStatus').textContent = 'Transaction failed';
      throw new Error('Creator or owner access required');
    }
    if (department === 'owner' && !isOwner) {
      document.getElementById('walletStatus').textContent = 'Transaction failed';
      throw new Error('Owner access required');
    }
    
    const amountInWei = web3.utils.toWei(amount, 'ether');

    if (department === 'owner') {
      // Cek apakah akun memiliki DEFAULT_ADMIN_ROLE
      const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000';
      const hasAdminRole = await contract.methods.hasRole(DEFAULT_ADMIN_ROLE, account).call();
      console.log(`Account ${account} has DEFAULT_ADMIN_ROLE: ${hasAdminRole}`);
      if (!hasAdminRole) {
        document.getElementById('walletStatus').textContent = 'Transaction failed';
        throw new Error('Only admin can withdraw');
      }

      // Panggil fungsi withdraw untuk owner/admin
      console.log(`Contract call: withdraw(${token}, ${amountInWei})`);
      await contract.methods.withdraw(token, amountInWei).send({ from: account });
    } else {
      // Verifikasi syarat untuk creator
      const poolCount = Number(await contract.methods.poolCount().call());
      if (poolId >= poolCount) {
        document.getElementById('walletStatus').textContent = 'Transaction failed';
        throw new Error(`Invalid pool ID: ${poolId} >= poolCount (${poolCount})`);
      }

      const pool = await contract.methods.getPoolInfo(poolId).call();
      console.log(`Pool ${poolId} info:`, pool);
      if (pool.creator.toLowerCase() !== account.toLowerCase()) {
        document.getElementById('walletStatus').textContent = 'Transaction failed';
        throw new Error(`Only creator can withdraw: account=${account}, creator=${pool.creator}`);
      }

      if (!pool.rewardTokens.includes(token)) {
        document.getElementById('walletStatus').textContent = 'Transaction failed';
        throw new Error(`Reward token ${token} not in pool.rewardTokens:`, pool.rewardTokens);
      }

      const balanceInWei = await getTotalRewardFromEvents(poolId, token);
      const remainingReward = parseInt(web3.utils.fromWei(balanceInWei, 'ether'));
      console.log(`Remaining reward for pool ${poolId}, token ${token}:`, remainingReward);
      if (amount > remainingReward) {
        document.getElementById('walletStatus').textContent = 'Transaction failed';
        throw new Error(`Insufficient available reward: requested=${amount}, available=${remainingReward}`);
      }

      // Panggil withdrawFromPool untuk creator
      console.log(`Contract call: withdrawFromPool(${poolId}, ${amountInWei}, ${token})`);
      await contract.methods.withdrawFromPool(poolId, amountInWei, token).send({ from: account });
    }
    
    document.getElementById('walletStatus').textContent = 'Approve transaction success';
    userInteractions.push({ wallet: account, action: `Withdraw ${amount} from Pool ${poolId}`, timestamp: Date.now() });

    // Tambahkan delay untuk memastikan blockchain update
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Perbarui UI setelah withdraw berhasil
    const typeId = department === 'owner' ? 'fund' : 'withdraw';
    await updateRewardTokenField(typeId, department === 'owner');

    // Trigger ulang createPoolCard untuk refresh UI pool card
    try {
      const pool = await contract.methods.getPoolInfo(poolId).call();
      const poolCardContainer = document.getElementById(`poolCard${poolId}`) || document.createElement('div');
      const newCard = await createPoolCard(poolId, pool, false, department === 'owner' ? 'owner' : 'creator');
      poolCardContainer.replaceWith(newCard);
      console.log(`Refreshed pool card for pool ${poolId}`);
    } catch (error) {
      console.error(`Failed to refresh pool card for pool ${poolId}:`, error);
    }

  } catch (error) {
    console.error('Error withdrawing:', error);
    document.getElementById('walletStatus').textContent = 'Transaction failed';
  }
}

// Get pool info
async function getPoolInfo(poolId) {
  try {
    const pool = await contract.method.getPoolInfo(poolId).call();
    console.log(`Pool ${poolId} info:`, pool);
    return pool;
  } catch (error) {
    console.error(`Error fetching pool ${poolId} info:`, error);
    return null;
  }
}

// Get stake info
async function getStakeInfo(poolId, userAddress) {
  try {
    const stakeInfo = await contract.method.getStakeInfo(poolId, userAddress).call();
    console.log(`Stake info for pool ${poolId}, user ${userAddress}:`, stakeInfo);
    return stakeInfo;
  } catch (error) {
    console.error(`Error fetching stake info for pool ${poolId}:`, error);
    return null;
  }
}

// Get contract balances
async function getContractBalances() {
  try {
    const balances = {};
    const tokens = [CHIPS_ADDRESS, USDT_ADDRESS];
    for (let token of tokens) {
      if (token === '0x0000000000000000000000000000000000000000') {
        balances['CHIPS'] = web3.utils.fromWei(await web3.eth.getBalance(contract.options.address), 'ether');
      } else {
        const tokenContract = new web3.eth.Contract(IERC20_ABI, token);
        balances[await getTokenName(token)] = web3.utils.fromWei(
          await tokenContract.method.balanceOf(contract.options.address).call(),
          'ether'
        );
      }
    }
    console.log('Contract balances:', balances);
    return balances;
  } catch (error) {
    console.error('Error fetching contract balances:', error);
    return null;
  }
}

// Fungsi untuk download interaksi user sebagai PDF dari Firestore
async function downloadUserInteractions() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ambil data interaksi dari Firestore
    const db = firebase.firestore();
    const snapshot = await db.collection('userInteractions').get();
    const firestoreData = snapshot.docs.map(doc => doc.data());

    if (firestoreData.length === 0) {
      alert('Belum ada interaksi tersimpan');
      return;
    }

    // Hitung total interaksi per wallet
    const interactionSummary = {};
    firestoreData.forEach(interaction => {
      if (!interactionSummary[interaction.wallet]) {
        interactionSummary[interaction.wallet] = 0;
      }
      interactionSummary[interaction.wallet]++;
    });

    // Buat data untuk tabel
    const tableData = Object.entries(interactionSummary).map(([wallet, count]) => [wallet, count]);

    // Definisikan header
    const headers = ['Wallet', 'Total Interaksi'];

    // Konfigurasi AutoTable
    doc.autoTable({
      head: [headers],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
      columnStyles: {
        0: { cellWidth: 120 }, // Wallet
        1: { cellWidth: 60 }   // Jumlah
      },
      margin: { top: 20 },
      didDrawPage: (data) => {
        doc.setFontSize(14);
        doc.text('User Interactions Report', data.settings.margin.left, 15);
      }
    });

    // Simpan PDF
    doc.save(`user_interactions_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Gagal membuat PDF: ' + error.message);
  }
}


// Fungsi opsional untuk reset interaksi
function clearInteractions() {
  userInteractions = [];
  localStorage.removeItem('userInteractions');
  alert('Interaksi user telah direset!');
}

// Pin pool
async function pinPool() {
  try {
    const pinPoolId = document.getElementById('pinPoolId').value;
    const pinStatus = document.getElementById('pinStatus');
    if (!pinPoolId || isNaN(Number(pinPoolId))) {
      pinStatus.textContent = 'Please select a valid pool';
      console.log('Invalid pool ID for pinning:', pinPoolId);
      return;
    }
    if (!isOwner) {
      pinStatus.textContent = 'Owner access required';
      console.log('Non-owner attempted to pin pool');
      return;
    }

    // Ambil pinned pool IDs dari Firestore
    const db = firebase.firestore();
    const pinnedPoolDocRef = db.collection('pinnedPools').doc(ADMIN_WALLET);
    const pinnedPoolDoc = await pinnedPoolDocRef.get();
    let pinnedPoolIds = pinnedPoolDoc.exists ? pinnedPoolDoc.data().poolIds || [] : [];

    if (pinnedPoolIds.includes(Number(pinPoolId))) {
      pinStatus.textContent = 'Pool already pinned';
      console.log(`Pool ${pinPoolId} already pinned`);
      return;
    }

    // Tambah pool ID ke pinned list
    pinnedPoolIds.push(Number(pinPoolId));
    await pinnedPoolDocRef.set({ poolIds: pinnedPoolIds }, { merge: true });
    pinStatus.textContent = `Pool ${pinPoolId} pinned successfully`;
    console.log(`Pinned pool ${pinPoolId}`);

    // Log interaksi
    userInteractions.push({
      wallet: account,
      action: `Pin Pool: ${pinPoolId}`,
      timestamp: Date.now()
    });

    // Refresh Default Pool
    await loadDefaultPool();
  } catch (error) {
    console.error('Error pinning pool:', error);
    document.getElementById('pinStatus').textContent = `Error: ${error.message}`;
  }
}

// Unpin pool
async function unpinPool() {
  try {
    const pinPoolId = document.getElementById('pinPoolId').value;
    const pinStatus = document.getElementById('pinStatus');
    if (!pinPoolId || isNaN(Number(pinPoolId))) {
      pinStatus.textContent = 'Please select a valid pool';
      console.log('Invalid pool ID for unpinning:', pinPoolId);
      return;
    }
    if (!isOwner) {
      pinStatus.textContent = 'Owner access required';
      console.log('Non-owner attempted to unpin pool');
      return;
    }

    // Ambil pinned pool IDs dari Firestore
    const db = firebase.firestore();
    const pinnedPoolDocRef = db.collection('pinnedPools').doc(ADMIN_WALLET);
    const pinnedPoolDoc = await pinnedPoolDocRef.get();
    let pinnedPoolIds = pinnedPoolDoc.exists ? pinnedPoolDoc.data().poolIds || [] : [];

    if (!pinnedPoolIds.includes(Number(pinPoolId))) {
      pinStatus.textContent = 'Pool not pinned';
      console.log(`Pool ${pinPoolId} not pinned`);
      return;
    }

    // Hapus pool ID dari pinned list
    pinnedPoolIds = pinnedPoolIds.filter(id => id !== Number(pinPoolId));
    await pinnedPoolDocRef.set({ poolIds: pinnedPoolIds }, { merge: true });
    pinStatus.textContent = `Pool ${pinPoolId} unpinned successfully`;
    console.log(`Unpinned pool ${pinPoolId}`);

    // Log interaksi
    userInteractions.push({
      wallet: account,
      action: `Unpin Pool: ${pinPoolId}`,
      timestamp: Date.now()
    });

    // Refresh Default Pool
    await loadDefaultPool();
  } catch (error) {
    console.error('Error unpinning pool:', error);
    document.getElementById('pinStatus').textContent = `Error: ${error.message}`;
  }
}
