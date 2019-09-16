# Smart Contract
<img src="/images/dapp/dapp02_en.jpg"  >

In  short, a real-world contract is an agreement that manages the outcome of an action.The scope of contracts can range from formal legal contracts (e.g., financial transactions)  or simple implementations such as  "game rules". Typical actions can be things like money transfers (in the case of financial contracts) or gambling (in the case of game contracts).

Smart contract is a computer protocol designed to disseminate, validate or execute contracts in an informational way. Smart contracts allow for trusted transactions without third parties, which are traceable and irreversible.

The entanmo Smart contract defines the interface (operation, parameters, data structure) and the code to implement the interface. Code is compiled into a standard bytecode format, and blockchain store contract transactions (e.g., transfers, game bets). Every smart contract must be accompanied by Ricardian Contracts, which defines legally binding terms and conditions in the contract.

<!-- * Smart Contract
	* [1. Before the start](#1-Before the start)
	* [2. Start Node](#2-Start Node)
		* [2,1Build test nodes](#21Build test nodes)
		* [2.2 Applies node](#22 Applies node)
	* [3. HelloWorld](#3-HelloWorld)
		* [3.1 Registered Agent Account](#31-Registered Agent Account)
		* [3.2 Download Dapp Starter Kit](#32-Download Dapp Starter Kit)
		* [3.3 Register DApp to mainchain](#33-Register DApp to mainchain)
		* [3.4 Deploy code to application nodes](#34-Deploy code to application nodes)
		* [3.5 Restart ETM application node](#35-Restart ETM application node)
		* [3.6 Verify HelloWorld](#36-Verify HelloWorld)
	* [4. Multi-node operation](#4-Multi-node operation)
		* [4.1 Configuring multiple agents](#41-Configuring multiple agents)
		* [4.2 Modify peers in config](#42-Modify peers in config) -->

### 1.Before the start
Before you start to write the contract, you need to make sure that the main test chain is running and that it starts to create block.

Let's review the relationship between the entanmo main chain and the side chain. Please see the figure below:
![](/images/sidechain1.png)



> 1. Main chain and side chain are independent of each other, but only the main chain begin to create block, the side chain will create block (for example: The main chain creates 10,000 blocks, and the side chain can create blocks from 0.).
>
>
> 2. The exchange of value between each side chain needs to be completed through the main chain.
>
>
> 3. Countless side chains can be built, and the relationship between side chains is win-win cooperation, which can be expanded infinitely horizontally.

After understanding the relationship between the main chain and the side chain, let's look at network classification of entanmo.

Entanmo has three kinds of network types: localnet, testnet and mainnet. Following is an introduction to these three networks:

- localnet: a private chains that run locally and have only one node (101 trustees are configured in the local config. json file), mainly to facilitate local testing and development.
- testnet: a ETM Chain Public Network Test Environment that composed of multiple servers, with complete P2P broadcasting, distributed storage and so on. It is consistent with mainnet in function.but different from mainnet in magic (which can be understood as the ID used to distinguish different chains. At present, the magic of ETM Tesnet is 594fe0f3, and the magic of mainnet is 5f5b3cf5).
- mainnet: The formal environment of the ETM main network, where ETM Token trades on major trading platforms.

The development of Dapp also involves these three kinds of networks：

- Step 1: Develop and debug locally
- Step 2: Testing on testnet
- Step 3: Publish it officially to mainnet and other nodes can install it

### 2.Start Node

#### 2.1 Build test nodes
Before the contract is officially released, developers can use their own test network for contract development.

Refer to  Start Configuration[ready]()

We have modified the configuration for developers and saved it in config-personal.json and genesisBlock-personal.json files. All we need to do is replace it:

	// If it's a stand-alone test, use config-personal.json instead of config.json (you also need to use genesisBlock-personal.json instead of genesisBlock.json)
		cd config
		mv config.json config.json.bk && mv config-personal.json config.json
		mv genesisBlock.json genesisBlock.json.bk && mv genesisBlock-personal.json genesisBlock.json

#### 2.2 Applies node

Generally, entanmo  output node is decided by voting and mining. so in reality, developers usually only act as an applied node, only synchronize data, and this applied node will maintain its own side chain (in the case of multiple nodes, act as a side chain outgoing node).

**Configuration **

Assume that the block node IP is xxx.xx.xx.xx xx, port 4096, if it is the test main chain (the first chapter already knows how to build the test main chain), the port is the port in config.json, and IP is the local ip.

**Synchronize data**

> If you are testing the main link node, you can skip this step as an application node without synchronizing any more.

The actual situation is that the out-of-block node and the application node are not the same computer (it is not recommended to run the application on the out-of-block node, testing is certainly possible), so we need the following steps. Reference resources [config.json](../../../images/config_sigle_node.json)

	//clone the latest entanmo code ,XXX represents the stable release branch
	git  clone -b xxx https://github.com/entanmo/etm.git
	//modify configuration
	"peers": {
		"list": [
	      		{"ip": "xxx.xx.xx.xxx", "port": 4096}

	    	],
	    	...
	    }

After the configuration modification is completed, the application can be started.

	node app.js
	...
	> info 2019-02-15 14:48:05 764 blocks.js:962 Block applied correctly 	with 0 transactions
	> log 2019-02-15 14:48:05 764 blocks.js:1468 Forged new block id: 	b40c48deaeb23b7cedd59515e8665f7b347aa86f565a21cbd53283365ec3237a 	> height: 6 round: 1 slot: 3632162 reward: 600000000
	> [transport] 3s boardcast tr count: 0

### 3.HelloWorld
Every program starts with "Hello world", and entanmo is no exception. This section outlines the process of contract publishing and simple invocation.

#### 3.1 Registered Agent Account
Each DApp has an independent trustee, who is also the default bookkeeper. They are responsible for the production of blocks, the transfer of assets across the chain, and at the same time can obtain transaction fees.

When registering a DApp, we only need to collect the trustee's public keys. In order to decentralize power, each secret key is kept by one person.

For demonstration purposes, we create five accounts at a time. A DApp has a maximum of 101 trustees and a minimum of 5 trustees.

> Note: Agent account is for demonstration purposes and cannot be used in formal Dapp

```
> etm-cli crypto -g

#　Next, enter 5 to generate 5 accounts.
[ { address: 'AijfU9bAE6Jpt5ve7zG3LoriDamH67eLb', // address
    secret: 'easy snap cable harvest plate tone planet yellow spot employ humble what',
    // The master password, also known as the first-level password, can generate public keys and addresses, and is essentially a private key mnemonic, which must be recorded.
    publicKey: 'a437a1d4bedf738e8620920ef29542644e3366c635b16fc9faa6f5db744bcd5c' },
    // Public key: Used to configure trustee public key in Chapter 3.2
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
#### 3.2 Download Dapp Starter Kit

Application templates include meta-information, creation blocks, and an initial directory structure for registering DApp

To generate an application template, you need to use the dapps subcommand, as shown below

```
# When generating application templates, We need to create a new directory
> mkdir etm-test-dapp && cd etm-test-dapp
> etm-cli dapps -a
```

Next, we have a series of configurations to generate registration information and genesis  block .

```
? Enter DApp name ETM-test-dapp
? Enter DApp description Demo of etm dapp
? Enter DApp tags etm,dapp,demo
? Choose DApp category Common
? Enter DApp link https://github.com/entanmo/ETM-test-dapp.zip
? Enter DApp icon url https://yourdomain.com/logo.png
? Enter public keys of dapp delegates - hex array, use ',' for separator
// Here are five trustees'corresponding public keys generated in Chapter 3.1
a437a1d4bedf738e8620920ef29542644e3366c635b16fc9faa6f5db744bcd5c,522cdc822d3bec74aa5c4e972ed6cba84850f9c4d521e43fe08675e9e4759bb9,6ee3ae36166f69e8b9408d277486c9870f40c1b7c16016328737d6445409b99f,ad558e44b347a54981295fcb5ee163c2915ca03536496129103e9d72c5025d69,6b2594ebeee9b072087e5f1e89e5c41ee2d73eb788b63abeedf5c04664f0ce5b
? How many delegates are needed to unlock asset of a dapp? 3
DApp meta information is saved to ./dapp.json ...
? Enter master secret of your genesis account [hidden]
? Do you want publish a inbuilt asset in this dapp? Yes
? Enter asset name, for example: BTC, CNY, USD, MYASSET XCT
? Enter asset total amount 1000000
? Enter asset precision 8
```

some notes

1. `DApp link ` is for the convenience of ordinary users to install automatically. It must end with`. zip`. If your DApp is not open source or not ready, you can use this option as a placeholder. Its address does not need to be real.
2. `DApp icon url`  This is the application icon displayed in En-Tan-Mo Application Center. It must end with`. jpg `or`. png`. If the image is not accessible, En-Tan-Mo Application Center will display a default icon.
3. `How many delegates ...`This option indicates how many trustee joint signatures are required when transfer assets across the chain from DApp. The number must be greater than or equal to 3, less than or equal to the number of trustee public keys you configure and less than or equal to 101. The larger the number, the safer it is, but the  efficiency and cost are higher.
4. Built-in assets can be created in Dapp's genesis block, but they are not necessary. Built-in assets can not be transferred across the chain, but can only be used in current chain. UIA(User-defined assets) issued in the main chain can be recharged to any DApp or withdrawn from DApp to the main chain, which is the biggest difference between the built-in assets of DApp and UIA. "One chain of multi-coin, one coin multi-chain" means that the mainchain can issue multiple UIA, and each UIA can be recharged into multiple DApp.

**The following is the directory structure of ETM DApp**

```
etm-test-dapp/
├── blockchain.db         // Dapp database file, which is stored separately from the main chain data, is not available without startup
├── config.json           // Node profiles for applications are currently used to configure trustee keys
├── contract              // Contract catalogue
│   └── domain.js         // Implementation Code of Domain Name Contract
├── dapp.json             // Metafiles used to register DApp
├── genesis.json          // Genesis block
├── init.js               // Application Initialization Code: Some settings, event registration and so on can be done in this file.
├── interface             // Implementation directory of query interface
│   ├── domain.js         // Implementation of Domain Name Query Interface
│   └── helloworld.js
├── logs                  // Log directory
│   └── debug.20170928.log
├── model
│   └── domain.js         // Definition of Domain Name Business Data Model
└── public
    └── index.html        // Default front-end page

```

#### 3.3 Register DApp to mainchain
Note that the `mainchain` here does not refer to `mainnet`, there are corresponding main chains under each net, the main chain is relative to Dapp (sidechain).

We can use `registerdapp` to registration application to mainchain, as follows

```
// First, generate a DAPP registered account
// Note that the passwords here are for demonstration purposes and are not available in a formal DApp
> etm-cli crypto -g
? Enter number of accounts to generate 1
[ { address: 'A9rhsV5xDny4G45gD2TXmFFpeiTfvAAQ7W',
    secret: 'possible melt adapt spoon wing coyote found flower bitter warm tennis easily',
    publicKey: '74db8511d0021206abfdc993a97312e3eb7f8595b8bc855d87b0dc764cdfa5a8' } ]
Done

// In address http://127.0.0.1:4096  use Genesis account"someone manual strong movie roof episode eight spatial brown soldier soup motor"to login(There are 100 million ETM token initially issued in this account)，then transfer 10,000 ETMs to A8QCwz5Vs77UGX9YqBg9kJ6AZmsXQBC8vj address

> etm-cli registerdapp -f dapp.json -e "possible melt adapt spoon wing coyote found flower bitter warm tennis easily"
# The result is as follows, which is the application ID. Each application registers with a different ID. Please note down your own application ID.
0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb
```

Visit `http://localhost:4096/api/dapps/get?Id=0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb` by browser. You can query the DApp. Here is the return information

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

#### 3.4 Deploy code to application nodes
Now let's copy the template code created in Section 3.2 to the DAPP subdirectory in the ETM installation directory and rename it the ID of DAPP

```
> cp -r etm-test-dapp path/to/etm/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb
```

Finally, the files in path/to/etm/dapps/dappid/directory are the same as those in etm-test-dapp directory.

Then write the five trustee passwords created in Chapter 3.1 to the DApp configuration file

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

Be careful not to forget to create a new directory

	mkdir -p path/to/etm/public/dist/dapps/

Here we configure all trustees to the same node, which is not recommended in the production environment. We should try to spread the secret key to multiple nodes to prevent a single point of failure.

So far, the Dapp installation and deployment in the development and debugging phase has been completed. When it is officially released to mainnet, other nodes can be installed by clicking DAPP on the wallet page.

#### 3.5 Restart ETM application node

```
> node ETM_HOME/app.js  //end by contrl+c and restart
```

Open `http://localhost:4096/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb/` with a browser to access the default onstage  page, which can conduct some simple interface tests.

We can also look at the Dapp log to sort out some problems

```
> tail -f path/to/etm/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb/logs/debug.*.log
```

#### 3.6 Verify HelloWorld

	//Check whether the side chain is started
	http://xxx.xxx.xxx.xxx:port/api/dapps/launched
	> {"success":true,"launched":["fbf58b3a079cd85cc78c4584fd2805a1ac677752134380bd0d95c57c0220e236"]}
	//View Side Chain Height
	http://xxx.xxx.xxx.xxx:port/api/dapps/fbf58b3a079cd85cc78c4584fd2805a1ac677752134380bd0d95c57c0220e236/blocks/height
	> {"height":88,"success":true}

As long as the above information can be displayed, the DApp will be released successfully.

The new DAPP module does not modify any information, so you can view [helloworld. js](../example/helloworld/interface/helloworld.js) in the interface directory

	...
	app.route.get('/helloworld',  async function (req) {
	  		return { message: 'helloworld' }
		})
		...
According to this code, request the interface

	http://etm.red:8096/api/dapps/fbf58b3a079cd85cc78c4584fd2805a1ac677752134380bd0d95c57c0220e236/helloworld
	> {"message":"helloworld","success":true}

A "helloworld " demo was released successfully,period


### 4.Multi-node operation

section demonstrates the example of running DApp on a single node for developers. The following section demonstrates how to configure multiple nodes (2 nodes) for developers.

#### 4.1 Configuring multiple agents

View the DApp directory structure：

	-rw-r--r--@  1 wanglei  staff   469 Feb 20 16:43 config.json
	drwxr-xr-x   3 wanglei  staff    96 Feb 18 14:50 contract
	-rw-r--r--   1 wanglei  staff   619 Feb 17 21:54 dapp.json
	-rw-r--r--   1 wanglei  staff  1010 Feb 17 21:54 genesis.json
	-rw-r--r--@  1 wanglei  staff   411 Feb 20 17:35 init.js
	drwxr-xr-x   3 wanglei  staff    96 Feb 18 14:48 interface
	drwxr-xr-x   3 wanglei  staff    96 Feb 19 13:56 model
	drwxr-xr-x   3 wanglei  staff    96 Feb 17 21:52 public

The `secrets` array in `config.json` corresponds to the `delegates` array in `dapp.json`. If you need to modify it to multiple nodes, you need to copy the corresponding secrets and delegates to another node.

	//For example, the first and the second secret
	"secrets": [
	"brave friend tumble below garden beyond salmon voyage reflect weasel live emerge",
	"subject dutch flavor short kit creek owner throw analyst trick melody target",
	"neck hole winter frown aunt print dutch round clip minute milk olive",
	"metal taxi judge raw agent wire close muffin bicycle royal current moral",
	"cat coconut mouse rule crack habit holiday useless mobile flag picnic hockey"
	]
	//You also need to copy the first and second delegate
	"delegates": [
	"8169c6672f5985d8b13d81c17c16a4f2318779bdcd676385f755535883a9b2ad",
	"7004f44fb5849b8628ee8431fa3e1a95b06d0cc70e414c875603e0fead739362",
	"b21360d7c0f4c55bfe30d6f9291000b171442f04c887a03f6466d9dcac1fcb79",
	"4f73d11c9a6eddbc46cb3af17debb2350cc702240493032761287f387128cc58",
	"6271ff0d381b0bf8d24661b2b4902c3d1ac5411fa502bf32696a7ca2569e1eed"
	]
#### 4.2 Modify peers in config

Another property in `config.json `is the peers field. If a multi-node is started, all the IP ports of the nodes need to be written in (except the IP ports of the node).

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

Restart all nodes to see that the application started successfully.
