document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const dataForm = document.getElementById('dataForm');
    const status = document.getElementById('status');

    let web3;
    let account;

    // Connect to MetaMask
    connectButton.addEventListener('click', async () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                account = (await web3.eth.getAccounts())[0];
                status.innerText = `Connected: ${account}`;
            } catch (error) {
                status.innerText = 'User denied account access';
            }
        } else {
            status.innerText = 'MetaMask not detected';
        }
    });

    // Handle form submission
    dataForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = document.getElementById('dataInput').value;
        
        if (!account) {
            status.innerText = 'Please connect to MetaMask first';
            return;
        }

        // Interact with the smart contract
        const contractAddress = '0x047b37Ef4d76C2366F795Fb557e3c15E0607b7d8';
        const contractABI = [ [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "authorizeUser",
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
		"name": "revokeUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "recordHash",
				"type": "string"
			}
		],
		"name": "uploadRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
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
				"internalType": "string",
				"name": "recordHash",
				"type": "string"
			}
		],
		"name": "getRecord",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
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
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "isAuthorized",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
            // Replace with your contract's ABI
        ];

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        try {
            await contract.methods.storeData(data).send({ from: account });
            status.innerText = 'Data stored successfully';
        } catch (error) {
            status.innerText = 'Error storing data';
        }
    });
});
