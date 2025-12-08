"use strict";
let monthlyRent;
let deposit;
let depositReleased = false;

  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    
    const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rentAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_depositAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "by",
				"type": "address"
			}
		],
		"name": "ContractCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isDamaged",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "reporter",
				"type": "address"
			}
		],
		"name": "DamageReported",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DepositReleased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			}
		],
		"name": "InspectorConfirmed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			}
		],
		"name": "InspectorSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "month",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RentPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum MyContract.ContractState",
				"name": "newState",
				"type": "uint8"
			}
		],
		"name": "StateChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TenantConfirmed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			}
		],
		"name": "TenantSet",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "cancel",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "confirmInspector",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "confirmTenant",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "damageStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
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
		"name": "getDeposit",
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
		"name": "getDuration",
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
		"name": "getInspector",
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
		"name": "getLandlord",
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
		"name": "getMonth",
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
		"name": "getMonthlyRent",
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
		"name": "getPendingInspector",
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
		"name": "getPendingTenant",
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
		"name": "getTenant",
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
		"name": "releaseDeposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "inspector",
				"type": "address"
			}
		],
		"name": "setInspector",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			}
		],
		"name": "setTenant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"internalType": "enum MyContract.ContractState",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tenantPays",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];
    let provider, signer, contract, userAddress;
    const STATE_NAMES = ['Created', 'InspectorSet', 'Active', 'Ended'];
    
    // ========== CONNECT WALLET ==========
    async function connectWallet() {

		console.log("Trying connect?")
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask!');
                return;
            }
            
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            
            const walletElement = document.querySelector('#wallet-address');
            if (walletElement) {
                walletElement.innerText = `${userAddress.substring(0, 6)}...${userAddress.substring(38)}`;
            }
            
            console.log("Connected:", userAddress);
            await loadContractData();
            
        } catch (error) {
            console.error("Connection error:", error);
            alert("Failed to connect: " + error.message);
        }
    }


    
    // ========== READ CONTRACT DATA ==========
    async function loadContractData() {
        if (!contract) {
            alert('Please connect wallet first!');
            return;
        }
        
        try {
            const state = await contract.state();
            const month = await contract.getMonth();

            const landlord = await contract.getLandlord();
            const tenant = await contract.getTenant();
            const inspector = await contract.getInspector();
            const pendingInspector = await contract.getPendingInspector();
            const pendingTenant = await contract.getPendingTenant();

			
			// This returns a string, like "2"
            monthlyRent      =  ethers.utils.formatEther(await contract.getMonthlyRent());
			deposit          =  ethers.utils.formatEther(await contract.getDeposit());

			console.log(monthlyRent);
			console.log(deposit)

            const contractBalance  =  ethers.utils.formatEther(await contract.getContractBalance());
			const duration = await contract.getDuration();
			



            console.log('Contract State:', STATE_NAMES[state]);
            console.log('Current Month:', month.toString());
            console.log('Landlord:', landlord);
            console.log('Tenant:', tenant);
            console.log('Inspector:', inspector);

            console.log('PendingTenant:', pendingTenant);
            console.log('PendingInspector:', pendingInspector);
            
            
            // --------------------------------------------
            // Update UI elements if they exist
            // Cards above:

			// Contract details
			updateUI('contractLandlord', `Landlord address: ${landlord}`);
			updateUI('contractDeposit', `Deposit: ${deposit} ETH`);
			updateUI('contractDuration', `Duration: ${duration}`);


            updateUI('contractBalance', `${contractBalance} ETH`);
            updateUI('currentMonth',`${month.toString()}/${duration}`);
            updateUI('monthlyRent', `${monthlyRent} ETH`);
            updateUI('state', STATE_NAMES[state]);

			// Deposit part
			if(Number(month.toString() === Number(duration)) || depositReleased === true){
				document.getElementById('releaseDeposit').disabled = true;
			} else {
				document.getElementById('releaseDeposit').disabled = false;
			}



            // --- When inspector confirms
			if (inspector !== ethers.constants.AddressZero) {
				updateUI('expectedInspectorAddress', `Address: ${inspector}`); 
				updateUI('headerInspector', 'Inspector actions (confirmed)');
				document.getElementById('confirmInspector').disabled = true;
				document.getElementById('confirmTenant').disabled = false;
				document.getElementById('reportDamage').disabled = false;
				document.getElementById('setInspectorAddress').disabled = true;
			} else if (pendingInspector !== ethers.constants.AddressZero) {
				updateUI('expectedInspectorAddress', `Address: ${pendingInspector}`);
				updateUI('headerInspector', 'Inspector actions (pending confirmation)');
				document.getElementById('confirmInspector').disabled = false;
			} else {
				updateUI('expectedInspectorAddress', 'Address: (Not set)');
				updateUI('headerInspector', 'Inspector actions');
				document.getElementById('confirmInspector').disabled = true;
			}

            // --- When tenant confirms
			if (tenant !== ethers.constants.AddressZero) {
				// Tenant is confirmed
				updateUI('expectedTenantAddress', `Address: ${tenant}`);
				updateUI('headerTenant', 'Tenant actions (confirmed)');
				document.getElementById('confirmTenant').disabled = true;
				document.getElementById('payRent').disabled = false;

				document.getElementById('setTenantAddress').disabled = true;
			} else if (pendingTenant !== ethers.constants.AddressZero) {
				// Tenant is pending
				updateUI('expectedTenantAddress',`Address: ${pendingTenant}`);
				updateUI('headerTenant', 'Tenant actions (pending confirmation)');
				document.getElementById('confirmTenant').disabled = false;
				// document.getElementById('setTenantAddress').disabled = true;
			} else {
				// No tenant set yet
				updateUI('expectedTenantAddress', 'Address (Not set)');
				updateUI('headerTenant', 'Tenant actions');
				document.getElementById('confirmTenant').disabled = true;
				document.getElementById('payRent').disabled = true;

}
            // ---------------------------------------------
			if(STATE_NAMES[state] === 'Active'){
				document.getElementById('cancel').disabled = false;
			}
            else if(STATE_NAMES[state] === 'Ended'){
                document.getElementById('payRent').disabled = true;
				document.getElementById('reportDamage').disabled = true;
				document.getElementById('cancel').disabled = true;
				document.getElementById('releaseDeposit').disabled = true;

				const stylesheet = document.styleSheets[0];
				stylesheet.insertRule(".card { filter: grayscale(100%); opacity: 0.6; }", 0);
            } 
			else {
				document.getElementById('cancel').disabled = true;
			}
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }
    
    // ========== LANDLORD FUNCTIONS ==========
    async function setInspector() {
        const address = document.getElementById('inspectorAddress').value;
        
        console.log(`This as an entered address = ${address}`);

        if (!ethers.utils.isAddress(address)) {
            alert('Invalid address!');
            return;
        }
        
        try {
            const tx = await contract.setInspector(address);
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            alert('Inspector set successfully!');
            await loadContractData();
			document.getElementById('confirmInspector').disabled = false;
        } catch (error) {
            console.error(error);
            alert('Transaction failed: ' + error.message);
        }
    }
    
    async function setTenant() {
        const address = document.getElementById('tenantAddress').value;


        if (!ethers.utils.isAddress(address)) {
            alert('Invalid address!');
            return;
        }
        
        try {
            const tx = await contract.setTenant(address);
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            alert('Tenant set successfully!');
            document.getElementById('expectedTenantAddress').textContent = `Address: ${address}`;
            await loadContractData();
			
        } catch (error) {
            console.error(error);
            alert('Transaction failed: ' + error.message);
        }
    }
    
    // ========== INSPECTOR FUNCTIONS ==========
    async function confirmInspector() {
        try {
            const tx = await contract.confirmInspector();
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            alert('Inspector confirmed!');
            await loadContractData();
        } catch (error) {
            console.error(error);
            alert('Transaction failed: ' + error.message);
        }
    }
    
    async function reportDamage() {
        try {
            const tx = await contract.damageStatus(true);
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            alert('Damage reported!');
        } catch (error) {
            console.error(error);
            alert('Transaction failed: ' + error.message);
        }
    }
        
    // ========== TENANT FUNCTIONS ==========
    async function confirmTenant() {
        try {
			const spend = Number(monthlyRent) + Number(deposit);
            const tx = await contract.confirmTenant({
                value: ethers.utils.parseEther(String(spend))  // need to pass a string
            });
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            alert(`Tenant confirmed! Paid ${spend} ETH`);
            await loadContractData();
        } catch (error) {
            console.error(error);
            alert('Transaction failed: ' + error.message);
        }
    }
    
    async function payRent() {
        try {
            const tx = await contract.tenantPays({
                value: ethers.utils.parseEther(monthlyRent)
            });
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            alert('Rent paid! 1 ETH');
            await loadContractData();
        } catch (error) {
            console.error(error);
            alert('Transaction failed: ' + error.message);
        }
    }
    
    // ---------------------------------------- 
    async function cancelContract() {
        if (!confirm('Are you sure you want to cancel the contract?')) {
            return;
        }
        
        try {
            const tx = await contract.cancel();
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            alert('Contract cancelled!');
            await loadContractData();
        } catch (error) {
            console.error(error);
            alert('Transaction failed: ' + error.message);
        }
    }
    
    async function releaseDeposit() {
        try {
            const tx = await contract.releaseDeposit();
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            alert('Deposit released!');
			depositReleased = true;
            await loadContractData();
        } catch (error) {
            console.error(error);
            alert(' Transaction failed: ' + error.message);
        }
    }
    
    // ------------------------------------

    function updateUI(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerText = value;
        }
    }
    
    // ========== EVENT LISTENERS ==========
    if (window.ethereum) {
    ethereum.on('accountsChanged', async (accounts) => {
        if (accounts.length === 0) {
            console.log('Disconnected');
            return;
        }
        
        console.log('Switched to:', accounts[0]);
        
        // Update everything with new account
        userAddress = accounts[0];
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        // Update UI
        const walletElement = document.querySelector('#wallet-address');
        if (walletElement) {
            walletElement.innerText = `${userAddress.substring(0, 6)}...${userAddress.substring(38)}`;
        }
        
        await loadContractData();
    });
}

    window.addEventListener('load', () => {
        console.log('Page loaded. Setting up event listeners...');
        
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        } else {
            console.log('MetaMask is NOT installed');
        }
        
        // Connect wallet button
        document.getElementById('connectMetamask')?.addEventListener('click', connectWallet);
        document.getElementById('setInspectorAddress')?.addEventListener('click', setInspector);
        document.getElementById('setTenantAddress')?.addEventListener('click', setTenant);
        document.getElementById('cancel')?.addEventListener('click', cancelContract);


        // Inspector
        document.getElementById('confirmInspector')?.addEventListener('click', confirmInspector);
        document.getElementById('reportDamage')?.addEventListener('click', reportDamage);

        // Tenant
        document.getElementById('confirmTenant')?.addEventListener('click', confirmTenant);
        document.getElementById('payRent')?.addEventListener('click', payRent);

        
		document.getElementById('releaseDeposit')?.addEventListener('click', releaseDeposit);



        console.log('Connect button listener attached!');
    });
