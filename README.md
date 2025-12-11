# House agreement smart contract
This repository showcases a simple house agreement dApp for Ethereum blockchain, having 3 parties involved - landlord, tenant and inspector.


## Smart contract participants 

### Landlord
- sets inspector and tenant addresses
- can release deposit when contract ends
- is able to cancel contract

### Inspector
- confirms its own participation in the contract
- can report if property is damaged

### Tenant
- confirms its own participation in the contract
- makes monthly payments
- can release deposit when contract ends

## Scenario

1. Landlord initializes smart contract and sets inspector and landlord addresses
2. Inspector confirms its participation
3. Tenant confirms its participation by paying a deposit  + first monthly payment.
4. Smart contract is now active. 
      - Anytime inspector can report that property is damaged, which leaves the deposit locked for the tenant. 
      - Tenant and landlord can cancel contract at any time. If tenant cancels it, landlord receives deposit. If landlord cancels it tenant receives the deposit back.
5. Tenant pays each month
6. Smart contract ends, if there is no damage reported tenant receives deposit back.
