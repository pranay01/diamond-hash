pragma solidity ^0.4.11;

contract Multisign2 {

    mapping (bytes32 => address[]) public addressProducerMap;


    // solidity doesn't have an iterator on mapping, a tracking list
    bytes32[] public productHashList;
    

    // returns true or false if successfully saved or not
    function saveAddress(bytes32 productHash) returns (bool){
        addressProducerMap[productHash].push(msg.sender);
        productHashList.push(productHash);
        return true;
        
    }


    //get address for a given productHash

    function getAddress(bytes32 prodHash) returns (address[]){
        return addressProducerMap[prodHash];
    }
    
}
