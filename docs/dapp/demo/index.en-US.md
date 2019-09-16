# Actual Demo

<img src="/images/dapp/dapp05.jpg" >

This chapter will explain a number of practical cases, from easy to difficult  easy for developers to analyze the whole process of DApp.
If developers don't know much about dapp, check out the smart contract section, which explains the role of each document in the contract template and the modules that developers need to focus on.

<!-- * [Actual Demo](#Actual Demo)
	* [1.helloworld](#1helloworld)
		* [1.1 Configuration and route](#11-Configuration and route)
		* [1.2 Definition of model](#12-Definition of model)
		* [1.3 Realization of Contract](#13-Realization of Contract)
	* [2.Issue token and  tranfer](#2Issue token and  tranfer)
		* [2.1 Registered Asset Issuer](#21-Registered Asset Issuer)
		* [2.2 Registered assets](#22-Registered assets)
		* [2.3 Issue assets ](#23-Issue assets )
		* [2.4 Transfer between tokens](#24-Transfer between tokens)
	* [3.Secret DApp](#3Secret DApp)
		* [3.1 Contract development](#31-Contract development)
		* [3.2 ontract invocation](#32-ontract invocation) -->
### 1.helloworld
For a detailed example, please refer to [hello world](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld). This example is for reference only. In order to explain the use of entanmo DApp for you more conveniently.

#### 1.1 Configuration and route
**Where do we start?**

Code will have a starting point, such as the `main()` function in java, `onCreate()` in Android, and so on. The entry file for entanmo contract  is [`init.js`](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld/init.js)

	module.exports = async function () {
		//...
		//Registration contract method
		app.registerContract(1000, 'helloworld.hello')
	  	//....
	}

Obviously, you can see the registered interface (not the contract), and you can refer to the remote interface section for details.

Example: Here's a demonstration of a put request with parameters

	let etmJS = require('etm-js');
	let axios = require('axios');
	let secret = "race forget pause shoe trick first abuse insane hope budget river enough"
	let url = 'http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/transactions/signed'

	let transaction = etmJS.dapp.createInnerTransaction({
	  fee: `0`,
	  type: 1000,//Contract number
	  args: JSON.stringify(["hello world"])//Contract parameters
	}, secret)
	axios.put(url, {
	  transaction
	}).then(res => {
	  console.log(res)
	}).catch(err => {
	  console.error(err);
	})

Continue to view [helloworld.js](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld/interface/helloworld.js)  in the interface directory.

	//...
	// Get all word get requests
	app.route.get("/words", async req => {
	  let words = await app.model.Words.findAll({})
	  return {
	    words
	  }
	})
	//...
	//Request method:
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/words

In summary, we can see that contract requests are divided into two types: **put requests (generally defined in the contract directory) and get requests (generally defined in the interface directory).**


#### 1.2 Definition of model
The definition of the model is actually to define the data structure and how to store the data on the block chain.In the DApp template, we can see that the corresponding [words.js](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld/model/words.js) in the model directory is the definition file for the data model.

	module.exports = {
	  name: 'words',
	  fields: [
	    {
	      name: 'words',
	      type: 'String',
	      length: 256,
	      not_null: true,
	      index: true
	    }
	  ]
	}

As you can see, this example defines a words table that contains words fields and requirements.

#### 1.3 Realization of Contract
In order to make it easier for developers to develop contracts, entanmo officials try to make developers do only logical work. Let's look at the [helloworld.js](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld/contract/helloworld.js) implementation in the contract directory

	//Changing information
	module.exports = {
	  hello: async function(words) {
	    //Step-by-step addition of words
	    app.sdb.lock("add-word")
	    //Add a data
	    app.sdb.create('Word', {
	      'words': words
	    })
	  }
	}

The code meaning has been explained in the comments. Developers only need to focus on the logical implementation of the contract.

After the logical implementation is written, the application node should be restarted, and the DApp is completed.

------------------

### 2. Issue token and  tranfer
In entanmo, issuing tokens requires the following steps. [Reference](https://github.com/etm-dev/etm-doc/blob/master/utils/issueAssert.js)

1. Registered Asset Issuer   100ETM
2. Registered assets     500ETM
3. Issue assets     0.1ETM
4. Transfer accounts        0.1ETM

#### 2.1 Registered Asset Issuer

This step is a registered issuer operation.

	let password = 'race forget pause shoe trick first abuse insane hope budget river enough';
	let secondPassword = '';

	//Must be capitalized
	let issuerName = 'RAY';
	let assertName = 'CNY';
	//Step 1
	//Registered Asset Issuer 100 ETM
	function registerAssertIssuer() {
	  //Publisher RAY
	  let transaction = etmjs.uia.createIssuer(issuerName, "issuer", password, secondPassword);
	  return JSON.stringify({
	    transaction
	  });
	}
	//Registered Distributor
	axios.post(url, registerAssertIssuer()).then(res => {
	  console.log(res)
	}).catch(err => {
	  console.error(err);
	})

Whether the query was successfully published:

	//get
	http://etm.red:8097/api/uia/issuers/RAY

	//Result
	{
		"success": true,
		"issuer": {
			"name": "RAY",
			"desc": "issuer",
			"issuerId": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr"
		}
	}

The registered issuer has already succeeded.

#### 2.2 Registered assets
If the issuer of registered assets succeeds, it will be eligible to register assets.

	//Step 2
	//Registered assets 500 ETM
	function registerAssrt() {
	  // Asset Name, Issuer Name, Asset Name, Unique Identification
	  let name = issuerName + '.' + assertName;
	  let desc = 'Test';
	  // Upper limit 1 billion
	  let maximum = '100000000000000000';
	  // Accuracy: The number of decimal points, where the upper limit is 100000000000000, the accuracy is 8, representing the maximum issuance of the asset IssuerName.CNY is 1000000000.00000000.
	  let precision = 8;
	  // strategy
	  let strategy = '';
	  // Whether to allow the cancellation, the default is not allowed. 0:No, 1:Yes.
	  let allowWriteoff = 0;
	  // Whether to allow the whitelist, the default is not allowed. 0:No, 1:Yes.
	  let allowWhitelist = 0;
	  // Whether to allow the blacklist, the default is not allowed. 0:No, 1:Yes.
	  let allowBlacklist = 0;

	  // Constructing transaction data
	  let trs = etmjs.uia.createAsset(name, desc, maximum, precision, strategy, allowWriteoff, allowWhitelist, allowBlacklist, password, secondPassword)
	  return JSON.stringify({
	    "transaction": trs
	  })
	}

Query whether the asset has been registered successfully:

	//get
	http://etm.red:8097/api/uia/issuers/RAY/assets

	//Return result
	{
		"success": true,
		"assets": [{
			"name": "RAY.CNY",
			"desc": "Test",
			"maximum": "100000000000000000",
			"precision": 8,
			"strategy": "",
			"quantity": "0",
			"height": 185150,
			"issuerId": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
			"acl": 0,
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "0"
		}],
		"count": 1
	}

#### 2.3 Issue assets
Only after the registered assets are successful , the tokens of the assets can be issued.

	//Step 3 Issuing tokens  0.1 ETM
	function issueAssert() {
	  let currency = issuerName + '.' + assertName;
	  // This issue = real quantity (100)*10** precision (3), the sum of all issuance needs to be <= upper limit*precision
	  //Issue 100 million
	  let amount = '10000000000000000'
	  let trs = etmjs.uia.createIssue(currency, amount, password, secondPassword)
	  return JSON.stringify({
	    "transaction": trs
	  })
	}

Query whether the asset has been successfully released:

	//get
	http://etm.red:8097/api/uia/balances/A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr
	//This address is the publisher address

	//Return result
	{
		"success": true,
		"balances": [{
			"currency": "RAY.CNY",
			"balance": "10000000000000000",
			"maximum": "100000000000000000",
			"precision": 8,
			"quantity": "10000000000000000",
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000",
			"balanceShow": "100000000"
		}],
		"count": 1
	}

#### 2.4 Transfer between tokens
Only after the issuance of assets is successful can the operation be carried out in this way.

	//transfer asset
	function transferAsset() {
	  let currency = issuerName + '.' + assertName;
	  // The transfer amount (10000) = real amount (10) * 10 ** accuracy (8), need to be less than or equal to the current total asset issuance
	  let amount = '10000000000';
	  // Receiving addresses need to satisfy the acl rules defined above
	  let recipientId = 'AJtYXzZrbGtRUvNrmKj6m2KtKRPHf6Akgy'
	  var trs = etmjs.uia.createTransfer(currency, amount, recipientId,'',password, secondPassword)
	  return JSON.stringify({
	    "transaction": trs
	  })
	}

	//The third step can only be executed after the third step is completed and waiting for the block to confirm.
	//tranfer
	axios.post(url, transferAsset()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Query whether the transfer is successful:

	//get
	http://etm.red:8097/api/uia/balances/AJtYXzZrbGtRUvNrmKj6m2KtKRPHf6Akgy
	//This address is the publisher address

	//Return result
	{
		"success": true,
		"balances": [{
			"currency": "RAY.CNY",
			"balance": "10000000000",
			"maximum": "100000000000000000",
			"precision": 8,
			"quantity": "10000000000000000",
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000",
			"balanceShow": "100"  //100 tokens transferred
		}],
		"count": 1
	}

-----------------
### 3.Secret DApp
Blockchain technology is designed on the basis of cryptography. En-Tan-Mo account system is based on ed25519 algorithm. The advantage of this set of algorithms is that **the performance of signature and verification is very high, the signature is small, and the public key is small**. It can be said that this set of algorithms is designed for signature.

Based on the above information, if we can convert ed25519 into Curve 25519 (elliptic curve), then we can design an interesting function:

**Public key encrypted information, private key decrypted information, directed to someone to send information**

Example:

1. Tom uses alice's public key to encrypt information
2. Publish to Dapp
3. Everyone can get this information, but they can't see it because it's encrypted.
4. When Alice goes online, it gets the encrypted information and decrypts it with its own private key, then it can get the original information that Tom gave him.

Based on the above theory, Based on the above theory, entanmo gives an official  example for developers  ([secret](https://github.com/etm-dev/secretDapp))

#### 3.1 Contract development
In the first section, the development model of DAPP is briefly described.
Two interfaces can be designed simply:

1. Encrypted Information Interface (developed under contract/* because it is to modify and save information)
2. Decryption interface (developed under inteface/* directory)
3. Data structure (developed under model/* directory)

**Encryption interface:**

	  //All encryption operations can be implemented locally. This example is just for better demonstration.
	  encodeString: async function(words, receiveAddress) {
	    let sender = this.trs.senderId
	    if (!etmjs.crypto.isAddress(sender)) return INVALIDATE_USER
	    if (!etmjs.crypto.isAddress(receiveAddress)) return INVALIDATE_RECEIVER
	    //Converting Receiver Address to publicKey
	    let publicKey = null
	    //1.Query in the user table if there is a user, and read publickey if there is a user.
	    let receiveUser = await app.model.User.findOne({
	      condition: {
	        address: receiveAddress
	      }
	    })
	    if (receiveUser) {
	      publicKey = receiveUser.publicKey
	    }
	   	//2.Get whether there is publickey in the main network (if there is no registered account, there is no publickey)
	    if (!receiveUser) {
	      try {
	        let res = await axios.get("http://etm.red:8097/api/accounts/getPublickey?address=" + receiveAddress, {
	          timeout: 5000
	        })
	        if (res && res.data && res.data.success) {
	          publicKey = res.data.publicKey
	        }
	      } catch (e) {
	        return NET_ERROR
	      }
	    }
	    if (!publicKey) {
	      return INVALIDATE_PUBLIC_KEY
	    }
	    // msg.length<300
	    if (!words || words.length > 300) {
	      return STRING_LENGTH_ERROR
	    }
	    let encodeMsg = null
	    try {
	      encodeMsg = cryptoUtils.encodeString(words, publicKey)
	    } catch (e) {
	      return ENCODE_STRING_ERROR
	    }
	    if (!encodeMsg) {
	      return ENCODE_STRING_ERROR
	    }
	    app.sdb.create('Word', {
	      'id': ids.generateID(),
	      'msg': encodeMsg,
	      'sender': sender,
	      'receiver': receiveAddress,
	      'date': Date.now(),
	    })

	  }

**Decryption interface:**

	// All decryption operations can be implemented locally. This example is just for better demonstration.
	//TODO  If the developer feels that it is not safe, you can put the encryption and decryption into the local operation. This case is just a better demonstration for you.
	app.route.get("/decode", async req => {
	  let {
	    encodeMsg,
	    secret
	  } = req.query
	  //Since secret has blank, all requests need to be encodeURI when they are sent
	  //Here's decodeURI
	  encodeMsg = decodeURI(encodeMsg)
	  secret=decodeURI(secret)
	  //Now that you have secret, it means that you don't need to verify the validity of addresses, and secret represents the maximum permission.
	  if (!secret) {
	    return DECODE_STRING_ERROR
	  }
	  try {
	    dmsg = cryptoUtils.decodeString(encodeMsg, secret)
	  } catch (e) {
	    return DECODE_STRING_ERROR
	  }
	  return {
	    dmsg
	  }
	})

#### 3.2 Contract invocation

Encrypted information:

	let secret = "foot profit decorate orient quit goose upon curve coast warm income manual"
	let address = 'AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P'
	let url = 'http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/transactions/signed'

	let transaction = etmJS.dapp.createInnerTransaction({
	  fee: `0`,
	  type: 1001,
	  args: JSON.stringify(['I love my home',address])
	}, secret)
	axios.put(url, {
	  transaction
	}).then(res => {
	  console.log(res)
	}).catch(err => {
	  console.error(err);
	})

Get encrypted information:

	//get
	http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/msg/AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P
	//Return result
	{
		"encodeMsgs": [{
			"id": "mjl53EbE2xCy",
			// MSG is the encrypted information
			"msg": "0e141fa52463531fb654c2398cabf883ef194130af99a88e9e34669cb995e40c5de9cbe03a081a196dff375a719dc5b930435ebe9a36f31f821a1b22",
			"sender": "AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P",
			"receiver": "AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P",
			"date": "1552632154799"
		}],
		"totalCount": 1,
		"success": true
	}

Decrypted information:

	//get  This step can be done locally, and this example is just for demonstration purposes.
	http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/decode?encodeMsg=0e141fa52463531fb654c2398cabf883ef194130af99a88e9e34669cb995e40c5de9cbe03a081a196dff375a719dc5b930435ebe9a36f31f821a1b22&secret=foot profit decorate orient quit goose upon curve coast warm income manual

	//Return result
	{"dmsg":"I love my home","success":true}

-----------------
### Demonstration of Online Cases

* epony（[epony](epony.cn)）
* Secret DApp

