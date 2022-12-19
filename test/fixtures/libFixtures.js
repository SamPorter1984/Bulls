async function bulls07Fixture() {
  const bulls = await (await ethers.getContractFactory('contracts/solc-0.7/Bulls.sol:Bulls')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.7/LibraryTest.sol:LibTest')).deploy();
}

async function bulls08Fixture() {
  const bulls = await (await ethers.getContractFactory('contracts/solc-0.8/Bulls.sol:Bulls')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.8/LibraryTest.sol:LibTest')).deploy();
}

module.exports = {
  bulls07Fixture,
  bulls08Fixture,
};
