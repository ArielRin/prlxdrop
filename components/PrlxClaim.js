import style from '../styles/ClaimCard.module.css';
import truncateEthAddress from 'truncate-eth-address';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const PrlxClaim = () => {
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission
        setWeb3(web3Instance);
      }
    }
    initWeb3();
  }, []);

  // Function to handle the "Enter" button click
  const handleMakeClaim = async () => {
    if (web3) {
      const contractAddress = '0xd7EA92A63371cC9324E9Fde3F69c7aDfBd77BAEc'; // Replace with your contract address
      const contractABI = [];

      const claimContract = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();

      try {
        await claimContract.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('100', 'ether'), // Sending 100 PWR, adjust as needed
        });
        console.log('Tokens Claimed successfully');
      } catch (error) {
        console.error('Error entering the lottery', error);
      }
    } else {
      console.error('Web3 is not initialized. Make sure you have a compatible wallet and network connected.');
    }
  };


    useEffect(() => {// Fetch current lottery ID when the component mounts
    }, [web3]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Peet DeFi - Parallex Migration
      </div>
        <div className={style.title}>
          PRLX Migration{' '}
        </div>
      <div className={style.paragragh}>
       Peet Defi Snapshot Taken Claim your PRLX Tokens below
      </div>
      <div className={style.paragragh}>
      </div>
      <div className={style.btn} onClick={handleMakeClaim}>
        Claim PRLX
      </div>
    </div>

  );
};

export default PrlxClaim;
