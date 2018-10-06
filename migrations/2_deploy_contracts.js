var CryptoSource = artifacts.require("./CryptoSource.sol")

module.exports = function(deployer) {
  deployer.deploy(CryptoSource)
}
