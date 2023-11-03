import style from '../styles/ClaimCard.module.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const PrlxClaim = () => {
  const [web3, setWeb3] = useState(null);
  const [mintedTokens, setMintedTokens] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error('User denied access to the wallet or other error:', error);
        }
      } else {
        console.error('Web3 is not initialized. Make sure you have a compatible wallet and network connected.');
      }
    }

    initWeb3();
    updateTotalSupply(); // Fetch the initial total supply and update it when the component mounts
  }, []);

  const updateTotalSupply = async () => {
    if (web3) {
      const contractAddress = '0x8911ADF00521e1886162a9BA87699fb0D32312A0';
      const contractABI = [
        // ... (Your contract ABI)
        {
          "inputs": [],
          "name": "totalSupply",
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
      ]; // Your contract ABI

      const claimContract = new web3.eth.Contract(contractABI, contractAddress);
      const totalSupply = await claimContract.methods.totalSupply().call();
      setTotalSupply(totalSupply);
    }
  };

  const claimTokens = async () => {
    if (web3) {
      try {
        const contractAddress = '0x8911ADF00521e1886162a9BA87699fb0D32312A0';
        const contractABI = [
          // ... (Your contract ABI)
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_mintAmount",
                "type": "uint256"
              }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
        ]; // Your contract ABI

        const claimContract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();

        // Send a transaction to mint tokens
        await claimContract.methods.mint(1).send({
          from: accounts[0],
        });

        // Update the mintedTokens count
        setMintedTokens(mintedTokens + 1);

        console.log('Token minted successfully');
      } catch (error) {
        console.error('Error minting the token', error);
      }
    }
  };

  // Calculate the remaining supply
  const remainingSupply = totalSupply - mintedTokens;

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Peet DeFi - Parallex Migration
      </div>
      <div className={style.title}></div>
      <div className={style.paragragh}>
        Peet Defi Snapshot Taken Claim your PRLX Tokens below
      </div>
      <div className={style.paragragh}></div>
      <div className={style.btn} onClick={claimTokens}>
        Claim your PRLX
      </div>

      <div className={style.Spacing20}></div>
      <div className={style.paragragh}>
        PRLX Total Supply: {totalSupply}
      </div>
      <div className={style.paragragh}>
        Total PRLX Claimed: {mintedTokens}
      </div>
      <div className={style.paragragh}>
        Remaining PRLX Supply: {remainingSupply}
      </div>
    </div>
  );
};

export default PrlxClaim;
