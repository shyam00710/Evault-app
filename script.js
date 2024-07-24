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
        const contractAddress = 'YOUR_CONTRACT_ADDRESS';
        const contractABI = [
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
