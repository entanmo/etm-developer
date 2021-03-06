# 合约SDK

<img src="/images/dapp/dapp03.jpg"  >

开发DApp的智能合约需要了解entanmo侧链支持的合约相关功能，本章列举了所有的功能，大家可以根据自己的需求查找相应功能函数。更多功能可以参考后续【案例】章节。

<!-- * [智能合约SDK](#-智能合约SDK详解)
	* [1.余额](#1余额)
		* [1.1 获取账户余额](#11-获取账户余额)
		* [1.2 增加余额](#12-增加余额)
		* [1.3 减少余额](#13-减少余额)
		* [1.4 转账](14-转账)
	* [2.数据库](#2数据库)
		* [2.1 加载模型](#21-加载模型)
		* [2.2 获取模型](#22-获取模型)
		* [2.3 获取索引](#23-获取索引)
		* [2.4 获取模型缓存](#24-获取模型缓存)
		* [2.5 锁定](#25-锁定)
		* [2.6 创建模型](#26-创建模型)
		* [2.7 替代模型](#27-替代模型)
		* [2.8 更新模型](#28-更新模型)
		* [2.9 更新整数模型](#29-更新整数模型)
		* [2.10 删除模型](#210-删除模型)
	* [3.数据模型](#3数据模型)
		* [3.1 获取实例](#31-获取实例)
		* [3.2 获取所有字段](#32-获取所有字段)
		* [3.3 计数](#33-计数)
		* [3.4 是否存在](#34-是否存在)
		* [3.5 查找](#35-查找)
		* [3.6 查找全部](#36-查找全部)
	* [4.路由](#4路由)
		* [4.1 get](#41-get)
		* [4.2 post](#42-post)
		* [4.3 put](#43-put)
	* [5.手续费](#5手续费)
		* [5.1 添加手续费](#51-添加手续费)
	* [6.日志](#6日志)
		* [6.1 设置等级](#61-设置等级)
		* [6.2 日志](#62-日志)
		* [6.3 跟踪](#63跟踪)
		* [6.4 调试](#64-调试)
		* [6.5 信息输出](65-信息输出)
		* [6.6 警告](#66-警告)
		* [6.7 错误](#67-错误)
	* [7.工具](#7工具)
		* [7.1 验证](#71-验证)
		* [7.2 注册合约](#72-注册合约)
		* [7.3 获取合约名字](#73-获取合约名字)
		* [7.4 初始化手续费](#74-初始化手续费)
		* [7.5 获取手续费](#75-获取手续费)
		* [7.6 设置默认手续费](#76-设置默认手续费)
		* [7.7 获取真实时间戳](#77-获取真实时间戳)
		* [7.8 注册回调](#78-注册回调)
		* [7.9 应用列表](#79-应用列表)
		* [7.10 自增id获取](#710-自增id获取)
		* [7.11 自增id增加](#711-自增id增加)
		* [7.12 混沌随机](#712-混沌随机) -->

以下所有接口都可以在[helloworld](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld)中查询

### 1.余额
余额接口是在合约中操作用户余额的方法集合，所有的操作接口都会在此做详细的说明。

#### 1.1 获取账户余额
**app.balances.get(address, currency)**

- `address` 账户地址
- `currency` 币种

说明：

- 获取指定账户、指定币种的余额

示例:


	app.route.get("/balance/:address", async req => {
	  	let address = req.params.address
	  	let balance = await app.balances.get(address, 'HLB')
	  	return { balance }
	})

	//输出结果 1*10^16
	>{"b":{"s":1,"e":16,"c":[1]},"success":true}
	//同样可以http访问
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr
	>{"balances":[{"currency":"HLB","balance":"10000000000000000"}],"success":true}

#### 1.2 增加余额
**app.balances.increase(address, currency, amount)**

- `address` 账户地址
- `currency` 币种
- `amount` 增加的数额

说明：

- 无返回值
- 增加指定账户、指定币种的余额

示例:

	//第一步 查询新账户的余额
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX
	> {"balances":[],"success":true}

	// 第二步 增加余额

	app.route.get("/increase", async req => {
	  await app.balances.increase('AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX', 'HLB',100000000)
	})

	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/increase
	> {"success":true}

	//第三步 再次查询
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX
	> {"balances":[{"currency":"HLB","balance":"100000000"}],"success":true}

#### 1.3 减少余额
**app.balances.decrease(address, currency, amount)**

- `address` 账户地址
- `currency` 币种
- `amount` 减少的数额

说明：

- 无返回值
- 减少指定账户、指定币种的余额

示例:

	//第一步 查询
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX
	> {"balances":[{"currency":"HLB","balance":"100000000"}],"success":true}

	//第二步 减少余额
	app.route.get("/decrease", async req => {
	  		await app.balances.decrease('AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX', 'HLB',50000000)
		})

	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/decrease
	> {"success":true}

	//第一步 再次查询
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX
	> {"balances":[{"currency":"HLB","balance":"50000000"}],"success":true}

#### 1.4 转账
**app.balances.transfer(currency, amount, from, to)**

- `currency` 币种
- `amount` 转移的数额
- `from` 源地址(发款人)
- `to` 目的地址(收款人)

说明：
- 无返回值
- 两个账户之间转移资产

示例:

	// 转账
	app.route.get("/transfer", async req => {
	  await app.balances.transfer('HLB', 50000000, 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr', 'AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX')
	})
	//调用接口并查询 相比上一小节多了50000000
	> {"balances":[{"currency":"HLB","balance":"100000000"}],"success":true}

### 2.数据库
#### 2.1 加载模型
**`aync` app.sdb.load(model, fields, indices)**

参考[init.js](../example/helloworld/init.js)

- `model` 模型名称
- `fields` 加载到内存中的字段
- `indices` 索引数组, 单字段索引时, 元素为字符串; 多字段索引时, 元素为字符串数组

说明：

- 无返回值, 出现错误时抛异常
- 将指定模型的数据加载到内存并建立索引, 这样可以提高查询和更新一个状态的效率
- 当一个数据模型需要频繁更新和查询时, 建议使用这个接口, 比如系统内置的账户余额、自增ID都使用了这个功能

示例:

	//最重要的工作是把数据加载到内存中，app.sdb.*是操作的内存数据，等区块打包完毕，才会写入数据库，所以load可以保持数据一致性
	await app.sdb.load('Balance', app.model.Balance.fields(), [['address', 'currency']])

#### 2.2 获取模型
**app.sdb.get(model, cond)**

- `model` 模型名称
- `cond` 查询条件

说明：

- 返回一个数据项, 包含的字段为`load`时指定的字段
- 按指定条件查询内存中的数据, 如果该模型没有被载入内存, 会抛出异常; 查询条件包换未建索引的字段时也会抛出异常

示例:

	//获取内存中的模型数据
	app.route.get("/getModel", async req => {
	  let balance = await app.sdb.get('Balance', {
	    address: 'AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX',
	    currency: 'HLB'
	  })
	  return {
	    balance
	  }
	})

	//调用合约接口
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getModel
	> {"balance":{"address":"AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX","currency":"HLB","balance":"100000000"},"success":true}

#### 2.3 获取索引
**app.sdb.keys(model)**

- `model` 模型名称

说明：

- 返回一个数据模型的全部索引字段

示例:

	//获取索引
	app.route.get("/getKeys", async req => {
	  let keys = await app.sdb.keys('Balance')
	  return {
	    keys
	  }
	})

	//调用合约接口
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getKeys
	//TODO  返回值有问题
	> {"keys":{},"success":true}

#### 2.4 获取模型缓存
**app.sdb.entries(model)**

- `model` 模型名称

说明：

- 返回一个数据模型的所有缓存项

示例:

	//获取模型缓存
	app.route.get("/getEntry", async req => {
	  let entries = await app.sdb.entries('Balance')
	  return {
	    entries
	  }
	})
	// 请求接口以及输出
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getEntry
	//TODO 返回数据有问题
	> {"entries":{},"success":true}

#### 2.5 锁定
**app.sdb.lock(key)**

参考[helloworld.js](../example/helloworld/contract/helloworld.js)

- `key` 索引

说明：

- 无返回值
- 对一个key进行加锁, 有效期为一个区块间隔, 在同一个区块生命周期内不允许对一个key二次加锁, 否则会抛异常
- 该功能主要是为了解决对未确认数据的依赖问题。比如, 一个合约中需要对某账户设置昵称, 在这个合约调用被确认之前, 我们需要防止再次调用, 这种情况下可以使用加锁功能

示例:

	app.sdb.lock("add-word")

#### 2.6 创建模型
**app.sdb.create(model, values)**
参考[helloworld.js](../example/helloworld/contract/helloworld.js)

- `model` 模型名称
- `values` 待创建的数据项

说明：
- 无返回值
- 创建一个数据项, 如果该模型有缓存, 会实时更新缓存. 在区块确认后, 持久化到磁盘数据库

示例:

	hello: async function(words) {
	//单步添加单词
	app.sdb.lock("add-word")
	app.sdb.create('Word', {
	  'words': words
	})
  }

#### 2.7 替代模型
**app.sdb.replace(model, values)**

- `model` 模型名称
- `values` 待创建或更新的数据项

说明：
- 无返回值
- 创建或更新一个数据项, 如果数据库中无此项则创建, 否则更新. 模型必须包含主键, `values`必须包含主键

示例:

	//示例中无法表示，开发者可以按照此方式调用
	app.sdb.replace('Account', {
	  address: 'AC3pinmvz9qX9cj6c7VrGigq7bpPxVJq85',
	  nickname: 'Nakamoto'
	})

#### 2.8 更新模型
**app.sdb.update(model, modifier, cond)**

- `model` 模型名称
- `modifier` 待更新的数据项
- `cond` 更新条件

说明：
- 无返回值
- 按指定条件更新一个模型的若干个数据项

示例:

	//示例中无法表示，开发者可以按照此方式调用
	app.sdb.update('Account', { nickname: 'Nakamoto' }, { nickname: 'Satoshi' })

#### 2.9 更新整数模型
**app.sdb.increment(model, modifier, cond)**

- `model` 模型名称
- `modifier` 待更新的数据项
- `cond` 更新条件

说明：
- 按指定条件增量更新一个模型的若干个数据项, 只能用于更新整数类型

示例:

	//示例中无法表示，开发者可以按照此方式调用
	app.sdb.increment('Article', { votes: -10 }, { id: '10000' })
	app.sdb.increment('Article', { comments: 1 }, { id: '10000' })

#### 2.10 删除模型
**app.sdb.del(model, cond)**

- `model` 模型名称
- `cond` 删除条件

说明：

- 无返回值
- 按条件删除一个模型中的数据项
- 删除操作的底层实现目前是标记为deleted, 默认的查询接口都会过滤掉被标记的数据, 但非标准接口或协议仍然可以获取到这些已经被`删除`的数据

示例:
	//示例中无法表示，开发者可以按照此方式调用
	app.sdb.del('Article', { id: '100001' })


### 3.数据模型
#### 3.1 获取实例
**app.model.[name]**

- `name` 模型名称
说明：

- 返回一个模型的实例, 主要用于查询已确认的数据

示例：

	//获取数据库模型
	app.route.get("/getDBModel", async req => {
	  let entries = await app.model.Words.findAll({})
	  return {
	    entries
	  }
	})
	//请求合约接口
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getDBModel
	//返回数据
	> {"entries":[{"words":"helloworld"},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello ray "}],"success":true}

#### 3.2 获取所有字段
**app.model.[table].fields()**

说明：

- 返回该模型所有字段

示例：

	//获取数据库模型字段
	app.route.get("/getDBMFields", async req => {
	  let fields = await app.model.Words.fields()
	  return {
	    fields
	  }
	})
	//请求接口
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getDBMFields
	//返回结果
	> {"fields":["words"],"success":true}

#### 3.3 计数
**app.model.[table].count(cond)**

- `cond` 查询条件

说明：

- 返回`Number`
- 表示指定条件的数据项总数

示例:

	//获取数据库模型数据数量
	app.route.get("/getDBMCount", async req => {
	  let count = await app.model.Words.count({})
	  return {
	    count
	  }
	})
	//请求合约接口
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getDBMCount
	//返回结果
	> {"count":12,"success":true}

	//或者
	app.model.Block.count({ height: { $lt: 100 } })
	//输出
	> 99

#### 3.4 是否存在
**app.model.[table].exists(cond)**

- `cond` 查询条件

说明：

- 返回`Boolean`
- 表示指定条件的数据项是否存在

示例:


	//获取数据库中是否存在某些数据
	app.route.get("/exist", async req => {
	  let exist = await app.model.Words.exists({"words":" hello ray "})
	  return {
	    exist
	  }
	})
	//请求合约
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/exist
	//返回结果
	> {"exist":true,"success":true}

	//或者
	app.model.Transaction.exists({ id: '9a5ec0669c79b9f5a1d5a4dbb2c200bc28c9ea829dbff71f41cbb2ad5a7d9b01' })
	//输出
	false

	app.model.Account.exists({ nickname: 'Nakamoto' })
	//输出
	true

#### 3.5 查找
**app.model.[table].findOne(condition)**

`options`是一个对象, 包含以下元素

- `condition ` 查询条件

说明：

- 查询一个指定条件的数据项

示例:

	//查找数据库中的数据
	app.route.get("/findOne", async req => {
	  let one = await app.model.Words.findOne({"words":" hello ray "})
	  return {
	    one
	  }
	})
	//调用接口
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/findOne
	//返回结果
	> {"one":{"words":"helloworld"},"success":true}

	//或者
	app.model.Account.findOne({ nickname: 'Nakamoto' })
	//输出
	{
	  address: 'AC3pinmvz9qX9cj6c7VrGigq7bpPxVJq85',
	  nickname: 'Nakamoto',
	  ...other values
	}

#### 3.6 查找全部
**app.model.[table].findAll(condition）**

`options`是一个对象, 包含以下元素

- `condition` 查询条件
- `fields` 返回的字段
- `sort` 排序字段
- `limit` 返回的最大数量
- `offset` 偏移量

说明：

- 查询指定条件的所有数据项

示例:

	// 获取所有单词
	app.route.get("/words", async req => {
	  let words = await app.model.Words.findAll({})
	  return {
	    words
	  }
	})
	//调用合约接口
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/words
	//返回结果
	> {"words":[{"words":"helloworld"},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello world "},{"words":" hello ray "}],"success":true}

	app.model.Transfer.findAll({ senderId: 'AC3pinmvz9qX9cj6c7VrGigq7bpPxVJq85'})
	//输出
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

### 4.路由
路由参数说明：
- `path` 路由路径
- `handler` http请求处理函数, async类型
#### 4.1 get
**app.route.get(path, handler)**

	注册一个`get`类型的http请求处理函数
	app.route.get('/helloworld', async function(req) {
	  return {
	    message: 'helloworld'
	  }
	})

#### 4.2 post
**app.route.post(path, handler)**

	注册一个`post`类型的http请求处理函数

#### 4.3 put
**app.route.put(path, handler)**

	注册一个`put`类型的http请求处理函数

### 5.手续费
#### 5.1 添加手续费
**app.feePool.add(currency, amount)**

- `currency` 币种
- `amount` 数额

说明：

- 无返回值
- 将资产加入费用池(在每一个`round`结尾平均分给记账人)

示例:

	//----------添加费用池----------
	app.route.get("/addFee", async req => {
	  await app.feePool.add('HLB', '10000000000')
	})

	//查看数据库
	sqlite3 blockchain.db
	sqlite> select * from round_fees;
	//结果显示增加
	> 12565|HLB|10000000000|0

### 6.日志
#### 6.1 设置等级

	app.logger.setLevel('debug')
	app.logger.setLevel('info')
#### 6.2 日志
	logger.log('hello');
#### 6.3 跟踪
	logger.trace('hello', 'world');
#### 6.4 调试
	logger.debug('hello %s',  'world', 123);
#### 6.5 信息输出
	logger.info('hello %s %d',  'world', 123, {foo:'bar'});
#### 6.6 警告
	logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
#### 6.7 错误
	logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

### 7.工具（合入自增id）
#### 7.1 验证
**app.validate(type, value)**

- `type` 待验证的数据类型
- `value` 待验证的数据值

说明：

- 验证一个数据是否符合规范, 不符合则抛出异常

示例:

	app.validate('amount', '10000') // pase
	app.validate('amount', 10000) // throws
	app.validate('amount', 'abc') // throws
	app.validate('amount', '1e10') // throws

#### 7.2 注册合约
**app.registerContract(type, name)**

参考[init.js](../example/helloworld/init.js)

- `type` 合约数值类型或编号
- `name` 合约的字符串名称

说明：

- 无返回值
- 为合约注册一个数字类型, 未注册的合约无法被外部调用

示例:

	//注册合约方法
  	app.registerContract(1000, 'helloworld.hello')




#### 7.3 获取合约名字
**app.getContractName(type)**

- `type` 合约的数字类型或编号

说明：

- 根据合约编号查询名称

示例:

	app.getContractName(1000) === 'helloworld.hello'

#### 7.4 初始化手续费
**app.registerFee(type, min, currency)**

- `type` 合约的数字类型或编号
- `min` 最小费用
- `currency` 币种

说明：

- 为一个合约注册最小费用, 不固定资产, 可通过`currency`参数指定收哪种资产作为手续费
- `min`表示最小费用, 实际调用合约的时候, 费用不能小于`min`, 但可以大于, 超过的部分自动放入费用池

示例:

	app.registerFee(1000, '100000', 'HLB')

#### 7.5 获取手续费
**app.getFee(type)**

- `type` 合约的数字类型或编号

说明：

- 获取指定合约的费用设定

示例:

	app.getFee(1000)
	//输出
	{
	  min: '100000',
	  currency: 'HLB'
	}
#### 7.6 设置默认手续费
**app.setDefaultFee(min, currency)**

- `min` 最小费用
- `currency` 币种

说明：
- 为系统的所有合约设置默认手续费

示例:

	app.setDefaultFee('10000000', 'HLB')

#### 7.7 获取真实时间戳
**app.getRealTime(epochTime)**

- `epochTime` 距离创世区块生成时间的秒数

说明：

- 返回完整的时间戳, 即区块创世时间加上偏移量, 单位为毫秒
- entanmo系统中底层存储和上层查询的时间戳均为一个偏移量, 并非实际时间戳, 可以调用这个函数转换为真实的时间戳

示例:

	//获取真实时间戳
	app.route.get("/getRealTime", async req => {
	  let realtime = await app.getRealTime(4353634)
	  return {
	    realtime
	  }
	})
	//调用合约接口
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/getRealTime
	//返回结果
	> {"realtime":1543699234000,"success":true}

#### 7.8 注册回调
**app.registerHook**

	//TODO

#### 7.9 应用列表
**app.custom[]**

	//TODO

说明：

- 应用的名字空间, 可用来保存应用本身自定义的一些全局变量, 主要是为了与系统级的全局变量进行隔离

#### 7.10 自增id获取
**app.autoID.get(name)**

- `name` ID类型名称

说明：
- 返回`String`
- 获取一个类型的当前最大ID

#### 7.11 自增id增加
**app.autoID.increment(name)**

- `name` ID类型名称

说明：

- 返回`String`
- 对指定类型的ID增加1并以字符串形式返回更新后的数值, 相当于原子的`++1`, 超大数也适用

示例:

	//示例 加密马合约部分代码
	app.sdb.create("Market", {
	    id: app.autoID.increment("market_max_id"),
	    type: 1,
	    status: 1,
	    price: Math.round(price),
	    horse: id,
	    seller: sender
	  })

#### 7.12 混沌随机

	//TODO 暂时还没有接口
