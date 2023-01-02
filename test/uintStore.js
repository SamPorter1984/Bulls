const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

const { uintStore04Fixture, uintStore05Fixture, uintStore06Fixture, uintStore07Fixture, uintStore08Fixture } = require('./fixtures/libFixtures.js');

const ITERATIONS = 50;
/*
describe('\n \n UintStore solc 0.4.x', async function () {
  await testsForFixture(uintStore04Fixture);
});

describe('\n \n UintStore solc 0.5.x', async function () {
  await testsForFixture(uintStore05Fixture);
});

describe('\n \n UintStore solc 0.6.x', async function () {
  await testsForFixture(uintStore06Fixture);
});
*/
describe('\n \n UintStore solc 0.7.x', async function () {
  await testsForFixture(uintStore07Fixture);
});
/*
describe('\n \n UintStore solc 0.8.x', async function () {
  await testsForFixture(uintStore08Fixture);
});
*/
async function testsForFixture(fixture) {
  let lib = {};
  beforeEach('load fixture', async () => {
    lib = await loadFixture(fixture);
  });

  describe('\n testPackAndUnpackBooleans(bool[] memory bools)', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(ITERATIONS + ' pseudo random iterations to pack and unpack ' + POWER + ' booleans in uint' + POWER + ' and compare io', async function () {
        for (let n = 0; n < ITERATIONS; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? (bools[i] = false) : (bools[i] = true);
          }
          const res = await lib.testPackAndUnpackBooleans(bools);
          expect(res.length, 'array length dont match').to.equal(bools.length);
          for (let i = 0; i < bools.length; i++) {
            expect(res[i]).to.equal(bools[i]);
          }
        }
      });
    }
  }); /**/

  describe('\n testPackAndUnpackBooleansBitShift(bool[] memory bools)', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(ITERATIONS + ' pseudo random iterations to pack and unpack ' + POWER + ' booleans in uint' + POWER + ' and compare io', async function () {
        for (let n = 0; n < ITERATIONS; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? (bools[i] = false) : (bools[i] = true);
          }
          const res = await lib.testPackAndUnpackBooleansBitShift(bools);
          expect(res.length, 'array length dont match').to.equal(bools.length);
          for (let i = 0; i < bools.length; i++) {
            expect(res[i]).to.equal(bools[i]);
          }
        }
      });
    }
  });

  describe('\n sstoreBooleansPackedGasTest and sloadPackedBoolsAndExtGasTest', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(1 + ' only true iterations for ' + POWER + ' booleans in uint' + POWER, async function () {
        for (let n = 0; n < 1; n++) {
          let bools = [];
          for (let i = 0; i < POWER; i++) {
            bools[i] = true;
          }
          const receipt = await (await lib.sstoreBooleansPackedGasTest(bools)).wait();
          console.log('');
          console.log('        math:tx to pack ' + POWER + ' booleans in uint' + POWER + ' and SSTORE it took ' + receipt.cumulativeGasUsed + ' gas.');
          const receipt1 = await (await lib.sloadPackedBoolsAndExtGasTest(POWER)).wait();
          console.log('        math:SLOAD uint' + POWER + ', unpack it and SSTORE an unrelated uint took ' + receipt1.cumulativeGasUsed + ' gas.');

          const receipt2 = await (await lib.sstoreBooleansPackedBitShiftGasTest(bools)).wait();
          console.log('        bit shift:tx to pack ' + POWER + ' booleans in uint' + POWER + ' and SSTORE it took ' + receipt2.cumulativeGasUsed + ' gas.');
          const receipt3 = await (await lib.sloadPackedBoolsAndExtBitShiftGasTest(POWER)).wait();
          console.log('        bit shift:SLOAD uint' + POWER + ', unpack it and SSTORE an unrelated uint took ' + receipt3.cumulativeGasUsed + ' gas.');

          const receipt4 = await (await lib.sstoreBoolsGasTest(bools)).wait();
          console.log('        tx to simply SSTORE bool[' + POWER + '] conventionally took ' + receipt4.cumulativeGasUsed + ' gas.');
          const receipt5 = await (await lib.sloadBoolsGasTest()).wait();
          console.log('        SLOAD bool[' + POWER + '] and SSTORE an unrelated uint took ' + receipt5.cumulativeGasUsed + ' gas.');
          if (POWER == 256) {
            const receipt = await (await lib.sstoreSeparate256BoolsGasTest()).wait();
            console.log('        tx which SSTORE separate 256 bools took ' + receipt.cumulativeGasUsed + ' gas.');
          }
        }
      });
    }
  });

  describe('\n testPackAndUnpackBooleansWithUint(bool[] memory bools, uint n)', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(ITERATIONS + ' pseudo random iterations for 1-' + POWER + ' booleans and uint1-' + POWER + ' in uint' + POWER, async function () {
        for (let n = 0; n < ITERATIONS; n++) {
          let bools = [];
          let bitSize = Math.floor(Math.random() * POWER);
          let someNumber = ethers.BigNumber.from(2).pow(bitSize).sub(1);
          for (let i = bitSize; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? bools.push(false) : bools.push(true);
          }
          const res = await lib.testPackAndUnpackBooleansWithUint(bools, someNumber, POWER, bitSize);
          expect(res[1]).to.equal(someNumber);
          for (let i = 0; i < res[0].length; i++) {
            expect(res[0][i]).to.equal(bools[i]);
          }
        }
      });
    }
  }); /**/

  describe('\n testPackAndUnpackBooleansWithUintBitShift(bool[] memory bools, uint n)', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(ITERATIONS + ' pseudo random iterations for 1-' + POWER + ' booleans and uint1-' + POWER + ' in uint' + POWER, async function () {
        for (let n = 0; n < ITERATIONS; n++) {
          //console.log('iteration #' + n);
          let bools = [];
          let bitSize = Math.floor(Math.random() * POWER);
          let someNumber = ethers.BigNumber.from(2).pow(bitSize).sub(1);
          for (let i = bitSize; i < POWER; i++) {
            let rand = Math.floor(Math.random() * 2);
            rand == 0 ? bools.push(false) : bools.push(true);
          }
          const res = await lib.testPackAndUnpackBooleansWithUintBitShift(bools, someNumber, POWER);
          expect(res[1]).to.equal(someNumber);
          for (let i = 0; i < res[0].length; i++) {
            expect(res[0][i]).to.equal(bools[i]);
          }
        }
      });
    }
  });

  describe('\n sstoreBoolsAndUintPackedGasTest and sloadPackedBoolsAndUintAndExtGasTest', function () {
    for (let POWER = 8; POWER <= 256; POWER *= 2) {
      it(1 + ' only true iterations for 2 booleans and max uint' + (POWER - 2) + ' in uint' + POWER, async function () {
        for (let n = 0; n < 1; n++) {
          let bools = [];
          let bitSize = POWER - 2;
          let someNumber = ethers.BigNumber.from(2)
            .pow(POWER - 2)
            .sub(1);
          for (let i = bitSize; i < POWER; i++) {
            bools.push(true);
          }
          const receipt = await (await lib.sstoreBoolsAndUintPackedGasTest(bools, someNumber, POWER)).wait();
          console.log('');
          console.log('        math: tx to pack uint' + (POWER - 2) + ' and 2 booleans in uint' + POWER + ' and sstore it took ' + receipt.cumulativeGasUsed + ' gas.');
          const receipt1 = await (await lib.sloadPackedBoolsAndUintAndExtGasTest(bitSize)).wait();
          if (receipt1.status == 0) {
            console.log('someNumber:' + someNumber);
            console.log('bitSize:' + bitSize);
            console.log('bools:' + bools);
          }
          console.log('        math: SLOAD uint' + (POWER - 2) + ' and 2 booleans, unpack and SSTORE an unrelated uint took ' + receipt1.cumulativeGasUsed + ' gas.');

          const receipt2 = await (await lib.sstoreBoolsAndUintPackedBitShiftGasTest(bools, someNumber, POWER)).wait();
          console.log('        bit shift: tx to pack uint' + (POWER - 2) + ' and 2 booleans in uint' + POWER + ' and sstore it took ' + receipt2.cumulativeGasUsed + ' gas.');
          const receipt3 = await (await lib.sloadPackedBoolsAndUintAndExtBitShiftGasTest(bools.length, POWER)).wait();
          console.log('        bit shift: SLOAD uint' + (POWER - 2) + ' and 2 booleans, unpack it and SSTORE an unrelated uint took ' + receipt3.cumulativeGasUsed + ' gas.');
          if (POWER == 256) {
            const receipt = await (await lib.sstore2BoolsAndUint240Conventionally(128)).wait();
            console.log('        tx to simply SSTORE uint240 and 2 separate bools conventionally took ' + receipt.cumulativeGasUsed + ' gas.');
            const receipt1 = await (await lib.sload2BoolsAndUint240Conventionally()).wait();
            console.log('        SLOAD uint240 and 2 bools conventionally, and then SSTORE an unrelated uint took ' + receipt1.cumulativeGasUsed + ' gas.');
            const receipt2 = await (await lib.sstore2BoolsAndUint256Conventionally(128)).wait();
            console.log('        tx to simply SSTORE uint256 and 2 separate bools conventionally took ' + receipt2.cumulativeGasUsed + ' gas.');
            const receipt3 = await (await lib.sload2BoolsAndUint256Conventionally()).wait();
            console.log('        SLOAD uint256 and 2 bools conventionally, and then SSTORE an unrelated uint took ' + receipt3.cumulativeGasUsed + ' gas.');
          }
        }
      });
    }
  });
}
