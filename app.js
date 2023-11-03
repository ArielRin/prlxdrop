window.addEventListener('load', async () => {
    // Check if Web3 is available
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        console.log('Web3 is available');
    } else {
        console.log('Web3 is not available. Please install MetaMask or use a Web3-enabled browser.');
    }

    // Connect to your contract
    const contractAddress = '0x116677F72fce9261f3084C4eE1Fae9F7A02dE681';
    const contractABI = [
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_merkleRoot",
            "type": "bytes32"
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
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "bytes32[]",
            "name": "merkleProof",
            "type": "bytes32[]"
          }
        ],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "claimed",
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
        "name": "merkleRoot",
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
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "retrieve",
        "outputs": [],
        "stateMutability": "nonpayable",
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
    ];
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Handle Claim button click
    const claimButton = document.getElementById('claimButton');
    claimButton.addEventListener('click', async () => {
        const receiverAddress = document.getElementById('addressInput').value;
        const claimAmount = document.getElementById('amountInput').value;

        // Generate Merkle proof (You need to implement this part)
        const merkleProof = generateMerkleProof(receiverAddress, claimAmount);

        if (merkleProof) {
            try {
                // Call the claim function in your smart contract
                const accounts = await web3.eth.getAccounts();
                const gas = await contract.methods.claim(claimAmount, receiverAddress, merkleProof).estimateGas();
                const result = await contract.methods.claim(claimAmount, receiverAddress, merkleProof).send({ from: accounts[0], gas });

                if (result.status) {
                    document.getElementById('message').innerHTML = 'Claim successful!';
                } else {
                    document.getElementById('message').innerHTML = 'Claim failed.';
                }
            } catch (error) {
                document.getElementById('message').innerHTML = 'Error: ' + error.message;
            }
        } else {
            document.getElementById('message').innerHTML = 'Invalid Merkle proof.';
        }
    });
});

function generateMerkleProof(receiverAddress, claimAmount) {
    // Implement the logic to generate the Merkle proof here
    // Return the generated Merkle proof
}
