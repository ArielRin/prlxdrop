// pages/staking.js
import style from '../styles/ClaimCard.module.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const StakingPage = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakingPackage, setStakingPackage] = useState(1);
  const [totalStakes, setTotalStakes] = useState(0);
  const [totalRewardDistributed, setTotalRewardDistributed] = useState(0);

  const contractAddress = '0x717b7C2E8aF55a48127eF6Da12d36a69b3801020';
  const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_tokenAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "RewardSent",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "_totalStakes",
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
      "name": "availableTokens",
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
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceuser",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "b",
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
          "name": "_stake",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_stakingPackage",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "canStake",
      "outputs": [
        {
          "internalType": "bool",
          "name": "b",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_stake",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_stakingPackage",
          "type": "uint256"
        }
      ],
      "name": "createStake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "distributeReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getState",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
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
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isStakeholder",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
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
      "name": "owner",
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
      "inputs": [],
      "name": "removeAllMyStakes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_stake",
          "type": "uint256"
        }
      ],
      "name": "removeSomeStake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardDistributionIndex",
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
          "name": "_stakeholder",
          "type": "address"
        }
      ],
      "name": "rewardOf",
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
          "name": "_tokenAddress",
          "type": "address"
        }
      ],
      "name": "setAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_percentage",
          "type": "uint256"
        }
      ],
      "name": "setApyPercentage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_stakeholder",
          "type": "address"
        }
      ],
      "name": "stakeOf",
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
      "name": "tokenAddress",
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
      "inputs": [],
      "name": "totalRewardDistributed",
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
      "name": "totalStakes",
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
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] // Your ABI array
; // Your ABI array

  useEffect(() => {
    const initialize = async () => {
      try {
        // Connect to the Ethereum provider (e.g., MetaMask)
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);

        // Connect to your contract
        const stakingContract = new ethers.Contract(contractAddress, abi, ethProvider.getSigner());
        setContract(stakingContract);

        // Get the current account
        const accounts = await ethProvider.listAccounts();
        setAccount(accounts[0]);

        // Get and set initial values for totalStakes and totalRewardDistributed
        const totalStakesValue = await stakingContract.totalStakes();
        const totalRewardDistributedValue = await stakingContract.totalRewardDistributed();
        setTotalStakes(totalStakesValue);
        setTotalRewardDistributed(totalRewardDistributedValue);
      } catch (error) {
        console.error('Error initializing:', error);
      }
    };

    if (window.ethereum) {
      initialize();
    } else {
      console.error('Please install MetaMask');
    }
  }, []);

  const handleCreateStake = async () => {
    try {
      // Call the createStake function on the contract
      const tx = await contract.createStake(stakeAmount, stakingPackage);
      await tx.wait();
      console.log('Stake created successfully');
    } catch (error) {
      console.error('Error creating stake:', error);
    }
  };

  const handleRemoveAllStakes = async () => {
    try {
      // Call the removeAllMyStakes function on the contract
      const tx = await contract.removeAllMyStakes();
      await tx.wait();
      console.log('All stakes removed successfully');
    } catch (error) {
      console.error('Error removing stakes:', error);
    }
  };

  const handleClaimRewards = async () => {
    try {
      // Call the claimReward function on the contract
      const tx = await contract.claimReward();
      await tx.wait();
      console.log('Rewards claimed successfully');
    } catch (error) {
      console.error('Error claiming rewards:', error);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Staking Page
      </div>
      <div className={style.paragragh}>
        Connected Account: {account}
      </div>

        <Tabs>
          <TabList>
            <Tab style={{ background: '#6a5acd', color: 'white' }}>Create Stake</Tab>
            <Tab style={{ background: '#483d8b', color: 'white' }}>Manage Stakes</Tab>
          </TabList>

          <TabPanel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>
              Stake Amount:
              <input type="number" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} />
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>
              Staking Package:
              <input type="number" value={stakingPackage} onChange={(e) => setStakingPackage(e.target.value)} />
            </label>
          </div>

            <button onClick={handleCreateStake}>Create Stake</button>
          </TabPanel>

          <TabPanel>
            <button onClick={handleRemoveAllStakes}>Remove All Stakes</button>
            <button onClick={handleClaimRewards}>Claim Rewards</button>

            <div>
              <h2>Staking Information</h2>
              <p>Total Stakes: {totalStakes}</p>
              <p>Total Rewards Distributed: {totalRewardDistributed}</p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  };

  export default StakingPage;
