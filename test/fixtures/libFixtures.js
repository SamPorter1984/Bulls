const { ethers } = require('hardhat');

async function uintStore04Fixture() {
  const uintStore = await (await ethers.getContractFactory('contracts/solc-0.4/UintStore.sol:UintStore')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.4/LibraryTest.sol:LibTest')).deploy();
}

async function uintStore05Fixture() {
  const uintStore = await (await ethers.getContractFactory('contracts/solc-0.5/UintStore.sol:UintStore')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.5/LibraryTest.sol:LibTest')).deploy();
}

async function uintStore06Fixture() {
  const uintStore = await (await ethers.getContractFactory('contracts/solc-0.6/UintStore.sol:UintStore')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.6/LibraryTest.sol:LibTest')).deploy();
}

async function uintStore07Fixture() {
  const uintStore = await (await ethers.getContractFactory('contracts/solc-0.7/UintStore.sol:UintStore')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.7/LibraryTest.sol:LibTest')).deploy();
  //return await (
  //  await ethers.getContractFactory('contracts/solc-0.7/LibraryTest.sol:LibTest', {
  //    libraries: {
  //      UintStore: uintStore.address,
  //    },
  //  })
  //).deploy();
}

async function uintStore08Fixture() {
  const uintStore = await (await ethers.getContractFactory('contracts/solc-0.8/UintStore.sol:UintStore')).deploy();
  return await (await ethers.getContractFactory('contracts/solc-0.8/LibraryTest.sol:LibTest')).deploy();
}

module.exports = {
  uintStore04Fixture,
  uintStore07Fixture,
  uintStore08Fixture,
  uintStore05Fixture,
  uintStore06Fixture,
};
