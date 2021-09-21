const Certificate = artifacts.require("Certificate");

module.exports = async function (deployer, network, accounts) {
  // deployment steps
  await deployer.deploy(Certificate);
};