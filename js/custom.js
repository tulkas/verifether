function processFile()
{
	var selectedFile=document.getElementById('uploadedFile').files[0];
	//console.log(selectedFile);
	var reader= new FileReader();
	//reader.readAsDataURL();
	reader.readAsText(selectedFile);
	reader.onload = function a()
	{
		var fileHash= '0x43e08ad1'+asmCrypto.SHA256.hex(reader.result);
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		console.log(web3.eth.getBalance(web3.eth.coinbase));
		console.log(fileHash);
		var password=document.getElementById('walletpassword').value;
		if (password.length==0)
		{
			alert("Please enter your wallet passphrase");
		};
		try
		{
		web3.personal.unlockAccount("0xe829902232e272367aee5ec78ab09632d4b074c6",password);
		console.log('Unlocked');
		}
		catch (err)
		{
		alert('Wrong passphrase ! Please try again');
		}
		var tx=
		{
			from: "0xe829902232e272367aee5ec78ab09632d4b074c6",
			to: "0x2ccA22343037D54BfEBbE96793899a5Eb821F080",
			data: fileHash
		};
		//console.log('Created Transaction');
		console.log(tx);
		web3.eth.sendTransaction(tx);
		//console.log("Sent successfully");
		//console.log('Done');
		console.log("Check console logs for error details.");
		alert("Successfully uploaded to Blockchain.");
	};
};