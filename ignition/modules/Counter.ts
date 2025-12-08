import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyContract", (m) => {
  // Define parameters with default values
  const rentAmount = m.getParameter("rentAmount", "1000000000000000000"); // 1 ETH in wei
  const depositAmount = m.getParameter("depositAmount", "5000000000000000000"); // 2 ETH in wei
  const duration = m.getParameter("duration", 3); // 3 months

  // Deploy contract with constructor arguments
  const myContract = m.contract("MyContract", [rentAmount, depositAmount, duration]);

  return { myContract };
});
