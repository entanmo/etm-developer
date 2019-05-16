# Detailed Http Interface

<img src="/images/dapp/dapp04_en.jpg"  >

The development of DApp should be divided into intelligent contract development and front-end interface development. This section focuses on how the front-end interface calls the contract interface, focusing on [3.Smart Contract Sdk Detailed](#3Smart Contract Sdk Detailed)。

**Build the request process：**
1. Construct request data. User data generates signatures and request data sets  according to the interface rules provided by entanmo.
2. Send request data and transfer the constructed data set to entanmo by POST/GET submission.
3. Entanmo processes the request data. After receiving the request, the server will first verify the security of the request and then process the sent request.
4. Returning the response result data, entanmo feeds back the response result to the user in JSON format. Each response contains the success field, which indicates whether the request is successful, true and false. If it fails, it also contains an error field to indicate the cause of the error.
5. Processing the returned data.


* [Detailed Http Interface](#Detailed Http Interface)
	* [1. Account system](#1Account system)
		* [1.1 Login](#11-Login)
		* [1.2 Direct login without encryption](#12-Direct login without encryption)
		* [1.3 Get account information by address](#13-Get account information by address)
		* [1.4 Get the account balance](#14-Get the account balance)
		* [1.5 Obtaining Account Public Key Based on Address](#15-Obtaining Account Public Key Based on Address)
		* [1.6 Generate public key](#16-Generate public key)
		* [1.7 Get its voting list by address](#17-Get its voting list by address)
		* [1.8 Obtaining Trustee's Procedure Fee](#18-Obtaining Trustee's Procedure Fee)
		* [1.9 Vote for trustees](#19-Vote for trustees)
		* [1.10 Create new accounts](#110-Create new accounts)
		* [1.11 Get the Top 100 Accounts](#111-Get the Top 100 Accounts)
		* [1.12 Get the total number of accounts on the current chain](#112-Get the total number of accounts on the current chain)
		* [1.13 Query deferred to account list](#113-Query deferred to account list)
		* [1.14 Is the account on the chain](#114-Is the account on the chain)
	* [2. Transaction](#2Transaction)
		* [2.1 Access to transaction information](#21-Access to transaction information)
		* [2.2 View the details of the transaction according to the transaction ID](#22-View the details of the transaction according to the transaction ID)
		* [2.3 View details based on the unacknowledged transaction ID](#23-View details based on the unacknowledged transaction ID)
		* [2.4 Get the details of unacknowledged transactions across the network](#24-Get the details of unacknowledged transactions across the network)
		* [2.5 Create transactions and broadcast](#25-Create transactions and broadcast)
	* [3. Block](#3Block)
		* [3.1 Get details of the specified block](#31-Get details of the specified block)
		* [3.2 Obtaining block data](#32-Obtaining block data)
		* [3.3 Obtaining blockchain height](#33-Obtaining blockchain height)
		* [3.4 Obtaining General Transfer Fees](#34-Obtaining General Transfer Fees)
		* [3.5 Achieving milestones](#35-Achieving milestones)
		* [3.6 View individual block rewards](#36-View individual block rewards)
		* [3.7 Get the current supply value of tokens](#37-Get the current supply value of tokens)
		* [3.8 Block chain status](#38-Block chain status)
		* [3.9 Get transaction information for a specified block](#39-Get transaction information for a specified block)
	* [4. Trustee delegates](#4Trustee delegates)
		* [4.1 Total number of Trustees obtained](#41-Total number of Trustees obtained)
		* [4.2 See who voted for the trustee's public key](#42-See who voted for the trustee's public key)
		* [4.3 Get trustee details based on public key or user name](#43-Get trustee details based on public key or user name)
		* [4.4 Get the trustee list](#44-Get the trustee list)
		* [4.5 Obtain transfer fees set by trustees](#45-Obtain transfer fees set by trustees)
		* [4.6 View its blocking based on the public key](#46-View its blocking based on the public key)
		* [4.7 Registered trustee](#47-Registered trustee)
		* [4.8 Trustee opens block](#48-Trustee opens block)
		* [4.9 The trustee closes the block](#49-The trustee closes the block)
		* [4.10 Trustee's Out-of-Block Status View](#410-Trustee's Out-of-Block Status View)
	* [5. Node](#5Node)
		* [5.1 Get all node information for local connections](#51-Get all node information for local connections)
		* [5.2 Get the version number of the node and other information](#52-Get the version number of the node and other information)
		* [5.3 Get the specified IP node information](#53-Get the specified IP node information)
	* [6. Synchronization and Loading](#6Synchronization and Loading)
		* [6.1 View the Load Status of the Local Block Chain](#61-View the Load Status of the Local Block Chain)
		* [6.2 View block synchronization information](#62-View block synchronization information)
	* [7.Secondary  password](#7Secondary  password)
		* [7.1 Set up secondary  password](#71-Set up secondary  password)
		* [7.2 Processing fees for obtaining secondary password settings](#72-Processing fees for obtaining secondary password settings)
	* [8.Multi signature](#8Multi signature)
		* [8.1 Setting up a General Account as a Multi-Signature Account](#81-Setting up a General Account as a Multi-Signature Account)
		* [8.2 Multi-signature of a transaction by a non-transaction initiator](#82-Multi-signature of a transaction by a non-transaction initiator)
		* [8.3 Get details of pending multi-signature transactions based on the public key](#83-Get details of pending multi-signature transactions based on the public key)
		* [8.4 Getting information about multiple signature accounts](#84-Getting information about multiple signature accounts)
	* [9. Lockvote](#9Lockvote)
		* [9.1 Add lockvote](#91-Add lockvote)
		* [9.2 Getting specific lock information](#92-Getting specific lock information)
		* [9.3 Get all lock information](#93-Get all lock information)
		* [9.4 Remove lock](#93-Remove lock)
	* [10. Custom contract interface call](#10Custom contract interface call)
		* [10.1 Custom contract interface call](#101-Custom contract interface call)
		* [10.2 Modify information](#102-Modify information)


### 1. Account system
Account operations are performed through HTTP requests.
Reference [Demo](https://github.com/etm-dev/etm-doc/blob/master/utils/account.js)

#### 1.1 Login
Interface address：/api/accounts/open2/
Request mode：POST
Support format：JSON
Interface notes：Generate public key with JS code in local client according to user password.

Request parameter description:

| param | type      |necessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| publicKey      | String| Y|Account public key|


Return parameter description:

| param   | type         |explain|
| ------------- |:-------------:| :-------------:|
| success      | boolean| Successful? |
| account      | json      | Account information |

Request demo：


	//Secure login (recommended)
	function safeLogin() {
	  let publicKey = etmjs.crypto.getKeys(secret).publicKey; //Generating public keys based on Cryptography
	  return JSON.stringify({
	    publicKey
	  });
	}
	axios.post(loginUrl, safeLogin()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON

	{
		success: true,
	 	account:{
	  		address: 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr',
	    	unconfirmedBalance: 9996006130000000,
	    	balance: 9996006130000000,
	    	publicKey: 'bd93add22ab931a279f0ef741b768796afc3756ec697f76bef4e2f634969294d',
	    	unconfirmedSignature: false,
	    	secondSignature: false,
	    	secondPublicKey: '',
	    	multisignatures: [],
	    	u_multisignatures: [],
	    	lockHeight: 0
		}
		latestBlock: { height: 52372, timestamp: 11457690 },
	 	version: { version: '1.0.0', build: 'development', net: 'localnet' }
	}

#### 1.2 Direct login without encryption
Interface address：/api/accounts/open/
Request mode：POST
Support format：JSON
Interface notes：Pass in the password to the server and query the account information according to the generated address. It is not recommended to use in bad condition of public network.

Request parameter description:


| param   | type      |necessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| secret      | String| Y|Account secret key|

Return parameter description:

| param   | type       |explain|
| ------------- |:-------------:| :-------------:|
| success      | boolean| successful? |
| account      | json      | Account Information |

Request demo:

	//Dangerous login (not recommended)
	function loginNotSafe() {
	  return JSON.stringify({
	    'secret':secret
	  });
	}

	axios.post(login2Url, loginNotSafe()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON

	{
		success: true,
	 	account:
	  	{
	  		address: 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr',
	    	unconfirmedBalance: 9996006130000000,
	    	balance: 9996006130000000,
	    	publicKey: 'bd93add22ab931a279f0ef741b768796afc3756ec697f76bef4e2f634969294d',
	    	unconfirmedSignature: false,
	    	secondSignature: false,
	    	secondPublicKey: '',
	    	multisignatures: [],
	    	u_multisignatures: [],
	    	lockHeight: 0
	  	}
   	}

#### 1.3 Get account information by address
Interface address：/api/accounts
Request mode：POST
Support format：JSON
Interface notes：

| param   | type       |necessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|Account address|

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained?      |
|account| json  |Account details |
| latestBlock | json  |The latest block information of the node    |
|version| json  |Version-related information |

Request demo:

	//get request
	curl -k -X GET http://etm.red:8096/api/accounts?address=A66taz8N3f67dzSULHSUunfPx82J25BirZ

Example for return by JSON

	{
		"success":true,
		"account":
		{
			"address":"A66taz8N3f67dzSULHSUunfPx82J25BirZ",
			"balance":0,
			"publicKey":"",
			"secondSignature":"",
			"secondPublicKey":"",
			"multisignatures":"",
			"u_multisignatures":"",
			"lockHeight":0,
			"effectivity":false,
			"delayAmount":0
		},
		"latestBlock":{
			"height":52674,
			"timestamp":11458596
		},
		"version":{
			"version":"1.0.0",
			"build":"development"
			,"net":"localnet"
		}
	}

#### 1.4 Get the account balance
Interface address: /api/accounts/getBalance
Request mode: GET
Support format: urlencoded

Request parameter description:

| param   | type       |necessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|Account address|

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained?      |
| balance | Integer  |Account balance |
| unconfirmedBalance | Integer  |The sum of unacknowledged and recognized balances is greater than or equal to balance.    |

Request demo:

	//get request
	curl -k -X GET http://etm.red:8096/api/accounts/getBalance?address=AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX

Example for return by JSON

	{
		"success":true,
		"balance":911900000000,
		"unconfirmedBalance":911900000000,
		"delayAmount":0
	}

#### 1.5 Obtaining Account Public Key Based on Address
Interface address: /api/accounts/getPublickey
Request mode: GET
Support format: urlencoded
Request Note: The public key will only be accessed in DB if the account is transferred to another person, otherwise it will not be found.

Request parameter description:

| param   |  type  | necessary |     explain     |
| ------- | :----: | :-------: | :-------------: |
| address | String |     Y     | Account address |

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained?      |
| publicKey | String  |Public key |


Request demo:

	curl -k -X GET http://etm.red:8096/api/accounts/getPublickey?address=AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX

Example for return by JSON

	{
		"success":true,
		"publicKey":"813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961"
	}

#### 1.6 Generate public key
Interface address: /api/accounts/generatePublickey
Request mode: POST
Support format: JSON

Request parameter description:

| param   | type       |necessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| secret      | String| Y|Account secret key|

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained?      |
| publicKey | String  |Public key |


Request demo:

	//POST request
	curl -k -H "Content-Type: application/json" -X POST -d '{"secret":"pepper sleep youth blast vivid circle cross impact zebra neck salmon fee"}' 'http://etm.red:8096/api/accounts/generatePublickey'

Example for return by JSON

	{
		"success":true,
		"publicKey":"813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961"
	}

#### 1.7 Get its voting list by address
Interface address: /api/accounts/delegates
Request mode: GET
Support format: urlencoded
Interface Description: Only after Lock-in vote can information be obtained

Request parameter description:

| param   | type         |necessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|Account address|

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained?      |
| delegates | array  |Voted trustee details array|


Request demo:

	//get request
	curl -k -X GET http://etm.red:8096/api/accounts/delegates?address=AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX

Example for return by JSON

	{
		"success":true,
		"delegates":[
			{
				"username":"etm_002",
				"address":"AMowWYG8ND5Yx13Q5ULyYAF63v1rkmdTCC",
				"publicKey":"a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07",
				"vote":43976220,
				"producedblocks":495,
				"missedblocks":108,
				"rate":2,
				"approval":"0.00",
				"productivity":"82.08"
			}
		]
	}

#### 1.8 Obtaining Trustee's Procedure Fee
Interface address:/api/accounts/delegates/fee
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained?      |
| fee | Integer  |Service Charge|

Request demo:

	curl -k -X GET http://etm.red:8096/api/accounts/delegates/fee

Example for return by JSON

	{
		"success":true,
		"fee":10000000
	}

#### 1.9 Vote for trustees
Interface address: /api/accounts/delegates
Request mode: PUT
Support format: JSON

Request parameter description:

| param   | type         |neccessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| secret      | String| Y|Account serect key|
| publicKey      | String| N|Account public key|
| secondSecret      | String| N|Account secondary password|
| delegates      | Array | Y|Trustee public key array, each public key must be preceded by a + or - sign, representing an increase/cancellation of voting on it|


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transaction | json  |Details of voting transactions|


Request demo:

	//put request
	curl -k -H "Content-Type: application/json" -X PUT -d '{"secret":"pepper sleep youth blast vivid circle cross impact zebra neck salmon fee","publicKey":"813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961","delegates":["+ae28cc3069f4291756168e602a11e5b5d13e546050e3c1d9a09c0311f53a159c"]}' 'http://etm.red:8096/api/accounts/delegates'

Example for return by JSON:

	//TODO  There is a problem with the request.
	{"success":false,"error":"Number of votes  (2 > 1)."}

#### 1.10 Create new accounts
Interface address: /api/accounts/new
Request mode: GET
Support format: urlencoded


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| secret | String  |Account secret key|
| publicKey | String  |Account public key|
| privateKey | String  |Secret key|
| address | String  |Account address|


Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/accounts/new'

Example for return by JSON:

	{
		"success":true,
		"secret":"snap proof ozone exact write waste scrap account lounge manual next across",
		"publicKey":"5e975d4b31c741af773b8b53d54f34f4b4f0ea2ab1bf629cdb5bd692192c9a55",
		"privateKey":"bdf1b1963d5bd26938f15a7ca7d02a6a77054b7d4d353d5618cae1570dbb56485e975d4b31c741af773b8b53d54f34f4b4f0ea2ab1bf629cdb5bd692192c9a55",
		"address":"APAJi5oU5zffU3y5JDufWiKGyMskrdVAT7"
	}

#### 1.11 Get the Top 100 Accounts
Interface address: /api/accounts/top
Request mode: GET
Support format: urlencoded
Request parameter description: If no request parameter is added, the first 100 account information of currency holdings will be returned.


| param | type       |neccessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| limit      | Integer| N|Limit the number of result sets, minimum: 0, maximum: 100|
| offset      | Integer | N|Offset, minimum 0|

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| accounts | json  |Account information tuple, each element containing address, balance, public key|

Request demo:

	//get request
	//return top 5 account information
	curl -k -X GET 'http://etm.red:8096/api/accounts/top?limit=5&offset=0'

Example for return by JSON:

	{
	"success":true,
	"accounts":[
		{
			"address":"A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
			"balance":9996006130000000,
			"publicKey":"bd93add22ab931a279f0ef741b768796afc3756ec697f76bef4e2f634969294d"
		},
		{
			"address":"AGKTTewJzJkteWJ9MVEupgCLhgKELsvU7T",
			"balance":989990000000,
			"publicKey":"88a2440cefa9d8b1204bd7b8f10f724c163c9fd49ecb9f568ce718ca5b91cc07"
		},
		{
			"address":"A8rJnWDTochZuBc9jhMkPCUXsp8sUQpNDk",
			"balance":978970000000,
			"publicKey":"91706b4c02839d154870dfd5cdfd912b6ab53140abba9c7dd54bc3558a43fd77"
		},
		{
			"address":"AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX",
			"balance":901880000000,
			"publicKey":"813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961"
		},
		{
			"address":"A9SKPdKz9ywBUVnBVmevodcsKdxXc3tXMv",
			"balance":828680000000,
			"publicKey":"c460cac02084f544f7eb8506ef368492551805dad6b0031eb091398d37ba0217"
		}]
	}

#### 1.12 Get the total number of accounts on the current chain
Interface address: /api/accounts/count
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |:---              |
|success|boolean  |Has response data been successfully obtained      |
| count | Integer  |Total number of accounts on the current chain|

Request demo:

	//get request
	//return top 5 account information
	curl -k -X GET 'http://etm.red:8096/api/accounts/count'

Example for return by JSON:

	{
		"success":true,
		"count":209
	}

#### 1.13 Query deferred to account list
Interface address: /api/accounts/delayOrders
Request mode: GET
Support format: urlencoded


| param   | type       |neccessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|Query address|
| mode      | Integer | Y|Delayed to account transaction status, 0 - not to account; 1 - already account|

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| latestHeight | Integer  |Final height|
| result | array  |Query results, including sender, recipient, amount, height of arrival|

Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8097/api/accounts/delayOrders?address=A2uWo5F3YTyTbxqbpXKqyXmNJNA4oRrTb8&mode=0'

Example for return by JSON:

	{
		"success": true,
		"result": [{
			"transactionId": "60a945e64cd02ed98d6598d08ceb62dc226e6b7d5495adbbebfde15dbbbac66b",
			"senderId": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
			"recipientId": "A2uWo5F3YTyTbxqbpXKqyXmNJNA4oRrTb8",
			"amount": 55500000000,
			"expired": 185930
		}],
		"latestHeight": 183915
	}

#### 1.14 Is the account on the chain
Interface address:/api/accounts/effectivity
Request mode: GET
Support format: urlencoded


| param   | type       |necessary| explain |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|query address|


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| effectivity | boolean  |Is the account on the chain|


Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8097/api/accounts/effectivity?address=A2uWo5F3YTyTbxqbpXKqyXmNJNA4oRrTb8'

Example for return by JSON:

	{
		"success": true,
		"effectivity": true
	}

### 2. Transaction

#### 2.1 Access to transaction information

Interface address:/api/transactions
Request mode: GET
Support format: urlencode
Interface Description: If the request is not parameterized, all transactions will be obtained throughout the network.

Request parameter description:

|param	|type   |necessary |explain              |
|------ |-----  |---  |----              |
| and | Integer | N   |Value range 0 and 1, default value 0. The following conditions are relation of or for select query and relation of and = 1 when select is relation of and    |
| blockId | String | N   |block id    |
| limit | Integer | N   |Limit the number of result sets, minimum: 0, maximum: 100    |
| type | Integer | N   |Type of transaction: 0:ordinary transfer, 1:setting secondary password, 2:registered trustee, 3:voting, 4:multiple signature, 5:DApp, 6:IN_TRANSFER, 7:OUT_TRANSFER   |
| orderBy | String | N   |sorted by the fields in the table，senderPublicKey:desc    |
| offset | Integer | N   |Offset, minimum 0    |
| senderPublicKey | String | N   |Sender public key    |
| ownerPublicKey | String | N   |Owner public key    |
| ownerAddress | String | N   | Owner address |
| recipientId | String | N   |Receiver address, minimum length: 1    |
| senderId | String | N   |Transmitter Address    |
| amount | Integer | N   |Amount of money    |
| fee | Integer | N   |Service Charge   |
| uia | Integer | N   |Whether uia, 0: No, 1: Yes   |
| currency | String | N   |Asset name    |

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactions |array  |List of multiple transaction details through JSON |
| count |int  |Total number of transactions obtained |


Request demo:


	curl -k -H "Content-Type: application/json" -X http://etm.red:8096/api/transactions?limit=2

Example for return by JSON:

	{
		"success":true,
		"transactions":
			[{
				"id":"f0af7052a760edb104c118d1f6950f597f50a314b872508d9bc7e16f7062219c",
				"height":1,
				"blockId":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
				"type":0,
				"timestamp":0,
				"senderPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
				"senderId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
				"recipientId":"A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
				"amount":10000000000000000,
				"fee":0,
				"signature":"4d7730f81a5ae2679530153d91f6a15fcbcac00469fa4210098d2d2c3fe87d885ad9348ee9fc7680203e1035d91230089c9287056860a01df98ec84a600f180f",
				"signSignature":"",
				"signatures":null,
				"confirmations":252988,
				"args":null,
				"message":null,
				"asset":{}},
			{
				"id":"e0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac988055",
				"height":1,
				"blockId":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
				"type":0,
				"timestamp":0,
				"senderPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
				"senderId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
				"recipientId":"ALujNVEVnarsLG2unJmUEshTqmQCFCmoD2",
				"amount":20000000000,
				"fee":0,
				"signature":"b7bf507ca4b693e172d0d1d63a3fe3a4562a0544f55ff436dcd18465a9653f63fe71ee8e8c8169a494cec651172e40787391598cda7ce3d42cff85bd2527be03",
				"signSignature":"",
				"signatures":null,
				"confirmations":252988,
				"args":null,
				"message":null,
				"asset":{}
			}],
		"count":468
	}

#### 2.2 View the details of the transaction according to the transaction ID
Interface address:/api/transactions/get
Request mode: GET
Support format: urlencode

Request parameter description:

|param	|type   |necessary |explain              |
|------ |-----  |---  |----              |
| Id | String | Y   |Unrecognized transaction ID   |


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactions | json  |Unconfirmed transaction details|

Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/transactions/unconfirmed/get?id=0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac9880556'

Example for return by JSON:

	{
		"success":true,
		"transaction":
			{
				"id":"0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac9880556",
				"height":1,
				"blockId":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
				"type":0,
				"timestamp":0,
				"senderPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
				"senderId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
				"recipientId":"ALujNVEVnarsLG2unJmUEshTqmQCFCmoD2",
				"amount":20000000000,
				"fee":0,
				"signature":"b7bf507ca4b693e172d0d1d63a3fe3a4562a0544f55ff436dcd18465a9653f63fe71ee8e8c8169a494cec651172e40787391598cda7ce3d42cff85bd2527be03",
				"signSignature":"",
				"signatures":null,
				"confirmations":253407,
				"args":null,
				"message":null,
				"asset":{}
			}
	}

#### 2.3 View details based on the unacknowledged transaction ID
Interface address: /api/transactions/unconfirmed/get
Request mode: GET
Support format: urlencoded

Request parameter description:

|param	|type   |necessary |explain              |
|------ |-----  |---  |----              |
| Id | String | Y   |Unrecognized transaction ID   |


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactions | json  |Unconfirmed transaction details|



Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/transactions/unconfirmed/get?id=0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac9880556'

Example for return by JSON:

	{
		"success":true,
		"transaction":
			{
				"id":"0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac9880556",
				"height":1,
				"blockId":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
				"type":0,
				"timestamp":0,
				"senderPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
				"senderId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
				"recipientId":"ALujNVEVnarsLG2unJmUEshTqmQCFCmoD2",
				"amount":20000000000,
				"fee":0,
				"signature":"b7bf507ca4b693e172d0d1d63a3fe3a4562a0544f55ff436dcd18465a9653f63fe71ee8e8c8169a494cec651172e40787391598cda7ce3d42cff85bd2527be03",
				"signSignature":"",
				"signatures":null,
				"confirmations":253407,
				"args":null,
				"message":null,
				"asset":{}
			}
	}

#### 2.4 Get the details of unacknowledged transactions across the network
Interface address:/api/transactions/unconfirmed
Request mode: GET
Support format: urlencoded
Interface Description: If no parameters are added, all unacknowledged transactions will be obtained throughout the network.

Request parameter description:

|param	|type   |necessary |explain              |
|------ |-----  |---  |----              |
| senderPublicKey | String | N   |Sender public key  |
| address | String | N   | address |


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactions | array  |Unconfirmed Transaction List|

Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/transactions/unconfirmed'

Example for return by JSON:

	// There are no unacknowledged transactions on the whole network
	{
		"success":true,
		"transactions":[]
	}

#### 2.5 Create transactions and broadcast
Interface address:/api/transactions
Request mode: PUT
Support format: JSON

Request parameter description:

|param	|type   |necessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   |Account password  |
| amount | Integer | Y   | Amount, minimum: 1, maximum: 10000000000000 |
| recipientId | String | Y   | Receiver address, minimum length: 1 |
| publicKey | String | N   | Sender public key |
| secondSecret | String | N   | Sender secondary password, minimum length 1, maximum length: 100 |
| multisigAccountPublicKey | String | N   | Multiple Signature Account Public Key |


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactionId | String  |Transaction ID|

Request demo:

	// This method is not safe, you can check. / issueAssert. JS transferETM ()
	function createTransaction() {
	  return JSON.stringify({
	    'secret':secret,
	    'amount':55500000000,
	    'recipientId':'A66taz8N3f67dzSULHSUunfPx82J25BirZ',
	  });
	}

	axios.put(url, createTransaction()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON:

	//The request succeeded and the transaction ID was returned
	{
		success: true,
		transactionId: '00e7849414cf86fb922a239b38d82022e37cd4caa59bb6f3c4c6d5abbcec9794'
	}
	// Use wallet to query the balance of accepting address account
	Ordinary transfer	A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr	A66taz8N3f67dzSULHSUunfPx82J25BirZ	2019-02-25 14:40:02		555

#### 2.6 Delayed arrival transactions
Interface address: /api/transactions/delay
Request mode: PUT
Support format: JSON

Request parameter description:

|param	|type   |necessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   |Account password  |
| amount | Integer | Y   | Amount, minimum: 1, maximum: 10000000000000 |
| recipientId | String | Y   | Receiver address, minimum length: 1 |
| publicKey | String | N   | Sender public key |
| secondSecret | String | N   | Sender secondary password, minimum length 1, maximum length: 100 |
| multisigAccountPublicKey | String | N   | Multiple Signature Account Public Key |
| message | String | N   | message |
| args | array | Y  | Delay time parameter, the number of array elements is 1, indicating the specified time of arrival (UTC) |


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactionId | String  |Transaction ID|

Request demo:

	// This approach is unsafe
	function createTransaction() {
	  return JSON.stringify({
	    'secret':secret,
	    'amount':55500000000,
	    'recipientId':'A2uWo5F3YTyTbxqbpXKqyXmNJNA4oRrTb8',
	    'args':['1552983692000'] //时间戳
	  });
	}

	axios.put(url, createTransaction()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON:

	// The request succeeded and the transaction ID was returned
	{
		success: true,
		transactionId: '60a945e64cd02ed98d6598d08ceb62dc226e6b7d5495adbbebfde15dbbbac66b'
	}

### 3. Block

#### 3.1 Get details of the specified block
Interface address: /api/blocks/get
Request mode: GET
Support format: urlencoded

Request parameter description:

|param	|type   |necessary |explain              |
|------ |-----  |---  |----              |
| id | String | Parameter 3 select 1 |Block ID  |
| height | Integer | Parameter 3 select 1 | Block height |
| hash | String | Parameter 3 select 1 | Block hash |


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| block | json  |Block details|



Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks/get?height=1'

Example for return by JSON:

	{
		"success":true,
		"block":
		{
			"id":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
			"version":0,
			"timestamp":0,
			"height":1,
			"previousBlock":null,
			"numberOfTransactions":405,
			"totalAmount":10000000000000000,
			"totalFee":0,
			"reward":0,
			"payloadLength":58419,
			"payloadHash":"855b2b1b71f9c7ef07503587ab4be73904d67615f26840f88dcb7a625ccea593",
			"generatorPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
			"blockSignature":"6e7b7eaefbee6b04d7bfea9680a0dcf22025d60a6dacb8d49370489a947327b164e8c0530764dd125549396c38958d2c1fe0fb5fea5e5dd259d4390f76d10c0a",
			"confirmations":255755,
			"generatorId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
			"totalForged":0
		}
	}

#### 3.2 Obtaining block data
Interface address: /api/blocks
Request mode: GET
Support format: urlencoded
Interface Description: Get the details of the whole network block without parameters

Request parameter description:

|param	|type   |necessary |explain              |
|------ |-----  |---  |----              |
| limit | Integer | N   | Limit the number of result sets, minimum: 0, maximum: 100 |
| orderBy | String | N   | Sort by the fields in the table, such as height: desc |
| offset | Integer | N   | Offset, minimum 0 |
| generatorPublicKey | String | N   | Public Key of Block Generator |
| totalAmount | Integer | N   | Total trading volume, minimum: 0, maximum: 10000000000000 |
| totalFee | Integer | N   | Total handling fee, minimum: 0, maximum: 10000000000000 |
| reward | Integer | N   | Award amount, minimum value: 0 |
| previousBlock | String | N   | Last block |
| height | Integer | N   | Block height |


Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| blocks | array  |An array of block details JSON strings|
| count | Integer  |Block height|

Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks?limit=2&offset=0&orderBy=height:desc'

Example for return by JSON:

	{
		"success": true,
		"blocks": [{
			"id": "72b9c4af34e63e93b854e9d94b41ab5e7a67e3d3af312a248e7c223f7dc437aa",
			"version": 0,
			"timestamp": 11732653,
			"height": 256220,
			"previousBlock": "e6eb62c1b6c0296dbe769bd99f7a422e5544d410324e7fb62bcab27df80f6859",
			"numberOfTransactions": 0,
			"totalAmount": 0,
			"totalFee": 0,
			"reward": 600000000,
			"payloadLength": 0,
			"payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
			"generatorPublicKey": "371be464bb1e4477f988bc5f5a81796ba614eea542a4a87331f0694d9b68ec98",
			"blockSignature": "6748006bab77779af5f9c90123a09240ae6cc64a87c929a83ade2e473073a3bc0832a2bec7cc7e787f6f7823dc40f7ccb95ac19d299d383b99a117ffd80ee70e",
			"confirmations": 1,
			"generatorId": "ACPzoaPra4TiehLcfkFjBaXryukKoJk8o7",
			"totalForged": 600000000
		}, {
			"id": "e6eb62c1b6c0296dbe769bd99f7a422e5544d410324e7fb62bcab27df80f6859",
			"version": 0,
			"timestamp": 11732652,
			"height": 256219,
			"previousBlock": "0d0fab09ad1b4c358972aa1408207ddca495841fdcd2906e497e8b15d2b40733",
			"numberOfTransactions": 0,
			"totalAmount": 0,
			"totalFee": 0,
			"reward": 600000000,
			"payloadLength": 0,
			"payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
			"generatorPublicKey": "8fe285c30fba9c0c2b335da357940d2f9f37099391224b0501be8f0111cc2a86",
			"blockSignature": "60ab5703508b0781af94ae243b896350d0f7839559d1fe343da1450c92908a607fdb2600e77a6759bda95343e5bfb3cca47279159951d1d1ce1b115ac1a2f206",
			"confirmations": 2,
			"generatorId": "ACtpsr2WiTZSvhtinfYgy63AoNiRBSxWVP",
			"totalForged": 600000000
		}],
		"count": 256220
	}

#### 3.3 Obtaining blockchain height
Interface address: /api/blocks/getHeight
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| height | Integer  |Block height|

Request demo:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks/getheight'

Example for return by JSON:

	{
		"success": true,
		"height": 256414
	}

#### 3.4 Obtaining General Transfer Fees
Interface address: /api/blocks/getFee
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| fee | Integer  |Transaction charges|

Request example:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks/getfee'

Example for return by JSON:

	{
		"success": true,
		"fee": 10000000
	}

#### 3.5 Achieving milestones
Interface address:/api/blocks/getMilestone
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| milestone | Integer  |milestone|

Request example:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks/getMilestone'

Example for return by JSON:

	{
		"success": true,
		"milestone": 0
	}

#### 3.6 View individual block rewards
Interface address:/api/blocks/getReward
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| reward | Integer  |Block awards, including trustee awards and handling fees|

Request example:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks/getReward'

Example for return by JSON:

	{
		"success": true,
		"reward": 600000000
	}

#### 3.7 Get the current supply value of tokens
Interface address:/api/blocks/getSupply
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| supply | Integer  |Net-wide tokens|

Request example:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks/getSupply'

Example for return by JSON:

	{
		"success": true,
		"supply": 10153984000000000
	}

#### 3.8 Block chain status
Interface address:/api/blocks/getStatus
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Successful acquisition of response data      |
| height | Integer  |Block height|
| fee | Integer  |Transaction charges|
| milestone | Integer  |milestone|
| reward | Integer  |reward|
| supply | Integer  |Net-wide tokens|

Request example:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks/getStatus'

Example for return by JSON:

	{
		"success": true,
		"height": 256851,
		"fee": 10000000,
		"milestone": 0,
		"reward": 600000000,
		"supply": 10154105200000000
	}

#### 3.9 Get transaction information for a specified block
Interface address:/api/blocks/full
Request mode: GET
Support format: urlencoded

Request parameter description:

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| id | String | 2 choose 1 | Block id |
| height | Integer | 2 choose 1 | Block height |

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| block | json  |Block data|

Request example:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/blocks/full?height=1'

Example for return by JSON:

	{
		"success": true,
		"block": {
			"id": "b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
			"version": 0,
			"timestamp": 0,
			"height": 1,
			"previousBlock": "",
			"numberOfTransactions": 405,
			"totalAmount": 10000000000000000,
			"totalFee": 0,
			"reward": 0,
			"payloadLength": 58419,
			"payloadHash": "855b2b1b71f9c7ef07503587ab4be73904d67615f26840f88dcb7a625ccea593",
			"generatorPublicKey": "e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
			"blockSignature": "6e7b7eaefbee6b04d7bfea9680a0dcf22025d60a6dacb8d49370489a947327b164e8c0530764dd125549396c38958d2c1fe0fb5fea5e5dd259d4390f76d10c0a",
			"generatorId": "ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
			"totalForged": 0,
			"generationSignature": "0000000000000000000000000000000000000000000000000000000000000000",
			"transactions": [{
				"id": "f0af7052a760edb104c118d1f6950f597f50a314b872508d9bc7e16f7062219c",
				"height": 1,
				...

### 4. Trustee delegates
#### 4.1 Total number of Trustees obtained
Interface address:/api/delegates/count
Request mode: GET
Support format: urlencoded

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| count | Integer  |Total number of Trustees|

Request example:

	//get request
	curl -k -X GET 'http://etm.red:8096/api/delegates/count'

Example for return by JSON:

	{
		"success":true,
		"count":101
	}

#### 4.2 See who voted for the trustee's public key
Interface address:/api/delegates/voters
Request mode: GET
Support format: urlencoded

Request parameter description:

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| publicKey | String | Y   | Trustee public key |

Return parameter description:

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| accounts | array  |An array of account JSON strings|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/delegates/voters?publicKey=a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'

Example for return by JSON:：

	{
		"success": true,
		"accounts": [{
			"username": "",
			"address": "AArvV1RBaWW4AZcwas15wUA3DQiBoKxZk7",
			"publicKey": "76cab33bb890ec3c59151e16b2e78a4339c4fdf4bf7f9d9f921ec7c2f1c112bf",
			"balance": 101151812,
			"weight": 66.5551839464883
		}, {
			"username": "",
			"address": "AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX",
			"publicKey": "813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961",
			"balance": 421780000000,
			"weight": 33.44481605351171
		}]
	}

#### 4.3 Get trustee details based on public key or user name
Interface address：/api/delegates/get
Request mode：GET
Support format：urlencoded
Interface description：Get trustee details based on public key or user name
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| publicKey | String | 2 choose 1 | Trustee public key |
| username | String | 2 choose 1 | Trustee username |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| delegate | json  |Client details|

Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/delegates/get?publicKey=a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'
	curl -k -X GET 'http://etm.red:8096/api/delegates/get?username=etm_002'

Example for return by JSON:：

	// The result of return is consistent.
	{
		"success": true,
		"delegate": {
			"username": "etm_002",
			"isDelegate": 1,
			"address": "AMowWYG8ND5Yx13Q5ULyYAF63v1rkmdTCC",
			"publicKey": "a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07",
			"balance": 1544697425722,
			"vote": 66870772,
			"producedblocks": 2574,
			"missedblocks": 178,
			"fees": 897425722,
			"rewards": 1543800000000,
			"rate": 1,
			"approval": 1.66,
			"productivity": 93.53,
			"forged": "1544697425722"
		}
	}

#### 4.4 Get the trustee list
Interface address：/api/delegates
Request mode：GET
Support format：urlencoded
Interface description：If no param is added, the trustee list will be returned to the whole network.

Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| address | String | N   | Trustee's address |
| limit | Integer | N   | Limit the number of data sets returned as a result |
| offset | Integer | N   | Offset, minimum: 0 |
| orderBy | String | N   | Sort field: Sort rule, such as desc |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| delegates | array  |Trustee Details List|



Request example：

	//get request
	//Take out the top two in descending order according to the voting rate
	curl -k -X GET 'http://etm.red:8096/api/delegates?orderby=approval:desc&limit=2'

Example for return by JSON:：

	{
		"success": true,
		"delegates": [{
			"username": "etm_002",
			"isDelegate": 1,
			"address": "AMowWYG8ND5Yx13Q5ULyYAF63v1rkmdTCC",
			"publicKey": "a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07",
			"balance": 1545297425722,
			"vote": 66870772,
			"producedblocks": 2575,
			"missedblocks": 178,
			"fees": 897425722,
			"rewards": 1544400000000,
			"rate": 1,
			"approval": 1.66,
			"productivity": 93.53,
			"forged": "1545297425722"
		}, {
			"username": "etm_001",
			"isDelegate": 1,
			"address": "A9gkb1WnCEG93rkqieRdnuzjjdkVcViSCj",
			"publicKey": "ae28cc3069f4291756168e602a11e5b5d13e546050e3c1d9a09c0311f53a159c",
			"balance": 1569298019864,
			"vote": 49460151,
			"producedblocks": 2615,
			"missedblocks": 168,
			"fees": 898019864,
			"rewards": 1568400000000,
			"rate": 2,
			"approval": 1.23,
			"productivity": 93.96,
			"forged": "1569298019864"
		}],
		"totalCount": 101
	}

#### 4.5 Obtain transfer fees set by trustees
Interface address：/api/delegates/fee
Request mode：GET
Support format：urlencoded
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| publicKey | String | Y   | Trustee public key |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| fee | Integer  |Transfer fee|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/delegates/fee?publicKey= a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'

Example for return by JSON:：

	{
		"success":true,
		"fee":10000000
	}

#### 4.6 View its blocking based on the public key
Interface address：/api/delegates/forging/getForgedByAccount
Request mode：GET
Support format：urlencoded
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| generatorPublicKey | String | Y   | Public Key of Block Generator |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| fees | Integer  |Procedure fee charged|
| rewards | Integer  |Awards Awarded|
| forged | Integer  |Total Award for Outgoing Blocks|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/delegates/forging/getForgedByAccount?generatorPublicKey=a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'

Example for return by JSON:：

	{
		"success": true,
		"fees": 897425722,
		"rewards": 1546800000000,
		"forged": 1547697425722
	}

#### 4.7 Registered trustee
Interface address：/api/delegates
Request mode：PUT
Support format：JSON
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   | Account password |
| publicKey | String | N   | Public key |
| secondSecret | String | N   | Account Secondary Password, Minimum Length: 1, Maximum Length: 100 |
| username | String | N   | Trustee's name |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transaction | json  |Details of registered trustee transactions|



Request example：

	//Registered trustee
	function registerDelegate() {
	  return JSON.stringify({
	    'secret':secret,
	    'username':'delegate_001'
	  });
	}

	axios.put(url, registerDelegate()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON:：

	{
		success: true,
		transaction: {
			type: 2,
			amount: 100000000000,
			senderPublicKey: 'bd93add22ab931a279f0ef741b768796afc3756ec697f76bef4e2f634969294d',
			requesterPublicKey: null,
			timestamp: 11735247,
			asset: [Object],
			recipientId: 'A4MFB3MaPd355ug19GYPMSakCAWKbLjDTb',
			signature: '3ba7eaa5b2996e21c5dbb5fea4b2cb629cb7f45939d74cf89acf740afb72e1db07d8d7b85a2438c047ef25c19e8e5848bc64147628cc3185df6569f0f2422d05',
			id: '544fb942393255e025c6a354333f6c62e6fefe08de364472dc502f2324900129',
			fee: 10000000,
			senderId: 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr'
		}
	}
	//查看钱包受托人
	102	delegate_001	A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr 0	0    0

#### 4.8 Trustee opens block
Interface address：/api/delegates/forging/enable
Request mode：POST
Support format：JSON
Request instructions：url must be the trustee's server
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   | Account password |
| publicKey | String | N   | Trustee public key |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| address | String  |Trustee's address|



Request example：

	//POST request
	//Please run this code on the node server
	curl -k -H "Content-Type: application/json" -X POST -d '{"secret":"race forget pause shoe trick first abuse insane hope budget river enough"}' 'http://localhost:8096/api/delegates/forging/enable'

Example for return by JSON:：

	{
		"success": true,
		"address": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr"
	}

#### 4.9 The trustee closes the block
Interface address：/api/delegates/forging/disable
Request mode：POST
Support format：JSON
Request description: url must be the trustee's server

Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   | Account password |
| publicKey | String | N   | Trustee public key |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| address | String  |Trustee's address|



Request example：

	//post request
	curl -k -H "Content-Type: application/json" -X POST -d '{"secret":"race forget pause shoe trick first abuse insane hope budget river enough"}' 'http://localhost:8096/api/delegates/forging/disable'

Example for return by JSON:：

	{
		"success": true,
		"address": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr"
	}

#### 4.10 Trustee's Out-of-Block Status View
Interface address：/api/delegates/forging/status
Request mode：GET
Support format：urlencoded
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| publicKey | String | Y   | Trustee public key |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| fee | Integer  |Transfer fee|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/delegates/forging/status?publicKey=a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'

Example for return by JSON:：

	{
		"success":true,
		"enabled":true
	}

### 5. Node
#### 5.1 Get all node information for local connections
Interface address：/api/peers
Request mode：GET
Support format：urlencoded
Interface description：The display node is only a node connected to the local machine, not all nodes in the whole network.
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| state | Integer | N   | Node state, 0:, 1:, 2:, 3://TODO |
| os | String | N   | Kernel version |
| version | String | N   | ETM version |
| limit | Integer | N   | Limit the number of result sets, minimum: 0, maximum: 100 |
| orderBy | String | N   | Sort |
| offset | Integer | N   | Offset |
| port | Integer | N   | Port |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| peers | array  |Array of node information (JSON)|
| totalCount | Integer  |Number of currently running nodes|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/peers?limit=1'

Example for return by JSON:：

	// Because it runs on a single node, there are no peers
	{
		"success": true,
		"count": 0,
		"peers": []
	}

#### 5.2 Get the version number of the node and other information
Interface address：/api/peers/version
Request mode：GET
Support format：urlencoded

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| version | String  |Version|
| build | timestamp  |Construction time|
| net | String  |Main Chain or Test Chain|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/peers/version'

Example for return by JSON:：

	{
		"success": true,
		"version": "1.0.0",
		"build": "development",
		"net": "localnet"
	}

#### 5.3 Get the specified IP node information
Interface address：/api/peers/get
Request mode：GET
Support format：urlencoded
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| ip | String | Y   | IP of the node to be queried |
| port | Integer | Y   | The port of the node to be queried, 1-65535 |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| peer | json  |Node Data Return|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/peers/get?ip=47.96.68.153&port=8096'

Example for return by JSON:：

	{
		"success":true
	}

### 6. Synchronization and Loading
#### 6.1 View the Load Status of the Local Block Chain
Interface address：/api/loader/status
Request mode：GET
Support format：urlencoded


Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| loaded | boolean  |Whether to load|
| blocksCount | Integer  |//TODO|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/loader/status'

Example for return by JSON:：

	{
		"success": true,
		"loaded": true,
		"blocksCount": 0
	}
#### 6.2 View block synchronization information
Interface address：/api/loader/status/sync
Request mode：GET
Support format：urlencoded


Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| height | Integer  |Block height|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/loader/status/sync'

Example for return by JSON:：

	{
		"success": true,
		"syncing": false,
		"blocks": 0,
		"height": 327158
	}

### 7. Secondary  password
#### 7.1 Set up secondary  password
Interface address：/api/signatures
Request mode：PUT
Support format：JSON
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   | Account password |
| publicKey | String | N   | public key |
| secondSecret | String | Y   | Account Secondary Password, Minimum Length: 1, Maximum Length: 100 |
| multisigAccountPublicKey | String | N   | Multiple Signature Account Public Key |


Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transaction | json  |Transaction details generated by setting a secondary password|



Request example：

	//Main chain
	let url = 'http://etm.red:8096/api/signatures'
	//Side chain

	//Accounts with secondary passwords
	let secret = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky';

	//Set up a secondary password
	function setSignature() {
	  return JSON.stringify({
	    'secret':secret,
	    'secondSecret':'test001'
	  });
	}

	axios.put(url, setSignature()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON:：

	{
		success: true,
		transaction: {
			type: 1,//Set the transaction type of the secondary password to 1
			amount: 0,
			senderPublicKey: '88a2440cefa9d8b1204bd7b8f10f724c163c9fd49ecb9f568ce718ca5b91cc07',
			requesterPublicKey: null,
			timestamp: 11804694,
			asset: [Object],
			recipientId: null,
			signature: '11c3e36df365d07e422a9c288f9dc993db8d2d13fb4caef45dbd7598dad748332194bbeff0d255ea7e9944b9ebfd65259ec94dcfab129a9c43710d4558e54207',
			id: '7674ad2bcfe4a569f13fd679a244c0116be804817905f47a76338149fe2f0fe3',
			fee: 500000000,//Procedure fee for setting secondary password is 5 ETM
			senderId: 'AGKTTewJzJkteWJ9MVEupgCLhgKELsvU7T'
		}
	}
#### 7.2 Processing fees for obtaining secondary password settings
Interface address：/api/signatures/fee
Request mode：GET
Support format：urlencoded


Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| fee | Integer  |fee|



Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/signatures/fee'

Example for return by JSON:：

	{
		"success": true,
		"fee": 500000000 //5ETM
	}

### 8.Multi signature
#### 8.1 Setting up a General Account as a Multi-Signature Account
Interface address：/api/multisignatures
Request mode：PUT
Support format：JSON
Interface description：The return result is only to generate the transaction id, and the account can be successfully set up as a multi-signature account only after other people sign it. After registering a multi-signature account, any transfer requires multiple signatures. The minimum number of signatures is min (including the initiator himself)

Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   | Account password |
| publicKey | String | N   | public key |
| secondSecret | String | N   | Account Secondary Password, Minimum Length: 1, Maximum Length: 100 |
| min | Integer | Y   | Any transfer of a multi-signature transaction account requires the minimum number of signatures from more than one person. If a multi-signature account operation is registered, this value is not valid (at this time, all signatures are required). Minimum: 2, maximum: 16, which needs to be less than keysgroup. length + 1 |
| lifetime | Integer | Y   | Maximum hang-up time for multi-signature transactions, minimum: 1, maximum: 24, temporarily not in effect//TODO |
| keysgroup | array | Y   | An array of public keys of other signers, each of which is preceded by a + or - sign, representing the addition/deletion of multiple signature accounts. The minimum length of the array is 1 and the maximum length of the array is 10. |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactionId | String  |ID of multi-signature transaction|



Request example：

	//Step 1: Setting up a multi-signature password
	function setMultisignature() {
	  return JSON.stringify({
	    'secret':secret,
	    'min':2,
	    'lifetime':1,
	    'keysgroup':['+813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961']
	  });
	}

	axios.put(url, setMultisignature()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON:：

	{
		success: true,
		// The return result is only to generate the transaction id, and the account can be successfully set up as a multi-signature account only after other people sign it.
		transactionId: '355ce9527e074e661b4b7cbb01496d5574693c9ead25b904484e0c83564c5646'
	   }
#### 8.2 Multi-signature of a transaction by a non-transaction initiator
Interface address：/api/multisignatures/sign
Request mode：POST
Support format：JSON
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   | Account password |
| secondSecret | String | N   | Two level password |
| publicKey | String | N   | public key |
| transactionId | String | Y   | Transaction ID (see 8.1 Return results) |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactionId | String  |Multiple signature transaction ID|

Request example：

	// Step 2: Non-transaction sponsors sign multi-signature transactions
	function signatureMu() {
	  return JSON.stringify({
	    'secret':'pepper sleep youth blast vivid circle cross impact zebra neck salmon fee',
	    'transactionId':'355ce9527e074e661b4b7cbb01496d5574693c9ead25b904484e0c83564c5646'
	  });
	}

Example for return by JSON:：

	{
		success: false,
		error: 'Transaction not found'
	}

#### 8.3 Get details of pending multi-signature transactions based on the public key
Interface address：/api/multisignatures/pending
Request mode：GET
Support format：urlencoded
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| publicKey | String | Y  | public key |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactions | array  |An array of transaction JSON|

Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/multisignatures/pending?publicKey=911e58e289cf237d08b71e296ba766b1c6fcf9816a415ff38846043135476aaa'

Example for return by JSON:：

	{
		"success":true,
		"transactions":[]
	}

#### 8.4 Getting information about multiple signature accounts
Interface address：/api/multisignatures/accounts
Request mode：GET
Support format：urlencoded
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| publicKey | String | Y  | Public key |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| accounts | array  |Multiple Signature Account Details|

Request example：

	//get request
	curl -k -X GET 'http://etm.red:8096/api/multisignatures/accounts?publicKey=911e58e289cf237d08b71e296ba766b1c6fcf9816a415ff38846043135476aaa'

Example for return by JSON:：

	{
		"success":false,
		"error":"TypeError: Cannot read property 'split' of null"
	}

### 9. Lockvote

#### 9.1 Add lockvote

Interface address：/api/lockvote/put
Request mode：PUT
Support format：JSON
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   | Account password |
| publicKey | String | N   | Public key |
| secondSecret | String | N   | Account Secondary Password, Minimum Length: 1, Maximum Length: 100 |
| multisigAccountPublicKey | String | N   | Multi-signature public key |
| args | array | Y   | The array contains the lock volume, such as: [1000] |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactionId | String  |Multiple signature transaction ID|



Request example：

	let url = 'http://etm.red:8097/api/lockvote/'
	let secret = 'race forget pause shoe trick first abuse insane hope budget river enough';

	// Create a transaction
	// This method is not safe, you can check ./issueAssert.js transferETM ()
	function createTransaction() {
	  return JSON.stringify({
	    'secret':secret,
	    'args':["100000000"],
	  });
	}

	axios.put(url, createTransaction()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON:：

	{
		success: true,
	  	transactionId: '66cf7e7fa6c7bcc8f69ca76d05e341f02643732a7e48bbd1b308e90047ae2de8'
	}

#### 9.2 Getting specific lock information
Interface address：/api/lockvote/get
Request mode：GET
Support format：urlencoded
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| id | String | Y  | Transaction ID |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| id | String  |Transaction ID|
| blockId | String  |block ID|
| senderId | String  |Sender ID|
| timestamp | Integer  |Transaction creation time|
| asset | json  |Details of Lock-in Trading|

Request example：

	//get request
	http://etm.red:8097/api/lockvote/get?id=66cf7e7fa6c7bcc8f69ca76d05e341f02643732a7e48bbd1b308e90047ae2de8

Example for return by JSON:：

	{
		"success": true,
		"id": "66cf7e7fa6c7bcc8f69ca76d05e341f02643732a7e48bbd1b308e90047ae2de8",
		"blockId": "1e8ef5d16293be10720f3c04efe1d2c8c24c0bbc31ae2857c2fb40d5add0bf84",
		"timestamp": 13634034,
		"senderId": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
		"asset": {
			"state": 1,
			"lockAmount": 100000000,
			"currentHeight": 183712,
			"originHeight": 183712,
			"address": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
			"factor": 0,
			"numOfVotes": 0
		}
	}

#### 9.3 Get all lock information
Interface address：/api/lockvote/all
Request mode：GET
Support format：urlencoded
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| address | String | Y  | The address of the designated initiator of the transaction |
| state | Integer | N  | 1 denotes the lockvotebeing locked and 0 denotes the lockvotebeing unlocked. |
| limit | Integer | N  | The maximum is 100. |
| offset | Integer | N  | Offset |
| orderByHeight | Integer | N  | Degree ranking - 1 means ascending ranking, 0 means non-permutation, and - 1 means descending ranking. |
| orderByAmount | Integer | N  |Lock volume ranking - 1 means ascending ranking, 0 means non-permutation, and - 1 means descending ranking. |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| trs | array  |All Lock Trading Information|


Request example：

	//get request
	http://etm.red:8097/api/lockvote/all?address=A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr

Example for return by JSON:：

	{
		"success": true,
		"trs": [{
			"id": "79810571ae6ef5bdbf7feca9030732efe8932f78ed03d8f018edd21acd2f8ffb",
			"blockId": "9e8d940ab55ee1f67a78cd856083c130daac020a2bbdfcdb6ed3ffac20a1372e",
			"timestamp": 13633238,
			"senderId": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
			"asset": {
				"state": 1,
				"lockAmount": 111100000000,
				"currentHeight": 183569,
				"originHeight": 183569,
				"address": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
				"factor": 0,
				"numOfVotes": 0
			}
		}, {
			"id": "66cf7e7fa6c7bcc8f69ca76d05e341f02643732a7e48bbd1b308e90047ae2de8",
			"blockId": "1e8ef5d16293be10720f3c04efe1d2c8c24c0bbc31ae2857c2fb40d5add0bf84",
			"timestamp": 13634034,
			"senderId": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
			"asset": {
				"state": 1,
				"lockAmount": 100000000,
				"currentHeight": 183712,
				"originHeight": 183712,
				"address": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
				"factor": 0,
				"numOfVotes": 0
			}
		}],
		"count": 2
	}

#### 9.4 Remove lock
Interface address：/api/lockvote/remove
Request mode：PUT
Support format：JSON
Request parameter description：

|param	|type   |neccessary |explain              |
|------ |-----  |---  |----              |
| secret | String | Y   | Account password |
| publicKey | String | N   | public key |
| secondSecret | String | N   | Account Secondary Password, Minimum Length: 1, Maximum Length: 100 |
| multisigAccountPublicKey | String | N   | Multi-signature public key |
| args | array | Y   | Contains suocang trading ID list, such as: [id1, Id2, id3] |

Return parameter description：

|name	|type   |explain              |
|------ |-----  |----              |
|success|boolean  |Has response data been successfully obtained      |
| transactionId | String  |Multiple signature transaction ID|



Request example：

	let url = 'http://etm.red:8097/api/lockvote/remove'
	let secret = 'race forget pause shoe trick first abuse insane hope budget river enough';

	// Create a transaction
	// This method is not safe, you can check./issueAssert.js transferETM ()
	function createTransaction() {
	  return JSON.stringify({
	    'secret':secret,
	    'args':["66cf7e7fa6c7bcc8f69ca76d05e341f02643732a7e48bbd1b308e90047ae2de8"],
	  });
	}

	axios.put(url, createTransaction()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON:：

	{
		success: true,
		transactionId: '0a27ae10e1b8c55d2d75b0fed093d0466598e6b99243c113f33ff6d5473b4654'
	}

### 10. Custom contract interface call
Reference [secretDapp](https://github.com/etm-dev/secretDapp)，in this example, a variety of contracts are defined, and contracts can be requested in different ways depending on the interface functionality.

#### 10.1 Get information
Interface address：/api/dapps/[dappID]/[router]/[params]
Request mode：GET
Support format：urlencoded
Interface description：The information stored in the contract can be invoked in this way instead of adding, deleting or changing the operation.
Request parameter description：`param` and return values need to be customized, see the example

Interface definition [demo](https://github.com/etm-dev/secretDapp/blob/master/interface/secret.js)：

	//...
	//Get encrypted information
	app.route.get("/msg/:address", async req => {
	  let {
	    page,
	    count
	  } = req.query
	  page = page || 1
	  count = count || 10
	  let address = req.params.address
	  if (!etmjs.crypto.isAddress(address)) return INVALIDATE_USER
	  let encodeMsgs = await app.model.Words.findAll({
	    condition: {
	      receiver: address
	    },
	    limit: count,
	    offset: count * (page - 1)
	  })
	  let totalCount = await app.model.Words.count({})
	  return {
	    encodeMsgs,
	    totalCount
	  }
	})

Request example：

	//get request
	http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/msg/AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P

Example for return by JSON:：

	{
	"encodeMsgs": [{
		"id": "mjl53EbE2xCy",
		"msg": "0e141fa52463531fb654c2398cabf883ef194130af99a88e9e34669cb995e40c5de9cbe03a081a196dff375a719dc5b930435ebe9a36f31f821a1b22",
		"sender": "AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P",
		"receiver": "AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P",
		"date": "1552632154799"
	}],
	"totalCount": 1,
	"success": true
	}

#### 10.2 Modify information
Interface address：/api/dapps/[dappID]/transactions/signed
Request mode：PUT
Support format：JSON
Request parameter description：param and return values need to be customized, see the example



Interface definition [demo](https://github.com/etm-dev/secretDapp/blob/master/contract/secret.js)：

	//...
	//All interfaces here cannot have a return value, so long as there is a return value, it means that the interface is wrong and will be rollback.
	module.exports = {
	  register: async function(publicKey, image, nickname) {
	    let sender = this.trs.senderId
	    if (!etmjs.crypto.isAddress(sender)) return INVALIDATE_USER
	    let temAddress = etmjs.crypto.getAddress(publicKey)
	    if (!etmjs.crypto.isAddress(temAddress)) return INVALIDATE_USER
	    if (sender != temAddress) {
	      return INVALIDATE_USER
	    }
	    if (!nickname) {
	      return INVALIDATE_NICKNAME
	    }
	    await app.model.User.create({
	      address: sender,
	      publicKey,
	      image,
	      nickname
	    })

	  },
	  //...

Request example：

	//put request
	let transaction = etmJS.dapp.createInnerTransaction({
	  fee: `0`,
	  type: 1000,
	  args: JSON.stringify(['publicKey','imageUrl','nickname'])
	}, secret)
	axios.put(url, {
	  transaction
	}).then(res => {
	  console.log(res)
	}).catch(err => {
	  console.error(err);
	})

Example for return by JSON:：

	{
		"success": true
	}
