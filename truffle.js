module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: "4", // Rinkeby network id
      from:"0x3d7342d400aa70d1dd48ce09fd82db006ed21eee"
    }
  }
};