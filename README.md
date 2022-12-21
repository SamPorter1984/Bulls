# Bulls library

It can pack and unpack booleans in uints making sstore 50-300% cheaper depending on the case.

Use-case example: 32 booleans for languages(whether they are being used or not) which need to be stated explicitly on chain to enable decentralized funding and editing [repo](https://github.com/SamPorter1984/Aletheo/blob/main/contracts/CampaignMarket.sol). It might be required in big structs.

Aside from booleans, you can pack for example uint254 and 2 booleans as uint256, and it would take basically same gas as for separate uint240 and 2 booleans, which is much cheaper than separate uint256 and 2 booleans following it(unless you are using solc below 0.7, in which case it's the same gas).
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
    using {Bulls.extBools, Bulls.extBoolsWithUint} for uint;
    using {Bulls.packBools, Bulls.packBoolsWithUint} for bool[];

    function testPackAndUnpackBooleans(bool[] memory bools) public pure returns (bool[] memory) {
        uint uintBools = bools.packBools();
        return uintBools.extBools();
    }

    function testPackAndUnpackBooleansWithUint(bool[] memory bools, uint n, uint base, uint bitSize)
    public pure returns (bool[] memory, uint) {
        // n = uint value to store with booleans
        // base = size of uintStore, so it wouldn't always treat say, 0 and 5 booleans as uint8.
        // Either 8,16,32,64,128 or 256
        // otherwise extracting wouldn't work correctly
        uint uintStore = bools.packBoolsWithUint(n, base);
        // bitSize = how many bits stored uint value takes, example: uint119 takes 119 bits.
        // Without it there is no way to know what's uint and what's booleans
        (bool[] memory extBools, uint z) = uintStore.extBoolsWithUint(bitSize);
        return (extBools, z);
    }
}
```

0.7.6 version:

```
pragma solidity ^0.7.6;
import './Bulls.sol';

contract LibTest {
    using Bulls for uint;
    using Bulls for bool[];

function testPackAndUnpackBooleans(bool[] memory bools) public pure returns (bool[] memory) {
        uint uintBools = bools.packBools();
        return uintBools.extBools();
    }

    function testPackAndUnpackBooleansWithUint(bool[] memory bools, uint n, uint base, uint bitSize)
    public pure returns (bool[] memory, uint) {
        uint uintStore = bools.packBoolsWithUint(n, base);
        (bool[] memory extBools, uint z) = uintStore.extBoolsWithUint(bitSize);
        return (extBools, z);
    }
}
```
