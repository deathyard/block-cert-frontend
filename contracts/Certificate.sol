pragma solidity >=0.4.22 <0.9.0;

contract Certificate {
    int[] hashes;
    uint8 count;
    
    function addHash(int newHash) public{
        count++;
        hashes[count] = newHash;
    }
}