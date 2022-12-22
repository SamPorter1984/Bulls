# Bulls library

It can store you an uint 250 and 6 booleans in one uint for example. It can pack and unpack booleans in uints making sstore 50-300% cheaper depending on the case. Personal bitmap implementation and a research I needed to improve Aletheo codebase. Currently looking at efficiency of math vs bit shifting, results are interesting and a bit inconclusive:

```
    math: tx to pack uint254 and 2 booleans in uint256 and sstore it took 45449 gas.
    math: SLOAD uint254 and 2 booleans, unpack and SSTORE an unrelated uint took 46878 gas.
    bit shift: tx to pack uint254 and 2 booleans in uint256 and sstore it took 57882 gas.
    bit shift: SLOAD uint254 and 2 booleans, unpack it and SSTORE an unrelated uint took 59332 gas.
```

This is while working only with booleans is cheaper for bit shifting:

```
    math:tx to pack 256 booleans in uint256 and SSTORE it took 130607 gas.
    math:SLOAD uint256, unpack it and SSTORE an unrelated uint took 129149 gas.
    bit shift:tx to pack 256 booleans in uint256 and SSTORE it took 116944 gas.
    bit shift:SLOAD uint256, unpack it and SSTORE an unrelated uint took 124685 gas.
```

Use-case example: 32 booleans for languages(whether they are being used or not) which need to be stated explicitly on chain to enable decentralized funding and editing [repo](https://github.com/SamPorter1984/Aletheo/blob/main/contracts/CampaignMarket.sol). It might be required in big structs.

Aside from booleans, you can pack uint254 and 2 booleans as uint256, and it would take basically same gas as for separate uint240 and 2 booleans, which is much cheaper than separate uint256 and 2 booleans following it(unless you are using solc below 0.7, in which case it's the same gas).
Or you can have uint61 and 3 booleans stored in uint64.
To test:

```
git clone https://github.com/SamPorter1984/Bulls && cd bulls && npm run test
```

Here are some extreme examples from tests(simply storing an array of 256 booleans vs packing them and storing them as uint):

```
tx to simply sstore bool[256] conventionally took 397184 gas.
tx to pack 256 booleans in uint256 and sstore it took 130562 gas.
```

By the way, storing 256 booleans as is is actually quite cheap in 0.8.x:

```
tx which stores separate 256 bools took 198097 gas.
```

Vs 277204 gas in 0.7.x.

bulls.js in test folder has tests for 0.4.x, 0.5.x, 0.6.x, 0.7.x, 0.8.x with first 3 commented out, so if you need them, edit the file.

## How to use:

```
pragma solidity ^0.8.17;
import './Bulls.sol';

contract LibTest {
    using Bulls for uint;
    using Bulls for bool[];

    uint uintBools = bools.packBools();//pass any amount up to 256
    // extract needs to know length, otherwise it might truncate array ending with all false
    bool[] result = uintBools.extBools(bools.length);

    // same as above, just different under the hood and is here so far for gas tests
    uint uintBools = bools.packBoolsBitShift();
    bool[] result = return uintBools.extBoolsBitShift(bools.length);

    // pack an uint and booleans with it, all data must not exceed uint256 size
    // n - number to store
    // base - size of the data, power of 2
    uint uintStore = bools.packBoolsWithUint(n, base);
    // to extract you need to have probably hardcoded bitSize
    // bitSize = the size of uint to extract in bits
    (bool[] memory extBools, uint z) = uintStore.extBoolsWithUint(bitSize);

    // same as above, but with bitShift and for now it
    // needs different arguments for extraction
    uint uintStore = bools.packBoolsWithUintBitShift(n, base);
    (bool[] memory extBools, uint z) = uintStore.extBoolsWithUintBitShift(bools.length, base);


}
```

I would suggest you to run tests to learn in which way you can best save users' gas. Contributions and pool requests are welcome.

Issues:
-might be reverting if asked to unpack 0 integer with booleans all false
