// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;


contract MyContract {
    event InspectorSet(address indexed inspector);
    event InspectorConfirmed(address indexed inspector);
    event TenantSet(address indexed tenant);
    event TenantConfirmed(address indexed tenant, uint amount);
    event RentPaid(uint month, uint amount);
    event DamageReported(bool isDamaged, address reporter);
    event ContractCancelled(address by);
    event DepositReleased(address to, uint amount);
    event StateChanged(ContractState newState);


    enum ContractState { Created, InspectorSet, Active, Ended }
    ContractState public state = ContractState.Created;

    uint current_month = 0;

    // Landlord sets this:
    address landlordAddress;

    bool depositRelease = false;
    uint duration;
    uint rentAmount;
    uint depositAmount;


    // Tenant, must pay deposit + 1st month
    // Can cancel rent 
    address pendingTenant;
    address tenantAddress;

    // Checks wherever something was damaged
    address pendingInspector;
    address inspectorAddress;
    bool isDamaged = false;


    constructor(uint _rentAmount, uint _depositAmount, uint _duration) {
            landlordAddress = msg.sender;
            rentAmount = _rentAmount;
            depositAmount = _depositAmount;
            duration = _duration;
        }


    function cancel() external payable {
        require(msg.sender == tenantAddress || msg.sender == landlordAddress, "Only landlord / tenant can cancel!");
        require(state == ContractState.Active, "Contract has ended, you can't cancel!");


        if(msg.sender == tenantAddress){
            payable(landlordAddress).transfer(depositAmount);   
        }
        else if(msg.sender == landlordAddress){
            payable(tenantAddress).transfer(depositAmount); 
        }

        state = ContractState.Ended;
        emit StateChanged(state);
        emit ContractCancelled(msg.sender);
    }

    function releaseDeposit() external {
        require(state == ContractState.Ended, "Contract must be ended!");
        
        if(isDamaged){
            payable(landlordAddress).transfer(depositAmount);
            emit DepositReleased(landlordAddress, depositAmount);
        } 
        else {
            payable(tenantAddress).transfer(depositAmount);
            
            emit DepositReleased(tenantAddress, depositAmount);
        }

 

    }

// Tenant functions:
    function setTenant(address tenant) external  {
        require(tenantAddress == address(0), "Tenant already confirmed and locked!");
        require(msg.sender == landlordAddress, "Only landlord can set!");
        pendingTenant = tenant;

        emit TenantSet(pendingTenant);
    }

    function confirmTenant() external payable {
        require(inspectorAddress != address(0), "Inspector must confirm before you!");
        require(msg.sender == pendingTenant, "Only tenant can confirm!");
        require(msg.value == rentAmount + depositAmount, "Must pay exact rent+deposit amount!");

        tenantAddress = pendingTenant;
        pendingTenant = address(0); // Clear pending tenant

        // pay deposit & rent for first month
        payable(landlordAddress).transfer(rentAmount);
        current_month ++;

        state = ContractState.Active;
        emit StateChanged(state);

        emit TenantConfirmed(tenantAddress, rentAmount+depositAmount);

    }


    function tenantPays() external payable {
        require(tenantAddress != address(0), "No tenant confirmed yet!");
        require(msg.sender == tenantAddress, "Only tenant can pay");
        require(msg.value == rentAmount, "Must pay exact rent amount");
        require(state == ContractState.Active, "Must be active");
        payable(landlordAddress).transfer(rentAmount);
        emit RentPaid(current_month, rentAmount);

        current_month++;

        if(current_month == duration){
            state = ContractState.Ended;
            emit StateChanged(state);
        }
    }
    
//  -------------------------
    function setInspector(address inspector) external  {
        require(inspectorAddress == address(0), "Inspector already confirmed and locked!");
        require(msg.sender == landlordAddress, "Only landlord can set!");
        pendingInspector = inspector;

        emit InspectorSet(pendingInspector);
    }

    function confirmInspector() external payable {
        require(msg.sender == pendingInspector, "Only inspector can confirm!");
        inspectorAddress = pendingInspector;
        pendingInspector = address(0);

        state = ContractState.InspectorSet;
        emit StateChanged(state);

        emit InspectorConfirmed(inspectorAddress);
    }

    function damageStatus(bool value) external{
        require(msg.sender == inspectorAddress, "Only inspector can set");
        isDamaged = value;

        emit DamageReported(isDamaged, inspectorAddress);
    }
// -------------------------

    function getLandlord() public view returns (address) { return landlordAddress;}

    function getTenant() public view returns (address) { return tenantAddress; }
    function getPendingTenant() public view returns (address) { return pendingTenant;}

    function getInspector() public view returns (address) { return inspectorAddress;}
    function getPendingInspector() public view returns (address) { return pendingInspector;}


    function getMonth() public view returns(uint) { return current_month;}

    function getMonthlyRent() public view returns(uint){ return rentAmount;}
    function getDeposit() public view returns(uint){ return depositAmount;}
    function getDuration() public view returns(uint){ return duration;}
    
    function getContractBalance() public view returns(uint){ return address(this).balance;}
}