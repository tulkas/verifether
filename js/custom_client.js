function processFile()
{
	var selectedFile=document.getElementById('uploadedFile').files[0];
	//console.log(selectedFile);
	var reader= new FileReader();
	//reader.readAsDataURL();
	reader.readAsText(selectedFile);
	reader.onload = function a()
	{
		console.log('a');
		var fileHash= "0x"+asmCrypto.SHA256.hex(reader.result);
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		console.log(fileHash);
		//console.log(web3.eth.getStorageAt("0x2ccA22343037D54BfEBbE96793899a5Eb821F080", 0));
		var MyContract = web3.eth.contract([ { "constant": false, "inputs": [ { "name": "fileHash", "type": "bytes32" } ], "name": "addHash", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "validHashes", "outputs": [ { "name": "", "type": "bytes32", "value": "0x02e10a5ffb40f9c15a3ec9d1cc18b35c1e3c861e28e5d3b3b8d34ce9c7209c51" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]);
		var myContractInstance = MyContract.at('0x2ccA22343037D54BfEBbE96793899a5Eb821F080');
		var myCallData = myContractInstance.validHashes();
		console.log(myCallData);
	};
};
