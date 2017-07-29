var Multisign2 = artifacts.require("./Multisign2.sol");


module.exports = function(deployer) {
  deployer.deploy(Multisign2, {gas: 600000});
};
