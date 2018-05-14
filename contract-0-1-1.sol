pragma solidity ^0.4.0;
//Created by Yash Joshi
//Submitted to Prof. Mahavir Jhawar, for CS Capstone Research
//Implementation of VerifEther Smart Contract, to authenticate digital documents on the blockchain, and use a decade long monetary deposit as evidence of identity claim.
//Scheduler implements the Ethereum alarm clock, to trigger payments 10 years into the future. 
contract SchedulerAPI {
    function scheduleCall(address contractAddress,
                          bytes4 abiSignature,
                          uint targetBlock) public returns (address);
}



contract VerifEther {
   
    address owner; // Stores the address of the organisation account
    bytes32[] public validHashes; //Byte array that stores the hashes of the documents. Not using mapping, since entire search operation happening in the front end, and need length of array.
    string public claim= 'Ashoka University, Sonepat, India' //Stores the identity claim made by the organisation
   
    function VerifEther() public {
        owner = msg.sender; // Keeps track of the address of the account of the organisation, when the contract is deployed to the Ethereum network.
    }
   
   
    function addHash(bytes32 fileHash) public {
      require(msg.sender == owner); //Checks if the document is signed by the organisation account only.
      validHashes.push(fileHash); //Adds the digital signature of the document to the array of hashes
    }
    address constant Scheduler = SchedulerAPI(0xe109ecb193841af9da3110c80fdd365d1c23be2a);

    function CallMeLater() {
        // Schedule a call to the `callback` function
        Scheduler.value(2 ether).scheduleCall(
            address(this),               // The address that should be called. Address of current VerifEther contract
            bytes4(sha3("callback()")),  // 4-byte abi signature of callback fn
            block.number + 21024000,          // Calls the function to return the deposit after 10 years. 21024000 is the number of blocks mined during that time.
        );
    }

    function callback() public {
        owner.transfer(address(this).balance);// Sends all Ether held in the contract back to the organisation's account.
    }
}
