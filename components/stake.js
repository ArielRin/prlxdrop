import style from '../styles/ClaimCard.module.css';


  import React, { useState, useEffect } from 'react';
  import Web3 from 'web3';
  import HerosStakingContract from '../path/to/your/compiled/HerosStaking.json'; // Replace with the actual path

  const App = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [stakeAmount, setStakeAmount] = useState(0);
    const [stakingPackage, setStakingPackage] = useState(0);

    useEffect(() => {
      const initWeb3 = async () => {
        if (window.ethereum) {
          try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            const accounts = await web3Instance.eth.getAccounts();
            setAccounts(accounts);

            // Initialize contract
            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = HerosStakingContract.networks[networkId];
            const contractInstance = new web3Instance.eth.Contract(
              HerosStakingContract.abi,
              deployedNetwork && deployedNetwork.address,
            );
            setContract(contractInstance);
          } catch (error) {
            console.error('Error connecting to Ethereum provider', error);
          }
        } else {
          console.error('Please install MetaMask or another Ethereum provider extension.');
        }
      };

      initWeb3();
    }, []);

    const handleStake = async () => {
      try {
        // Call the createStake function on the smart contract
        await contract.methods.createStake(web3.utils.toWei(stakeAmount.toString()), stakingPackage).send({ from: accounts[0] });
        // Add additional logic as needed (e.g., update UI, fetch new data)
      } catch (error) {
        console.error('Error staking:', error);
      }
    };

    return (
      <div>
        <h1>Next.js DApp</h1>
        {web3 && accounts.length > 0 && contract && (
          <div>
            <p>Connected to Ethereum</p>
            <p>Account: {accounts[0]}</p>
            <label>
              Stake Amount:
              <input type="number" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} />
            </label>
            <label>
              Staking Package:
              <input type="number" value={stakingPackage} onChange={(e) => setStakingPackage(e.target.value)} />
            </label>
            <button onClick={handleStake}>Stake</button>
          </div>
        )}
      </div>
    );
  };

  export default App;
