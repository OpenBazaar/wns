var WNS = artifacts.require("WNS");

module.exports = function(deployer) {
  deployer.deploy(WNS, ["0x3d7342d400aa70d1dd48ce09fd82db006ed21eee"]);
};