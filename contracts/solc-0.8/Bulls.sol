// SPDX-License-Identifier: MIT
// Author: SamPorter1984

pragma solidity ^0.8.17;

library Bulls {
    function packBooleans(bool[] memory bools) internal pure returns (uint z) {
        unchecked {
            if (bools[0]) {
                z += 1;
            }
            for (uint i = 1; i < bools.length; i++) {
                if (bools[i]) {
                    z += 2 ** i;
                }
            }
        }
    }

    function extBools(uint z) internal pure returns (bool[] memory) {
        unchecked {
            uint i = 8;
            z > 255
                ? z > 65536
                    ? z > 4294967296 ? z > 18446744073709551616 ? z > 340282366920938463463374607431768211456 ? i = 256 : i = 128 : i = 64 : i = 32
                    : i = 16
                : i = 8;
            bool[] memory bls = new bool[](i);
            uint half;
            half = (2 ** i - 1) / 2;
            while (i > 0) {
                --i;
                if (z > half) {
                    bls[i] = true;
                    z -= half + 1;
                }
                half /= 2;
            }
            return bls;
        }
    }
}
