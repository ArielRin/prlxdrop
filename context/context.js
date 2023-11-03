import { createContext, useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import createClaimContract from '../utils/Claim';

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState('');
  const [claimContract, setClaimContract] = useState();
  const [etherscanUrl, setEtherscanUrl] = useState();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
  }, );

  const claimPrlx = async () => {
    try {
      console.log('entering lottery');
      await claimContract.methods.enter().send({
        from: address,
        // 500 PWR in Wei
        value: '1010000000000000000',
        // 0.0003 ETH in Gwei
        gas: 600000,
        gasPrice: null,
      });
      updateLottery();
    } catch (err) {
      console.log(err, 'enter');
    }
  };

  const connectWallet = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        setLotteryContract(claimContract(web3));
        setIsOwner(accounts[0] === ownerAddress);
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts();
          setAddress(accounts[0]);
          setIsOwner(accounts[0] === ownerAddress);
        });
      } catch (err) {
        console.log(err, 'connect Wallet');
      }
    } else {
      console.log('Please install MetaMask');
    }
  };

  return (
    <appContext.Provider
      value={{
        address,
        connectWallet,
        claimPrlx,
        etherscanUrl,
        isOwner,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
