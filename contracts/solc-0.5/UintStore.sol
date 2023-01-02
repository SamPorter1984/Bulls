// SPDX-License-Identifier: MIT
// Author: SamPorter1984

pragma solidity ^0.5.0;
import 'hardhat/console.sol';

library UintStore {
    //math
    function packBools(bool[] memory bools) internal pure returns (uint z) {
        if (bools[0]) {
            z += 1;
        }
        for (uint i = 1; i < bools.length; i++) {
            if (bools[i]) {
                z += 2 ** i;
            }
        }
    }

    function extBools(uint z, uint i) internal pure returns (bool[] memory) {
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

    function packBoolsWithUint(uint z, bool[] memory bools, uint uintBase) internal pure returns (uint) {
        uint x = uintBase - bools.length;
        for (uint i = 0; i < bools.length; i++) {
            if (bools[i]) {
                z = z + (2 ** (i + x));
            }
        }
        return z;
    }

    function extBoolsWithUint(uint z, uint bitSize) internal pure returns (bool[] memory, uint n) {
        uint i = 8;
        z > 255
            ? z > 65536
                ? z > 4294967296 ? z > 18446744073709551616 ? z > 340282366920938463463374607431768211456 ? i = 256 : i = 128 : i = 64 : i = 32
                : i = 16
            : i = 8;
        uint half;
        half = (2 ** i - 1) / 2;
        i -= bitSize;
        bool[] memory bls = new bool[](i);
        while (i > 0) {
            --i;
            if (z > half) {
                bls[i] = true;
                z -= half + 1;
            }
            half /= 2;
        }
        return (bls, z);
    }

    //bit shift
    function packBoolsBitShift(bool[] memory bools) internal pure returns (uint z) {
        for (uint i = 0; i < bools.length; i++) {
            if (bools[i]) {
                z = z | (1 << i);
            }
        }
    }

    function extBoolsBitShift(uint z, uint i) internal pure returns (bool[] memory) {
        bool[] memory bls = new bool[](i);
        while (i > 0) {
            --i;
            if ((z >> i) & 1 == 1) {
                bls[i] = true;
            }
        }
        return bls;
    }

    function packBoolsWithUintBitShift(uint z, bool[] memory bools, uint msb) internal pure returns (uint) {
        msb = mostSignificantBit(z);
        for (uint i = 0; i < bools.length; i++) {
            if (bools[i]) {
                z = z | (1 << (i + msb));
            }
        }
        return z;
    }

    function extBoolsWithUintBitShift(uint z, uint i, uint msb) internal pure returns (bool[] memory, uint) {
        if (msb == 0) {
            msb = mostSignificantBit(z);
        }
        uint n = 0;
        msb != i ? n = z & ((uint(1) << (msb - i)) - 1) : n;
        bool[] memory bls = new bool[](i);
        msb -= i;
        while (i > 0) {
            --i;
            if ((z >> (i + msb)) & 1 == 1) {
                bls[i] = true;
            }
        }
        return (bls, n);
    }

    function mostSignificantBit(uint256 z) internal pure returns (uint256) {
        uint i;
        while (z > 0) {
            if (z >> 64 != 0) {
                i += 64;
                z >>= 64;
            } else if (z >> 32 != 0) {
                i += 32;
                z >>= 32;
            } else if (z >> 16 != 0) {
                i += 16;
                z >>= 16;
            } else if (z >> 8 != 0) {
                i += 8;
                z >>= 8;
            } else {
                while (z > 0) {
                    i++;
                    z >>= 1;
                }
            }
        }
        return i;
    }
}
