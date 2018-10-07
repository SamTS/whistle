const HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "water filter end saddle pride yellow patient evolve hill fold essence holiday";
var apiKey = "15284e02237e4dc0bc24f8a63400e3c1"

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/' + apiKey),
      network_id: '*',
      gas:  6700000,
      gasPrice: 10000000000
    }
  }
};
