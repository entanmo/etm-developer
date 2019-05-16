# Smart Contract Sdk Detailed

<img src="/images/dapp/dapp03_en.jpg"  >

In order to develop intelligent contract of DApp, we need to understand the contract-related functions supported by entanmo side chain. This chapter lists all the functions, and you can find the corresponding function according to your own needs. More features can be found in the [following chapters](Actual Demo).

* [Smart Contract Sdk Detailed](#-Smart Contract Sdk Detailed)
	* [1.Balance](#1Balance)
		* [1.1 Get account balance](#11-Get account balance)
		* [1.2 Increase balance](#12-Increase balance)
		* [1.3 Decrease balance](#13-Decrease balance)
		* [1.4 Transfer accounts](14-Transfer accounts)
	* [2.Data base](#2Data base)
		* [2.1 Loading model](#21-Loading model)
		* [2.2 Get model](#22-Get model)
		* [2.3 Get index](#23-Get index)
		* [2.4 Get Model Cache](#24-Get Model Cache)
		* [2.5 Lock](#25-Lock)
		* [2.6 Create model](#26-Create model)
		* [2.7 Surrogate model](#27-Surrogate model)
		* [2.8 Renewal model](#28-Renewal model)
		* [2.9 Updating integer model](#29-Updating integer model)
		* [2.10 Delete model](#210-Delete model)
	* [3.Data model](#3Data model)
		* [3.1 Get examples](#31-Get examples)
		* [3.2 Get all fields](#32-Get all fields)
		* [3.3 Count](#33-Count)
		* [3.4 Existence](#34-Existence)
		* [3.5 FindOne](#35-FindOne)
		* [3.6 FindAll](#36-FindAll)
	* [4.Route](#4Route)
		* [4.1 get](#41-get)
		* [4.2 post](#42-post)
		* [4.3 put](#43-put)
	* [5.Service charge](#5Service charge)
		* [5.1 Add service charge](#51-Add service charge)
	* [6.Log](#6Log)
		* [6.1 Set log level](#61-Set log level)
		* [6.2 Output log](#62-Output log)
		* [6.3 Trace](#63Trace)
		* [6.4 Debug](#64-Debug)
		* [6.5 Output information](65-Output information)
		* [6.6 Warn](#66-Warn)
		* [6.7 Error](#67-Error)
	* [7.Tools](#7Tools)
		* [7.1 Verification](#71-Verification)
		* [7.2 Registration Contract](#72-Registration Contract)
		* [7.3 Get the contract name](#73Get the contract name)
		* [7.4 Initialization charges](#74-Initialization charges)
		* [7.5 Get the fee](#75-Get the fee)
		* [7.6 Setting default fee](#76-Setting default fee)
		* [7.7 Get the real timestamp](#77-Get the real timestamp)
		* [7.8 Registering callback function](#78-Registering callback function)
		* [7.9 Application List](#79-Application List)
		* [7.10 Get self-increasing ID](#710-Get self-increasing ID)
		* [7.11 Self-increasing ID increase](#711-Self-increasing ID increase)
		* [7.12 Chaotic random](#712-Chaotic random)

All of the following interfaces can be queried in [helloworld](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld)

### 1.Balance

Balance interface is a set of methods to manipulate user balance in a contract, and all of them will be explained in detail here.

#### 1.1 Get account balance
**app.balances.get(address, currency)**

Parameters:

- `address` account address
- `currency` currency

Explain：

- Access to the specified account and specify currency balance

Demo:


	app.route.get("/balance/:address", async req => {
	  	let address = req.params.address
	  	let balance = await app.balances.get(address, 'HLB')
	  	return { balance }
	})

	//export 1*10^16
	>{"b":{"s":1,"e":16,"c":[1]},"success":true}
	//Also accessible by http
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr
	>{"balances":[{"currency":"HLB","balance":"10000000000000000"}],"success":true}

#### 1.2 Increase balance
**app.balances.increase(address, currency, amount)**

Parameters:

- `address` account address
- `currency` currency
- `amount` Increased amount

Explain：

- No return value
- Increase the balance of designated accounts and currencies

Demo:

	// Step 1: Find the balance of the new account
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX
	> {"balances":[],"success":true}

	// Step 2: Increase the balance
	app.route.get("/increase", async req => {
	  await app.balances.increase('AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX', 'HLB',100000000)
	})
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/increase
	> {"success":true}

	// Step 3: Query again
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX
	> {"balances":[{"currency":"HLB","balance":"100000000"}],"success":true}

#### 1.3 Decrease balance
**app.balances.decrease(address, currency, amount)**

Parameters:

- `address` account address
- `currency` currency
- `amount` Decreased amount

Explain：

- No return value
- Decrease the balance of designated accounts and currencies

Demo:

	// Step 1: Find the balance of the new account
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX
	> {"balances":[{"currency":"HLB","balance":"100000000"}],"success":true}

	// Step 2: Decrease the balance
	app.route.get("/decrease", async req => {
	  	await app.balances.decrease('AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX', 'HLB',50000000)
	})
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/decrease
	> {"success":true}

	// Step 3: Query again
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX
	> {"balances":[{"currency":"HLB","balance":"50000000"}],"success":true}

#### 1.4 Transfer accounts
**app.balances.transfer(currency, amount, from, to)**

Parameters:

- `currency` currency
- `amount` Amount of transfer
- `from` Source address (sender)
- `to` Destination address (payee)

Explain:

- No return value
- Transfer of assets between two accounts

Demo:

	// transfer
	app.route.get("/transfer", async req => {
	  await app.balances.transfer('HLB', 50000000, 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr', 'AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX')
	})
	//// Using the interface and querying, the account increased 50000000 compared with the previous section.
	> {"balances":[{"currency":"HLB","balance":"100000000"}],"success":true}

### 2.Data base
#### 2.1 Loading model
**`aync` app.sdb.load(model, fields, indices)**

Reference[init.js](../example/helloworld/init.js)

Parameters:

- `model` Model name
- `fields` Fields loaded into memory
- `indices` Index array. When indexing a single field, the element is a string; when indexing a multiple field, the element is an array of strings.

Explain:

- No return value, throw an exception when an error occurs
- Loading the data of the specified model into memory and establishing an index ，it can improve the efficiency of querying and updating a state.
- When a data model needs frequent updates and queries, we are recommended to use this interface, such as the built-in account balance and self-increasing ID of the system.

Demo:

	// The most important task is to load the data into memory. app.sdb.* is the memory data of the operation. Only when the blocks are packaged can the data be written to the database. So load instruction can keep the data consistent.
	await app.sdb.load('Balance', app.model.Balance.fields(), [['address', 'currency']])

#### 2.2 Get model

**app.sdb.get(model, cond)**

Parameters:

- `model` Model name
- `cond` query criteria

Explain:

- Returns a data item that contains the field specified when the field is loaded
- Query data in memory according to specified conditions, throw exceptions if the model is not loaded into memory, and throw exceptions when query condition packages replace fields that are not indexed.

Demo:

	// Getting model data in memory
	app.route.get("/getModel", async req => {
	  let balance = await app.sdb.get('Balance', {
	    address: 'AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX',
	    currency: 'HLB'
	  })
	  return {
	    balance
	  }
	})

	// Use contract interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getModel
	> {"balance":{"address":"AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX","currency":"HLB","balance":"100000000"},"success":true}

#### 2.3 Get index
**app.sdb.keys(model)**

Parameters:

- `model` Model name

Explain:

- Returns all index fields of a data model

Demo:

	// Get the index
	app.route.get("/getKeys", async req => {
	  let keys = await app.sdb.keys('Balance')
	  return {
	    keys
	  }
	})

	// Use contract interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getKeys
	// TODO There is a problem with the data returned
	> {"keys":{},"success":true}

#### 2.4 Get Model Cache
**app.sdb.entries(model)**

Parameters:

- `model` Model name

Explain:

- Returns all cached items of a data model

Demo:

	// Getting Model Cache
	app.route.get("/getEntry", async req => {
	  let entries = await app.sdb.entries('Balance')
	  return {
	    entries
	  }
	})
	// Request interface and output
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getEntry
	// TODO There is a problem with the data returned
	> {"entries":{},"success":true}

#### 2.5 Lock

**app.sdb.lock(key)**

Reference [helloworld.js](../example/helloworld/contract/helloworld.js)

Parameters:

- `key` index

Explain:

- No return value
- The validity period of locking a key is a block interval, and it is not allowed to lock a key twice in the same block life cycle, otherwise an exception will be thrown.
- The main purpose of this function is to solve the problem of dependence on unacknowledged data. For example, a contract requires a nickname for an account. Before the contract call is confirmed, we need to prevent it from being called again. In this case, we can use the locking function.

Demo:

	app.sdb.lock("add-word")

#### 2.6 Create model
**app.sdb.create(model, values)**
Reference  [helloworld.js](../example/helloworld/contract/helloworld.js)

Parameters:

- `model` Model name
- `values` Data items to be created

Explain：
- No return value
- Create a data item that updates the cache in real time if the model has a cache. After block validation, persist to the disk database

Demo:

	hello: async function(words) {
	// Step-by-step addition of words
	app.sdb.lock("add-word")
	app.sdb.create('Word', {
	  'words': words
	})
  }

#### 2.7 Surrogate model
**app.sdb.replace(model, values)**

Parameters:

- `model` Model name
- `values` Data items to be created or updated

Explain：
- No return value
- Create or update a data item if it is not in the database, or update it. The model must contain the primary key, and the `values` must contain the primary key.

Demo:

	// In the example, it can't be expressed, and the developer can call it in this way.
	app.sdb.replace('Account', {
	  address: 'AC3pinmvz9qX9cj6c7VrGigq7bpPxVJq85',
	  nickname: 'Nakamoto'
	})

#### 2.8 Renewal model
**app.sdb.update(model, modifier, cond)**

Parameters:

- `model` Model name
- `modifier` Data items to be updated
- `cond` Update criteria

Explain：
- No return value
- Updating several data items of a model according to specified conditions

Demo:

	app.sdb.update('Account', { nickname: 'Nakamoto' }, { nickname: 'Satoshi' })

#### 2.9 Updating integer model
**app.sdb.increment(model, modifier, cond)**

Parameters:

- `model` Model name
- `modifier` Data items to be updated
- `cond` Update criteria

Explain：
- Updating several data items of a model according to specified conditions,  only be used to update integer types

Demo:

	app.sdb.increment('Article', { votes: -10 }, { id: '10000' })
	app.sdb.increment('Article', { comments: 1 }, { id: '10000' })

#### 2.10 Delete model
**app.sdb.del(model, cond)**

Parameters:

- `model` Model name
- `cond` Delete condition

Explain：

- No return value
- Delete data items according to conditions in this model
- The underlying implementation of deletion is currently marked deleted. The default query interface filters out the marked data, but non-standard interfaces or protocols still have access to the deleted data.

Demo:

```
app.sdb.del('Article', { id: '100001' })
```


### 3.Data model
#### 3.1 Get examples
**app.model.[name]**

Parameters:

- `name` Model name

Explain：

- Returns an instance of a model, mainly for querying validated data

Demo：

	// Getting the database model
	app.route.get("/getDBModel", async req => {
	  let entries = await app.model.Words.findAll({})
	  return {
	    entries
	  }
	})
	// Request contract interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getDBModel
	// Return data
	> {"entries":[{"words":"helloworld"},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello ray "}],"success":true}

#### 3.2 Get all fields
**app.model.[table].fields()**

Explain：

- Return all fields of the model

Demo：

	// Get the database model fields
	app.route.get("/getDBMFields", async req => {
	  let fields = await app.model.Words.fields()
	  return {
	    fields
	  }
	})
	// Request interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getDBMFields
	//Return result
	> {"fields":["words"],"success":true}

#### 3.3 Count
**app.model.[table].count(cond)**

Parameters:

- `cond` query condition

Explain：

- Return`Number`
- Total number of data items with specified conditions

Demo:

	// Get the number of database model data
	app.route.get("/getDBMCount", async req => {
	  let count = await app.model.Words.count({})
	  return {
	    count
	  }
	})
	// Request contract interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getDBMCount
	//return result
	> {"count":12,"success":true}

	//or
	app.model.Block.count({ height: { $lt: 100 } })
	//export
	> 99

#### 3.4 Existence
**app.model.[table].exists(cond)**

Parameters:

- `cond` query criteria

Explain：

- return`Boolean`
- Existence of data items representing specified conditions

Demo:


	// Get whether there is some data in the database
	app.route.get("/exist", async req => {
	  let exist = await app.model.Words.exists({"words":" hello ray "})
	  return {
	    exist
	  }
	})
	// Request contract interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/exist
	//return result
	> {"exist":true,"success":true}

	//or
	app.model.Transaction.exists({ id: '9a5ec0669c79b9f5a1d5a4dbb2c200bc28c9ea829dbff71f41cbb2ad5a7d9b01' })
	//export
	false

	app.model.Account.exists({ nickname: 'Nakamoto' })
	//export
	true

#### 3.5 FindOne
**app.model.[table].findOne(condition)**

`options`is an object that contains the following elements

- `condition ` query criteria

Explain：

- Query a data item for a specified condition

Demo:

	// Find the data in the database
	app.route.get("/findOne", async req => {
	  let one = await app.model.Words.findOne({"words":" hello ray "})
	  return {
	    one
	  }
	})
	// Request contract interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/findOne
	//return result
	> {"one":{"words":"helloworld"},"success":true}

	//or
	app.model.Account.findOne({ nickname: 'Nakamoto' })
	//export
	{
	  address: 'AC3pinmvz9qX9cj6c7VrGigq7bpPxVJq85',
	  nickname: 'Nakamoto',
	  ...other values
	}

#### 3.6 FindAll
**app.model.[table].findAll(condition）**

`options` is an object that contains the following elements

- `condition` query criteria
- `fields` Return fields
- `sort` Sort field
- `limit` Maximum number of returns
- `offset` Offset

Explain：

- Query all data items for specified conditions

Demo:

	// Get all the words
	app.route.get("/words", async req => {
	  let words = await app.model.Words.findAll({})
	  return {
	    words
	  }
	})
	// Request contract interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/words
	//return result
	> {"words":[{"words":"helloworld"},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello ray "}],"success":true}

	app.model.Transfer.findAll({ senderId: 'AC3pinmvz9qX9cj6c7VrGigq7bpPxVJq85'})
	//export
	[
	  {
	    tid: "50e062f25946d220b924cb5ec6e52e260e44c9417d9f3c8ea041b704e06895f7",
	    senderId: "AFnwUuET2XddPtqpFb2ns78CQEqc7KZ6vD",
	    recipientId: "asdasdasd",
	    currency: "CCTime.XCT",
	    amount: "100000000",
	    t_timestamp: 38660145,
	    t_type: 3,
	    t_height: 93953
	  },
	  {
	    tid: "f15ce92add809b4a132936d514dce7fa7bdc15e850e7c026a001625b48595af3",
	    senderId: "AFnwUuET2XddPtqpFb2ns78CQEqc7KZ6vD",
	    recipientId: "asdasd",
	    currency: "CCTime.XCT",
	    amount: "100000000",
	    t_timestamp: 38660096,
	    t_type: 3,
	    t_height: 93948
	  }
	]

### 4.Route
The routing parameters:
- `path` routing path
- `handler` HTTP request handler, async type
#### 4.1 get
**app.route.get(path, handler)**

	//Register an <get> type of HTTP request handler
	app.route.get('/helloworld', async function(req) {
	  return {
	    message: 'helloworld'
	  }
	})

#### 4.2 post
**app.route.post(path, handler)**

	//Register an <post> type of HTTP request handler
	app.route.post('/helloworld', async function(req) {
	  return {
	    message: 'helloworld'
	  }
	})

#### 4.3 put
**app.route.put(path, handler)**

	//Register an <put> type of HTTP request handler
	app.route.put('/helloworld', async function(req) {
	  return {
	    message: 'helloworld'
	  }
	})

### 5.Service charge
#### 5.1 Add service charge

**app.feePool.add(currency, amount)**

parameter:

- `currency`  currency
- `amount`  amount

Explain：

- No return value
- Add assets to the cost pool (average to the bookkeeper at the end of each `round`)

Demo:

	//----------Adding cost pool----------
	app.route.get("/addFee", async req => {
	  await app.feePool.add('HLB', '10000000000')
	})

	// View the database
	sqlite3 blockchain.db
	sqlite> select * from round_fees;
	//The results show an increase
	> 12565|HLB|10000000000|0

### 6.Log

#### 6.1 Set log level

```
app.logger.setLevel('debug')
app.logger.setLevel('info')
```

#### 6.2 Output log

```
logger.log('hello');
```

#### 6.3 Trace

```
logger.trace('hello', 'world');
```

#### 6.4 Debug

```
logger.debug('hello %s',  'world', 123);
```

#### 6.5 Output information

```
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
```

#### 6.6 Warn

```
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
```

#### 6.7 Error

```
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
```

### 7.Tools (incorporating self-increasing id)

#### 7.1 Verification

**app.validate(type, value)**

Parameter:

- `type` Data types to be validated
- `value` Value of data to be validated

Explain：

- Verify that a data conforms to the specification and throw an exception if it does not.

Demo:

	app.validate('amount', '10000') // pase
	app.validate('amount', 10000) // throws
	app.validate('amount', 'abc') // throws
	app.validate('amount', '1e10') // throws

#### 7.2 Registration Contract
**app.registerContract(type, name)**

Reference  [init.js](../example/helloworld/init.js)

Parameter:

- `type` Data types to be validated
- `name` The string name of the contract

Explain：

- No return value
- Register a number type for a contract, and unregistered contracts cannot be externally invoked

Demo:

	// Registration contract method
	app.registerContract(1000, 'helloworld.hello')

#### 7.3 Get the contract name
**app.getContractName(type)**

Parameter:

- `type` Number or type of contract

Explain：

- Query name according to contract number

Demo:

	app.getContractName(1000) === 'helloworld.hello'

#### 7.4 Initialization charges
**app.registerFee(type, min, currency)**

Parameter:

- `type` Number or type of contract
- `min` Minimum cost
- `currency` currency

Explain：

- You can register the minimum cost needed for a contract, no fixed assets, cash assets which can be specified as a fee by the currency parameter
- `min` represents the minimum cost. When the contract is actually invoked, the cost should not be less than `min`, but it can be greater than that. The excess part is automatically put into the cost pool.

Demo:

	app.registerFee(1000, '100000', 'HLB')

#### 7.5 Get the fee
**app.getFee(type)**

Parameter:

- `type` Number or type of contract

Explain:

- Cost Settings for Acquiring Designated Contracts

Demo:

	app.getFee(1000)
	//export
	{
	  min: '100000',
	  currency: 'HLB'
	}
#### 7.6 Setting default fee
**app.setDefaultFee(min, currency)**

Parameter:

- `min` Minimum cost
- `currency` currency

Explain:
- Set default fees for all contracts in the system

Demo:

	app.setDefaultFee('10000000', 'HLB')

#### 7.7 Get the real timestamp
**app.getRealTime(epochTime)**

Parameter:

- `epochTime` The number of seconds from the generation time of the Genesis Block

Explain:

- Returns the complete timestamp, that is, the block creation time plus offset, in milliseconds
- In entanmo system, the timestamp of both the underlying storage and the upper query is an offset, not the actual timestamp. This function can be invoked to convert to the real timestamp.

Demo:

	// Get the real timestamp
	app.route.get("/getRealTime", async req => {
	  let realtime = await app.getRealTime(4353634)
	  return {
	    realtime
	  }
	})
	// Use contract interface
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getRealTime
	//return result
	> {"realtime":1543699234000,"success":true}

#### 7.8 Registering callback function

**app.registerHook**

	//TODO

#### 7.9 Application List
**app.custom[]**

	//TODO

Explain:

- The namespace of an application can be used to store some global variables defined by the application itself, mainly for isolation from the global variables at the system level.

#### 7.10 Get self-increasing ID
**app.autoID.get(name)**

Parameter:

- `name` ID type name

Explain:
- return`String`
- Get the current maximum ID of a type

#### 7.11 Self-increasing ID increase
**app.autoID.increment(name)**

Parameter:

- `name` ID type name

Explain:

- return `String`
- The ID of the specified type is increased by 1 and the updated value is returned in the form of a string, which is equivalent to atomic +1, and the super large number is also applicable.

Demo:

	//Example Encrypted Horse Contract Part Code
	app.sdb.create("Market", {
	    id: app.autoID.increment("market_max_id"),
	    type: 1,
	    status: 1,
	    price: Math.round(price),
	    horse: id,
	    seller: sender
	  })

#### 7.12 Chaotic random

	//TODO There is no interface yet.
