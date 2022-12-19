# Bulls library

It can pack and unpack booleans in uints making sstore 50-300% cheaper depending on the case.

For use-case example you can visit Aletheo [repo](https://github.com/SamPorter1984/Aletheo/blob/main/contracts/CampaignMarket.sol). Could see some more use-cases: settings/statistics, which need to be stored on chain for an elaborate reason?

Anyway, if you want something a little bit too complex for today' distributed technology capabilities and you want it to be cheap enough to be usable, if you need to get rid 'Stack too deep' in big structs, or if you have an unhealthy obsession with optimization, then it can be useful. To test:

```
git clone https://github.com/SamPorter1984/Bulls && cd bulls && npm run test
```

Here are some extreme examples from tests(simply storing an array of 256 booleans vs packing them and storing them as uint):

```
tx to simply sstore bool[256] conventionally took 397184 gas.
tx to pack 256 booleans in uint256 and sstore it took 130562 gas.
```

A bit counter intuitive for some, but storing 256 booleans as is is actually quite cheap in 0.8.x:

```
tx which stores separate 256 bools took 198097 gas.
```

Vs 277204 gas in 0.7.x. Tests however, use external library. Calling another contract is a luxury today, and that's not the only thing you can fix to make user experience better.

## How to use:

```
pragma solidity ^0.8.17;
import './Bulls.sol';

contract LibTest {
    using {Bulls.extBools} for uint;
    using {Bulls.packBools} for bool[];

    function testPackBooleans(bool[] memory bools) public pure returns (bool[] memory) {
        uint uintBools = bools.packBools();
        return uintBools.extBools();
    }
}
```

And in case you need a cheaper(in general) compiler, 0.7.6 version is also present:

```
pragma solidity ^0.7.6;
import './Bulls.sol';

contract LibTest {
    using Bulls for uint;
    using Bulls for bool[];

    function testPackBooleans(bool[] memory bools) public pure returns (bool[] memory) {
        uint uintBools = bools.packBools();
        return uintBools.extBools();
    }
}
```
