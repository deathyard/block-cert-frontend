pragma solidity >=0.4.22 <0.9.0;

contract Certificate {
    bytes32[] public hashes;
    uint public count;
    
    function addHash(bytes32 newHash) public{
        count++;
        hashes[count] = newHash;
    }
}