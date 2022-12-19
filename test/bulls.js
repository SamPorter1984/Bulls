const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

const { bulls07Fixture, bulls08Fixture } = require('./fixtures/libFixtures.js');

const ITERATIONS = 10;

describe('Bulls solc 0.7.x', function () {
  let lib = {};
  beforeEach('need POWER', async () => {
    lib = await loadFixture(bulls07Fixture);
  });

  describe('testPackBooleans(bool[] memory bools)', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(ITERATIONS + ' pseudo random iterations for ' + POWER + ' booleans in uint' + POWER, async function () {
        for (let n = 0; n < ITERATIONS; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? (bools[i] = false) : (bools[i] = true);
          }
          const res = await lib.testPackBooleans(bools);
          for (let i = 0; i < bools.length; i++) {
            expect(res[i]).to.equal(bools[i]);
          }
        }
      });
    }
  });
  describe('sstoreUintGasTest and sloadUintGasTest', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(1 + ' pseudo random iterations for ' + POWER + ' booleans in uint' + POWER, async function () {
        for (let n = 0; n < 1; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? (bools[i] = false) : (bools[i] = true);
          }
          const receipt = await (await lib.sstoreUintGasTest(bools)).wait();
          console.log('        tx for uint' + POWER + ' took ' + receipt.cumulativeGasUsed + ' gas.');
          const receipt1 = await (await lib.sloadUintGasTest()).wait();
          console.log('        sload + recording unrelated uint for uint' + POWER + ' took ' + receipt1.cumulativeGasUsed + ' gas.');
        }
      });
    }
  });
  describe('sstoreBoolsGasTest and sloadBoolsGasTest', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(1 + ' pseudo random iterations for ' + POWER + ' booleans in bool[] storage', async function () {
        for (let n = 0; n < 1; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? (bools[i] = false) : (bools[i] = true);
          }
          const receipt = await (await lib.sstoreBoolsGasTest(bools)).wait();
          console.log('        tx for bool[' + POWER + '] took ' + receipt.cumulativeGasUsed + ' gas.');
          const receipt1 = await (await lib.sloadBoolsGasTest()).wait();
          console.log('        sload + recording unrelated uint for bool[' + POWER + '] took ' + receipt1.cumulativeGasUsed + ' gas.');
        }
      });
    }
  });
  describe('sstoreSeparate256BoolsGasTest', function () {
    it(' is insane', async function () {
      const receipt = await (await lib.sstoreSeparate256BoolsGasTest()).wait();
      console.log('        tx which stores separate 256 bools took ' + receipt.cumulativeGasUsed + ' gas.');
    });
  });
});

describe('Bulls solc 0.8.x', function () {
  let lib = {};
  beforeEach('need POWER', async () => {
    lib = await loadFixture(bulls08Fixture);
  });

  describe('testPackBooleans(bool[] memory bools)', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(ITERATIONS + ' pseudo random iterations for ' + POWER + ' booleans in uint' + POWER, async function () {
        for (let n = 0; n < ITERATIONS; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? (bools[i] = false) : (bools[i] = true);
          }
          const res = await lib.testPackBooleans(bools);
          for (let i = 0; i < bools.length; i++) {
            expect(res[i]).to.equal(bools[i]);
          }
        }
      });
    }
  });
  describe('sstoreUintGasTest and sloadUintGasTest', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(1 + ' pseudo random iterations for ' + POWER + ' booleans in uint' + POWER, async function () {
        for (let n = 0; n < 1; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? (bools[i] = false) : (bools[i] = true);
          }
          const receipt = await (await lib.sstoreUintGasTest(bools)).wait();
          console.log('        tx for bool[' + POWER + '] took ' + receipt.cumulativeGasUsed + ' gas.');
          const receipt1 = await (await lib.sloadUintGasTest()).wait();
          console.log('        sload + recording unrelated uint for uint' + POWER + ' took ' + receipt1.cumulativeGasUsed + ' gas.');
        }
      });
    }
  });
  describe('sstoreBoolsGasTest and sloadBoolsGasTest', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(1 + ' pseudo random iterations for ' + POWER + ' booleans in bool[] storage', async function () {
        for (let n = 0; n < 1; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? (bools[i] = false) : (bools[i] = true);
          }
          const receipt = await (await lib.sstoreBoolsGasTest(bools)).wait();
          console.log('        tx for bool[' + POWER + '] took ' + receipt.cumulativeGasUsed + ' gas.');
          const receipt1 = await (await lib.sloadBoolsGasTest()).wait();
          console.log('        sload + recording unrelated uint for bool[' + POWER + '] took ' + receipt1.cumulativeGasUsed + ' gas.');
        }
      });
    }
  });
  describe('sstoreSeparate256BoolsGasTest', function () {
    it('actually not that expensive', async function () {
      const receipt = await (await lib.sstoreSeparate256BoolsGasTest()).wait();
      console.log('        tx which stores separate 256 bools took ' + receipt.cumulativeGasUsed + ' gas.');
    });
  });
});