const { ethers } = require('hardhat');

async function bulls04Fixture() {
  const bulls = await (await ethers.getContractFactory('contracts/solc-0.4/Bulls.sol:Bulls')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.4/LibraryTest.sol:LibTest')).deploy();
}

async function bulls05Fixture() {
  const bulls = await (await ethers.getContractFactory('contracts/solc-0.5/Bulls.sol:Bulls')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.5/LibraryTest.sol:LibTest')).deploy();
}

async function bulls06Fixture() {
  const bulls = await (await ethers.getContractFactory('contracts/solc-0.6/Bulls.sol:Bulls')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.6/LibraryTest.sol:LibTest')).deploy();
}

async function bulls07Fixture() {
  const bulls = await (await ethers.getContractFactory('contracts/solc-0.7/Bulls.sol:Bulls')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.7/LibraryTest.sol:LibTest')).deploy();
  //return await (
  //  await ethers.getContractFactory('contracts/solc-0.7/LibraryTest.sol:LibTest', {
  //    libraries: {
  //      Bulls: bulls.address,
  //    },
  //  })
  //).deploy();
}

async function bulls08Fixture() {
  const bulls = await (await ethers.getContractFactory('contracts/solc-0.8/Bulls.sol:Bulls')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.8/LibraryTest.sol:LibTest')).deploy();
}

module.exports = {
  bulls04Fixture,
  bulls07Fixture,
  bulls08Fixture,
  bulls05Fixture,
  bulls06Fixture,
};
