async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contract with account:", deployer.address);
    
    const MyContract = await ethers.getContractFactory("MyContract");
    const contract = await MyContract.deploy();
    
    await contract.deployed();
    
    console.log("Contract deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
