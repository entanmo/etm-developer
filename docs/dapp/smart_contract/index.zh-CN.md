# 合约开发
<img src="/images/dapp/dapp02.jpg"  >

简单地说，一个现实世界的合约是一个管理行动结果的协议。合同的范围可以从正式的法律合同（例如，金融交易）到诸如游戏“规则”之类的简单实现。典型的行为可以是诸如资金转移（在金融合约的情况下）或游戏下注（在游戏合约的情况下）的事情。

**智能合约**是一种旨在以信息化方式传播、验证或执行合同的计算机协议。智能合约允许在没有第三方的情况下进行可信交易，这些交易可追踪且不可逆转。

entanmo智能合约定义了接口（操作，参数，数据结构）和实现接口的代码。代码被编译成规范的字节码格式，区块链存储合约的交易（例如，转账，游戏下注）。每一个智能合约都必须附有一份李嘉图合同，该合同定义了合同中具有法律约束力的条款和条件。

<!-- * 合约开发
	* [1. 开始之前](#1-开始之前)
	* [2. 应用节点同步](#2-启动节点)
		* [测试节点](#测试节点)
		* [应用节点](#应用节点)
	* [3. helloworld](#3-helloworld)
		* [3.1 注册代理人账号](#31-注册代理人账号)
		* [3.2 生成dapp模版](#32-生成dapp模版)
		* [3.3 注册dapp到主链](#33-注册dapp到主链)
		* [3.4 部署代码到应用节点](#34-部署代码到应用节点)
		* [3.5 重启etm应用节点](#35-重启etm应用节点)
		* [3.6 验证helloworld](#36-验证helloworld)
	* [4.多节点运行](#4多节点运行)
		* [4.1 多个代理人配置](#41-多个代理人配置)
		* [4.2 修改config中的peers](#42-修改config中的peers) -->

### 1.开始之前
开始编写合约之前，大家需要保证测试主链已经运行起来，开始出块。

我们再来回顾下entanmo主链与侧链的关系，请看下图：
![](/images/sidechain1.png)

	1.主链与侧链出块数相互独立，但是只有主链出块，侧链才会出块（比如：主链出块10000，侧链可以从0开始出块）。
	2.各个侧链之间的价值交换，需要通过主链完成。
	3.可以搭建起无数条侧链，侧链之间合作共赢的关系，可以无限横向拓展。

在了解了主链与侧链的关系之后，再来看看entanmo的网络分类。
entanmo有三种网络类型，分别是localnet，testnet，mainnet。下面对这三种网络做一个介绍：

- localnet：即私有链，是运行在本地的、只有一个节点（101个受托人都配置在本地的config.json文件中）的私链，主要是为了方便本地测试和开发。
- testnet：ETM链公网测试环境，由多个服务器组成，具备完整的p2p广播、分布式存储等，在功能上跟mainnet一致，和mainnet的区别在于magic不同（可以理解为用于区分不同链的id，目前ETM testnet的magic为594fe0f3，mainnet的magic为：5f5b3cf5）
- mainnet：ETM主网正式环境，这上面的ETM Token会在各大交易平台进行交易。

Dapp的开发同样要涉及到这三种网络，即

- 第一步，在localnet开发、本地调试
- 第二步，在testnet测试
- 第三步，正式发布到mainnet，其他节点可以安装

### 2.启动节点

#### 2.1测试节点
在未正式发布合约前，开发者可以使用自己搭建的测试网络进行合约开发。

配置方式请参考[开发准备]()

我们已经为开发者修改好了配置，保存在config-personal.json和genesisBlock-personal.json文件中，只需要替换即可：

	//如果是单机测试，请使用 config-personal.json 替换 config.json(同时也需要使用genesisBlock-personal.json 替换genesisBlock.json)
		cd config
		mv config.json config.json.bk && mv config-personal.json config.json
		mv genesisBlock.json genesisBlock.json.bk && mv genesisBlock-personal.json genesisBlock.json

#### 2.2应用节点

一般entanmo出块节点是需要投票和挖矿来决定的，所以在现实情况中，开发者一般只是充当一个应用节点，只同步数据，而此应用节点会维护自己的一条侧链（在多节点情况下，充当一个侧链的出块节点。）

**配置**

假设出块节点ip为：xxx.xx.xx.xxx，端口4096，如果是测试主链（第一章已知道如何搭建测试主链），端口就是config.json中的端口，ip就是本机ip。

**同步数据**

> ps：如果是测试主链节点，那么可以当做应用节点不用再同步，即可跳过此步骤

实际情况是出块节点与应用节点不是同一台电脑（也不推荐在出块节点上运行应用，测试当然是可以的）所以我们需要以下步骤。参考[config.json](../../../images/config_sigle_node.json)

	//clone 最新的entanmo代码 xxx 代表稳定release分支
	git  clone -b xxx https://github.com/entanmo/etm.git
	//修改配置
	"peers": {
		"list": [
	      		{"ip": "xxx.xx.xx.xxx", "port": 4096}

	    	],
	    	...
	    }

配置完成以后即可启动应用节点

	//可以参考第一章，启动主链，启动侧链也是一样的
	node app.js
	...
	> info 2019-02-15 14:48:05 764 blocks.js:962 Block applied correctly 	with 0 transactions
	> log 2019-02-15 14:48:05 764 blocks.js:1468 Forged new block id: 	b40c48deaeb23b7cedd59515e8665f7b347aa86f565a21cbd53283365ec3237a 	> height: 6 round: 1 slot: 3632162 reward: 600000000
	> [transport] 3s boardcast tr count: 0

### 3.helloworld
每一个程序的开始都是从[hello world](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld)开始的，entanmo也不例外，此小节大致介绍合约发布的过程以及简单的调用。

#### 3.1 注册代理人账号
每个dapp都有独立的受托人，这些受托人也是默认的记账人，他们负责区块的生产，跨链资产的中转，与此同时可以获得交易手续费。
注册dapp的时候，我们只需要收集受托人的公钥就行，为了权力分散，每个秘钥分别由一个人保管。
这里为了演示，我们一次性创建5个账户，一个dapp最多有101个受托人，最少是5个。

> 注意：代理人账号是作演示用途，且不可用于正式的dapp中

```
// 注意这里的密码都是演示用途，且不可用于正式的dapp中
> etm-cli crypto -g

#　接下来输入 5 即可生成5个账户
[ { address: 'AijfU9bAE6Jpt5ve7zG3LoriDamH67eLb', // 地址
    secret: 'easy snap cable harvest plate tone planet yellow spot employ humble what', // 主密码，也叫一级密码，可以生成公钥和地址，实质为私钥的助记词，必须记录下来
    publicKey: 'a437a1d4bedf738e8620920ef29542644e3366c635b16fc9faa6f5db744bcd5c' },// 公钥，用于4.2章节配置受托人公钥
  { address: 'ABGGUL5D2SoBaQTqDMAb3u9RdUjYBcmRxx',
    secret: 'adjust edge exist hurry joke carbon spice envelope battle shuffle hawk thought',
    publicKey: '522cdc822d3bec74aa5c4e972ed6cba84850f9c4d521e43fe08675e9e4759bb9' },
  { address: 'AMg37s4avDUojJd6d3df7HPA3vqtRRwved',
    secret: 'survey spoil submit select warm chapter crazy link actual lonely pig grain',
    publicKey: '6ee3ae36166f69e8b9408d277486c9870f40c1b7c16016328737d6445409b99f' },
  { address: 'AL5p8BHzhCU3e5pkjMYbcjUSz771MrQcQr',
    secret: 'march struggle gap piece entry route kind pistol chunk spell honey summer',
    publicKey: 'ad558e44b347a54981295fcb5ee163c2915ca03536496129103e9d72c5025d69' },
  { address: 'A2WassKticpB7cx15RZfenBekthwmqXRXd',
    secret: 'response modify knife brass excess absurd chronic original digital surge note spare',
    publicKey: '6b2594ebeee9b072087e5f1e89e5c41ee2d73eb788b63abeedf5c04664f0ce5b' } ]
```
#### 3.2 生成dapp模版
应用模板包括注册dapp必须的元信息、创世块以及一个初始的目录结构

生成应用模板需要使用`dapps`子命令，如下所示

```
# 生成应用模板的时候，最好建立一个新目录
> mkdir etm-test-dapp && cd etm-test-dapp
> etm-cli dapps -a
```

接下来，我们进行一系列配置，以生成应用的注册信息与创世块

```
? Enter DApp name ETM-test-dapp
? Enter DApp description Demo of etm dapp
? Enter DApp tags etm,dapp,demo
? Choose DApp category Common
? Enter DApp link https://github.com/entanmo/ETM-test-dapp.zip
? Enter DApp icon url https://yourdomain.com/logo.png
? Enter public keys of dapp delegates - hex array, use ',' for separator //这里是3.1章节生成的5个受托人对应的公钥
a437a1d4bedf738e8620920ef29542644e3366c635b16fc9faa6f5db744bcd5c,522cdc822d3bec74aa5c4e972ed6cba84850f9c4d521e43fe08675e9e4759bb9,6ee3ae36166f69e8b9408d277486c9870f40c1b7c16016328737d6445409b99f,ad558e44b347a54981295fcb5ee163c2915ca03536496129103e9d72c5025d69,6b2594ebeee9b072087e5f1e89e5c41ee2d73eb788b63abeedf5c04664f0ce5b
? How many delegates are needed to unlock asset of a dapp? 3
DApp meta information is saved to ./dapp.json ...
? Enter master secret of your genesis account [hidden]
? Do you want publish a inbuilt asset in this dapp? Yes
? Enter asset name, for example: BTC, CNY, USD, MYASSET XCT
? Enter asset total amount 1000000
? Enter asset precision 8
```

有几个注意事项

1. `DApp link`是为了方便普通用户自动安装，必须以`.zip`结尾, 如果您的dapp不打算开源或者没有准备好，可以把这个选项当做占位符，它所在的地址不必真实存在
2. `DApp icon url`这是在En-Tan-Mo应用中心展示用的应用图标, 必须以`.jpg`或`.png`结尾，如果该图片无法访问，En-Tan-Mo应用中心会展示一个默认的图标
3. `How many delegates ...`这个选项表示从`dapp`跨链转账资产时需要多少个受托人联合签名，该数字必须大于等于3、小于等于你配置的受托人公钥个数且小于等于101，数字越大越安全，但效率和费用越高
4. Dapp的创世块中可以创建内置资产，但不是必须的，内置资产无法跨链转账，只能在链内使用。在主链发行的UIA（用户自定义资产）可以充值到任意dapp中，也可从dapp提现到主链，这是dapp内置资产和UIA最大的区别。“一链多币，一币多链”指的就是主链可以发行多个UIA，而每个UIA都可以充值到多个dapp中。

**下面是etm dapp的目录结构**

```
etm-test-dapp/
├── blockchain.db         // dapp数据库文件，与主链的数据是分开存放的,没有启动则没有此文件
├── config.json           // 应用的节点配置文件，目前主要用于配置受托人秘钥
├── contract              // 合约目录
│   └── domain.js         // 域名合约的实现代码
├── dapp.json             // 注册dapp时用到的元文件
├── genesis.json          // 创世区块
├── init.js               // 应用初始化代码，可以在该文件进行一些设置、事件注册等
├── interface             // 查询接口的实现目录
│   ├── domain.js         // 域名查询接口实现
│   └── helloworld.js
├── logs                  // 日志目录
│   └── debug.20170928.log
├── model
│   └── domain.js         // 域名业务数据模型定义
└── public
    └── index.html        // 默认前端页面

```

#### 3.3 注册dapp到主链
注意这里的`主链`不是指`mainnet`， 每个`net`下都有相应的主链， 主链是相对Dapp（侧链）而言。

我们可以使用`registerdapp`注册应用到主链，如下所示

```
// 先生成一个dapp注册账户
// 注意这里的密码都是演示用途，且不可用于正式的dapp中
> etm-cli crypto -g
? Enter number of accounts to generate 1
[ { address: 'A9rhsV5xDny4G45gD2TXmFFpeiTfvAAQ7W',
    secret: 'possible melt adapt spoon wing coyote found flower bitter warm tennis easily',
    publicKey: '74db8511d0021206abfdc993a97312e3eb7f8595b8bc855d87b0dc764cdfa5a8' } ]
Done

// 在http://127.0.0.1:4096  用创世账户“someone manual strong movie roof episode eight spatial brown soldier soup motor”登陆（该账户中有初始发行的1亿ETM token），然后给A8QCwz5Vs77UGX9YqBg9kJ6AZmsXQBC8vj地址转10000个ETM

> etm-cli registerdapp -f dapp.json -e "possible melt adapt spoon wing coyote found flower bitter warm tennis easily"
# 返回结果如下,这就是应用id。每个应用注册时返回的id不同，请记下你自己的应用id
0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb
```

使用浏览器访问`http://localhost:4096/api/dapps/get?id=0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb`, 可以查询到该dapp了，下面是返回信息

```
{
    "success": true,
    "dapp": {
        "name": "etm-dapp-helloworld",
        "description": "A hello world demo for etm dapp",
        "tags": "etm,dapp,demo",
        "link": "https://github.com/entanmo/etm-dapp-helloworld/archive/master.zip",
        "type": 0,
        "category": 1,
        "icon": "http://o7dyh3w0x.bkt.clouddn.com/hello.png",
        "delegates": [
            "a518e4390512e43d71503a02c9912413db6a9ffac4cbefdcd25b8fa2a1d5ca27",
            "c7dee266d5c85bf19da8fab1efc93204fed7b35538a3618d7f6a12d022498cab",
            "9cac187d70713b33cc4a9bf3ff4c004bfca94802aed4a32e2f23ed662161ea50",
            "01944ce58570592250f509214d29171a84f0f9c15129dbea070251512a08f5cc",
            "f31d61066c902bebc80155fed318200ffbcfc97792511ed18d85bd5af666639f"
        ],
        "unlockDelegates": 3,
        "transactionId": "0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb"
    }
}
```

#### 3.4 部署代码到应用节点
现在我们把3.2小节中创建的模板代码拷贝到etm的安装目录下的dapp子目录，并改名为dapp的id

```
> cp -r etm-test-dapp path/to/etm/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb
```

最后`path/to/etm/dapps/dappid/`目录下的文件与`etm-test-dapp`目录下文件相同。

然后把4.1章节创建的5个受托人密码写入这个dapp的配置文件中

```
> cat path/to/etm/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb/config.json
{
    "secrets": [
        "easy snap cable harvest plate tone planet yellow spot employ humble what",
        "adjust edge exist hurry joke carbon spice envelope battle shuffle hawk thought",
        "survey spoil submit select warm chapter crazy link actual lonely pig grain",
        "march struggle gap piece entry route kind pistol chunk spell honey summer",
        "response modify knife brass excess absurd chronic original digital surge note spare"
    ]
}
```

注意别忘了新建目录

	mkdir -p path/to/etm/public/dist/dapps/

这里我们把所有受托人的配置到同一个节点了，在生产环境中不推荐这样做，应该把秘钥尽量分散到多个节点，以防止单点故障。
至此，开发调试阶段的dapp安装部署完成。以后正式发布到mainnet时，其他节点只需要在钱包页面点击dapp就可以安装。

#### 3.5 重启etm应用节点

```
> node ETM_HOME/app.js  //contrl+c 结束  然后重新运行，参考 3.初始化 中的运行系统
```

使用浏览器打开`http://localhost:4096/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb/`，可以访问默认的一个前端页面，该页面可以进行一些简单的接口测试

也可以观察dapp的日志来排查一些问题

```
> tail -f path/to/etm/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb/logs/debug.*.log
```

#### 3.6 验证helloworld

	//查看侧链是否启动
	http://xxx.xxx.xxx.xxx:port/api/dapps/launched
	> {"success":true,"launched":["fbf58b3a079cd85cc78c4584fd2805a1ac677752134380bd0d95c57c0220e236"]}
	//查看侧链高度
	http://xxx.xxx.xxx.xxx:port/api/dapps/fbf58b3a079cd85cc78c4584fd2805a1ac677752134380bd0d95c57c0220e236/blocks/height
	> {"height":88,"success":true}

只要能显示以上信息就代表该dapp发布成功
新建的dapp模块没有修改任何信息，可以查看interface目录下的[helloworld.js](../example/helloworld/interface/helloworld.js)

	...
	app.route.get('/helloworld',  async function (req) {
	  		return { message: 'helloworld' }
		})
		...
根据此代码，请求该接口

	http://etm.red:8096/api/dapps/fbf58b3a079cd85cc78c4584fd2805a1ac677752134380bd0d95c57c0220e236/helloworld
	> {"message":"helloworld","success":true}

就此，一个helloworld就发布成功了。


### 4.多节点运行

以上小节为开发者演示了单节点运行dapp示例，下面为开发者演示多节点（2个节点）配置方式。

#### 4.1 多个代理人配置

查看dapp目录结构：

	-rw-r--r--@  1 wanglei  staff   469 Feb 20 16:43 config.json
	drwxr-xr-x   3 wanglei  staff    96 Feb 18 14:50 contract
	-rw-r--r--   1 wanglei  staff   619 Feb 17 21:54 dapp.json
	-rw-r--r--   1 wanglei  staff  1010 Feb 17 21:54 genesis.json
	-rw-r--r--@  1 wanglei  staff   411 Feb 20 17:35 init.js
	drwxr-xr-x   3 wanglei  staff    96 Feb 18 14:48 interface
	drwxr-xr-x   3 wanglei  staff    96 Feb 19 13:56 model
	drwxr-xr-x   3 wanglei  staff    96 Feb 17 21:52 public

`config.json`中`secrets`数组与`dapp.json`中`delegates`数组是一一对应的，需要修改成多节点，就要把对应secret与delegate复制到另外一个节点上。

	//比如  第一与第二个secret
	"secrets": [
	"brave friend tumble below garden beyond salmon voyage reflect weasel live emerge",
	"subject dutch flavor short kit creek owner throw analyst trick melody target",
	"neck hole winter frown aunt print dutch round clip minute milk olive",
	"metal taxi judge raw agent wire close muffin bicycle royal current moral",
	"cat coconut mouse rule crack habit holiday useless mobile flag picnic hockey"
  	]
	//也需要复制第一与第二个delegate
	"delegates": [
	    "8169c6672f5985d8b13d81c17c16a4f2318779bdcd676385f755535883a9b2ad",
	    "7004f44fb5849b8628ee8431fa3e1a95b06d0cc70e414c875603e0fead739362",
	    "b21360d7c0f4c55bfe30d6f9291000b171442f04c887a03f6466d9dcac1fcb79",
	    "4f73d11c9a6eddbc46cb3af17debb2350cc702240493032761287f387128cc58",
	    "6271ff0d381b0bf8d24661b2b4902c3d1ac5411fa502bf32696a7ca2569e1eed"
	  ]

#### 4.2 修改config中的peers

在`config.json`中还有一个属性，就是peers字段，如果是多节点启动，就需要把所有节点的ip端口都写进去（除开本节点ip端口）。

	//...
	"peers": {
	"list": [
	  {"ip": "45.32.19.241", "port": 4096},
	  {"ip": "45.32.62.184", "port": 4096},
	  {"ip": "45.32.22.78", "port": 4096},
	  {"ip": "45.32.248.33", "port": 4096}
	],
	"blackList": [],
	"options": {
	  "timeout": 4000
	}
	//...

 重启所有节点即可看到应用启动成功。
