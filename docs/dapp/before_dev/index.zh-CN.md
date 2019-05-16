# 开发准备

<img src="/images/dapp/dapp01.jpg"  >

本章为大家介绍，dapp开发者需要掌握的开发技能，开发的硬件设施等


* [1.介绍](#1介绍)
  * [1.1 entanmo组件版本](#11-entanmo组件版本)
  * [1.2 etm-vm功能](#12-etm-vm功能)
  * [1.3 开发语言要求](#13-开发语言要求)
  * [1.4 开发系统要求](#14-开发系统要求)
  * [1.5 其他要求](#15-其他要求)
* [2.开发环境准备](#2开发环境准备)
  * [2.1 linux安装相关环境](#21-linux安装相关环境)
  * [2.2 windows安装相关环境](#22-windows安装相关环境)
  * [2.3 docker安装相关环境](#23-docker安装相关环境)
* [3.En-Tan-Mo Mainnet 节点安装](#3En-Tan-Mo Mainnet 节点安装)
  * [3.1 linux安装节点](#31-linux安装节点)
  * [3.2 windows安装节点](#32-windows安装节点)
* [4.钱包使用](#4钱包使用)
  * [4.1 En-Tan-Mo钱包的安装及配置](#41-En-Tan-Mo钱包的安装及配置)
  * [4.2 En-Tan-Mo钱包的使用](#41-En-Tan-Mo钱包的使用)
* [5.etm-cli介绍](#5etm-cli介绍)
  * [5.1 etm-cli的安装](#51-etm-cli的安装)
  * [5.1 etm-cli的使用](#51-etm-cli的使用)


### 1.介绍

#### 1.1 En-Tan-Mo组件版本
| 组件        | version           |
| ------------- |:-------------:|
| entanmo主链      | preview-1.0.0 |
| 侧链      | preview-1.0.0      |
| etm-cli | preview-1.0.0      |
| wallet | preview-1.0.0      |

#### 1.2 etm-js功能
etm-js是entanmo官方给开发者提供的工具库。开发者可以通过etm-js填写相关参数，快速拼装成一个请求。[示例]()

#### 1.3 开发语言要求
En-Tan-Mo区块链使用etm-vm虚拟机执行程序代码，让系统的兼容性更好。目前，etm-vm上可以直接运行nodejs代码，所以最方便的开发方式，就是直接使用nodejs开发相关程序。

其他版本的js（TypeScript,ActionScript等等）也可以通过第三方支持编写程序。
#### 1.4 开发系统要求
**entanmo区块链支持以下环境**：

Centos 7

Ubuntu 16.04（Ubuntu 16.10推荐）Ubuntu 18.04

MacOS（暂不支持）

#### 1.5其他要求
+ 数据库:   entanmo使用数据库为sqlite
+ 命令行：entanmo提供各类工具以及命令，所以要求开发者具备命令行（shell）相关知识。
+ 日志：entanmo有两大日志输出文件，一个是主链日志，一个是侧链日志，需要开发者能基于相关日志能查找相关问题。

-------------------
### 2.开发环境准备

#### 2.1 linux安装相关环境
**1.系统要求**

+ 操作系统：Linux，推荐 Ubuntu18.04 桌面版(Ubuntu16.04也可)
+ CPU：奔腾双核及以上
+ 内存：最低4G
+ 磁盘：最低50G
+ 网络：20M 光纤及以上
+ 显卡要求：POW 算力在 160MHash/s 或者与 6*RX570 相当算力或以上

**2.系统依赖安装**

	//更新源
	sudo apt-get update
	//安装lib库
	sudo apt-get install curl sqlite3 ntp wget git libssl-dev openssl make gcc g++ autoconf automake python build-essential libtool libtool-bin -y

**3.安装nodejs**

	//获取安装脚本并执行
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	//安装
	sudo apt-get install nodejs -y

> 建议Node.js版本在v8.4.0以上

**4.修改配置**

+ 修改config文件

```
//主目录下文件
-rw-rw-r--   1 wanglei wanglei   5229 Feb 15 22:24 app.js
drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:52 config
drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:24 dapps
drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:52 data
drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:38 logs
drwxrwxr-x 384 wanglei wanglei  12288 Feb 15 22:34 node_modules
-rw-rw-r--   1 wanglei wanglei 126339 Feb 15 22:34 package-lock.json
-rw-rw-r--   1 wanglei wanglei   1693 Feb 15 22:24 package.json
drwxrwxr-x  12 wanglei wanglei   4096 Feb 15 22:24 src
//如果是单机测试，请使用 config-personal.json 替换 config.json(同时也需要使用genesisBlock-personal.json 替换genesisBlock.json)
cd config
mv config.json config.json.bk && mv config-personal.json config.json
mv genesisBlock.json genesisBlock.json.bk && mv cgenesisBlock-personal.json genesisBlock.json
```

+ 运行代码 `node app.js`

```shell
> blockTick: []
> debug 2019-02-15 14:48:05 762 blocks.js:1040 apply block ok
> debug 2019-02-15 14:48:05 762 blocks.js:1055 save block ok
> -------------- round tick: 6
> debug 2019-02-15 14:48:05 763 round.js:390 Round tick completed 	> { block:
{
   		version: 0,
     	totalAmount: 0,
     	totalFee: 0,
     	reward: 600000000,
     	payloadHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
     	timestamp: 10896486,
     	numberOfTransactions: 0,
     	payloadLength: 0,
		previousBlock:'32c53caeef675cea5dd0acf7a30709d4acfbaafdda06b8743b0f869b9a8eb570',
		generatorPublicKey:'99e5d86cc35cc31d3be8ec4e4a296b080820d396a875fad2bd60e17201bf4dc5',
blockSignature:'591948fccf06b180d6c001f8706518c07e65317267cdbf500dfc656dfeb173de5c3b5ddf7bb5d34fc108321376edf736dca3f991a1b2b2adffdfa047f383790b',
     	id: 'b40c48deaeb23b7cedd59515e8665f7b347aa86f565a21cbd53283365ec3237a',
     	height: 6
     	}
    }
> info 2019-02-15 14:48:05 764 blocks.js:962 Block applied correctly 	with 0 transactions
> log 2019-02-15 14:48:05 764 blocks.js:1468 Forged new block id: 	b40c48deaeb23b7cedd59515e8665f7b347aa86f565a21cbd53283365ec3237a
> height: 6 round: 1 slot: 3632162 reward: 600000000
> [transport] 3s boardcast tr count: 0

```
如果本机只是做为测试使用，可以修改./config/miner-cfg.json 将该选项关掉

	//修改成false
	"enableGPU": true

**5.运行成功**

运行成功后区块高度会不停的变化。

	> height: 6 round: 1 slot: 3632162 reward: 600000000
	> [transport] 3s boardcast tr count: 0

**6.其他说明**

+ 其他linux系统，只要将lib安装好，可以很方便的进行开发环境的搭建。

#### 2.2 windows安装相关环境

> 注意: 由于entanmo使用了C++编译工具，在windows上安装C++编译环境是非常繁琐，而且安装失败很难清	 除，所以建议开发者使用mac或者linux系统。

**1.系统要求**

- 操作系统:  推荐使用win7 以上64位系统
- CPU：奔腾双核及以上
- 内存：最低4G
- 磁盘：最低50G
- 网络：20M 光纤及以上
- 显卡要求：POW 算力在 160MHash/s 或者与 6*RX570 相当算力或以上

**2.安装nodejs**

在[nodejs](https://nodejs.org/en/download/)官网下载指定版本，点击安装即可

**3.安装node-gyp**

> node-gyp是一种根据c++源代码编译的工具，node-gyp就是为node编译c++扩展的时候使用的编译工具。

+ 方式一:使用npm全局安装

  ```
  //请以管理员的身份运行命令后

  npm install --global --production windows-build-tools

  //显示以下提示表示安装成功

  ---------- Visual Studio Build Tools ----------

  Successfully installed Visual Studio Build Tools.

  ------------------- Python --------------------

  Python 2.7.15 is already installed, not installing again.

  Now configuring the Visual Studio Build Tools..

  All done!

  ```

+ 方式二:手动配置[详细参考](https://www.jianshu.com/p/2b831714bbff)

  //下载Microsoft Build Tools 2015
  https://www.microsoft.com/en-us/download/details.aspx?id=48159

  //下载安装 python2.7
  https://www.python.org/

  ```
  //配置
  npm config set python python2.7
  npm config set msvs_version 2015
  ```

**4.安装sqlite3**

>  SQLite是一个C语言库，它实现了一个小型、快速、独立、高可靠性、全功能的SQL数据库引擎。SQLite是世界上使用最多的数据库引擎。sqlite内置于所有手机和大多数计算机中，捆绑在人们每天使用的无数其他应用程序中。

+ 请访问下载页面下载安装包

  //下载文件
  https://www.sqlite.org/2018/sqlite-dll-win32-x86-3260000.zip
  https://www.sqlite.org/2018/sqlite-tools-win32-x86-3260000.zip

+ 创建文件夹 C:\sqlite，并在此文件夹下解压上面两个压缩文件，将得到 sqlite3.def、sqlite3.dll 和 sqlite3.exe 文件

+ 添加 C:\sqlite 到 PATH 环境变量，最后在命令提示符下，使用 **sqlite3** 命令，将显示如下结果

`````shell
C:\Users\wolomo>sqlite3
SQLite version 3.26.0 2018-12-01 12:34:55
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
`````
****

#### 2.3 docker安装相关环境
可以参考本组织另外[一个库](https://github.com/etm-dev/etm-dev-docker)

> 注意修改相关配置，才能运行

	//一个命令搞定（如果配置正确）
	docker run -it --rm --name etm-dev -v $(pwd):/etm -p 4096:4096 ray0523/etm_base /bin/bash -c "npm install https://github.com/entanmo/etm-js.git https://github.com/entanmo/etm-vm.git && npm install && node app.js"
	//如果配置不正确，进入docker环境，此镜像已经安装好了lib，然后重复mac的验证过程即可
	docker run -it --rm --name etm-dev -v $(pwd):/etm -p 4096:4096 ray0523/etm_base /bin/bash

--------------

### 3.En-Tan-Mo  Mainnet节点安装

[详细参考](https://github.com/entanmo/etm/blob/testNet/README.zh-CN.md)

#### 3.1 linux安装节点

**1.下载安装包**

下载并解压安装包，进入相应目录。

   > 注意：路径里不要有中文、特殊符号或者空格

```
wget http://www.entanmo.com/download/entanmo-ubuntu.tar.gz
tar zxvf entanmo-ubuntu.tar.gz
cd entanmo
```
**2.一键安装部署**

执行 `./deploy run`

> **命令介绍**
> `install`: 检测当前操作系统中 Node.js 以及 PM2 是否可运⾏，并按需安装
> `uninstall`: 卸载节点程序安装的 Node.js 以及 PM2
> `isinstalled`: 检测当前操作系统中 Node.js 以及 PM2 是否可⽤
> `deploy`: 通过 PM2 部署 entanmo 节点程序
> `undeploy`: 停⽌并删除之前部署的 entanmo 程序
> `isdeployed`: 检测查询 entanmo 程序是否已部署
> `startup`: 设置开机启动后部署 entanmo 程序
> `unstartup`: 设置取消开机启动后部署 entanmo 程序
> `isstartuped`: 查询是否设置过开机启动后部署 entanmo 程序
> `account*`: 配置当前节点的 mint secret
> `network*`: 配置当前节点的⽹络信息
> `config*`: 查看当前节点的配置信息

#### 3.2 windows安装节点

**1.下载安装包**

下载安装包: http://www.entanmo.com/download/entanmo-windows.zip

   解压该安装包。

> 注意：路径里不要有中文、特殊符号或者空格

**2.打开控制台**

进入entanmo-windows/entanmo/tools/deploy文件夹,打开etmConsole.cmd工具,进入控制台

**3.安装、部署、运行节点**

执行 `deploy.cmd run`

> **命令介绍**
> `install`: 检测当前操作系统中 Node.js 以及 PM2 是否可运⾏，并按需安装
> `uninstall`: 卸载节点程序安装的 Node.js 以及 PM2
> `isinstalled`: 检测当前操作系统中 Node.js 以及 PM2 是否可⽤
> `deploy`: 通过 PM2 部署 entanmo 节点程序
> `undeploy`: 停⽌并删除之前部署的 entanmo 程序
> `isdeployed`: 检测查询 entanmo 程序是否已部署
> `startup`: 设置开机启动后部署 entanmo 程序
> `unstartup`: 设置取消开机启动后部署 entanmo 程序
> `isstartuped`: 查询是否设置过开机启动后部署 entanmo 程序
> `account*`: 配置当前节点的 mint secret
> `network*`: 配置当前节点的⽹络信息
> `config*`: 查看当前节点的配置信息





### 4.En-Tan-Mo钱包

####4.1En-Tan-Mo钱包的安装及配置

**1.使用git工具clone钱包代码**

	git clone  -b dev2.0 https://github.com/entanmo/etm-wallet.git

**2.修改配置**

	cd etm-wallet
	vi config/dev.env.js
		BASE_API:'"https://xxx.xxx.xxx.xx:4096"'//修改ip地址为本地etm主链ip端口

**3.编译运行**

	npm install //安装库文件
	npm run dev //运行
	-----------------------------------------------------------------
	//or docker运行
	docker run -d --name etm-wallet -w /etm -v $(pwd):/etm -p 8080:8080 node /bin/bash -c "npm install && npm run dev"

**4.验证**

	访问http://0.0.0.0:8080 显示钱包网页，即为编译成功

####4.2En-Tan-Mo钱包的使用

**1.基本操作**

	1.进入钱包首页
	2.点击新建账号
	3.按照要求完成注册（牢记密钥）
	4.牢记密钥(密匙无法重新获取,请妥善保存)
	5.登录
	6.个人中心查看钱包地址（类似：ANZccyU3CFJSmS2bfC5MRneoaCzAXEK5ki）

**2.获取私链代币**

一般新建账号是没有代币的，如果是新启动的私链，entanmo官方为开发者创建了一个超级账号，该账户中有非常多的代币，可以提供开发者进行测试

	//该超级账号中有非常多的测试币，只在测试网中有效
	race forget pause shoe trick first abuse insane hope budget river enough

**3.其他**

> config/config.json中101个出块节点是有代币的：

	//可以在config/config.json中查看101个出块节点私钥
	...
	"forging": {
	"secret": [
	  "run sheriff differ lonely turn asset remain gorilla shine magic wing remember",
	  "moon become interest business ability work fetch stock soldier inmate hen trim",
	  "bottom poverty escape desk employ jar produce whisper wasp ensure resource rotate",
	  "belt among attract burger border win timber reason flag length caught glue",
	  "when move electric method unique aerobic odor era brush horse fly cute",
	  "level coach sort sausage submit utility debris concert morning canal various measure",
	  "bench track angle error blood illness curtain input this shoulder disease sand",
	  "still leisure gold cream unfold saddle way slot immune spray address still",
	  "erase express pioneer side announce liberty carbon volcano apart life practice visit",
	  "congress square glory convince hospital language rate sadness blue fame man battle",
	  "retire virus concert prison exotic unhappy toward rebel receive wide sleep drift",
	  "exact gas judge doll nasty hospital punch physical library cluster lab level",
	  "enact melt usual tumble result unfair waste fat lawsuit paddle baby gasp",
	  ...

--------------

### 5.etm-cli介绍

####5.1etm-cli的安装

**1.将项目克隆到本地**

```
//clone代码
git clone https://github.com/etm-developer/etm-cli.git
```

**2.安装相关依赖**

```
//进入对应文件夹
cd etm-cli

//安装相关依赖
npm install
```

**3.设置环境变量**

	//将目录下的bin目录设置到path环境下
	set xx/xx/etm-cli/bin to path //伪代码，根据不同系统设置不同

####5.2etm-cli的使用

> 格式 `etm-cli [options][command]`

**1.指令**

	options:
		-V, --version                          版本号
		-H, --host <host>                      指定host(default: 127.0.0.1)
		-P, --port <port>                      指定端口(default: 4096)
		-M, --main                             Specify the mainnet, default: false
		-h, --help                             帮助

	command:
		getheight                              get block height
		getblockstatus                         get block status
		openaccount [secret]                   open your account and get the infomation by secret
		openaccountbypublickey [publickey]     open your account and get the infomation by publickey
		getbalance [address]                   get balance by address
		getaccount [address]                   get account by address
		getvoteddelegates [options] [address]  get delegates voted by address
		getdelegatescount                      get delegates count
		getdelegates [options]                 get delegates
		getvoters [publicKey]                  get voters of a delegate by public key
		getdelegatebypublickey [publicKey]     get delegate by public key
		getdelegatebyusername [username]       get delegate by username
		getblocks [options]                    get blocks
		getblockbyid [id]                      get block by id
		getblockbyheight [height]              get block by height
		getpeers [options]                     get peers
		getunconfirmedtransactions [options]   get unconfirmed transactions
		gettransactions [options]              get transactions
		gettransaction [id]                    get transactions
		sendmoney [options]                    send money to some address
		sendasset [options]                    send asset to some address
		registerdelegate [options]             register delegate
		listdiffvotes [options]                list the votes each other
		upvote [options]                       vote for delegates
		downvote [options]                     cancel vote for delegates
		setsecondsecret [options]              set second secret
		registerdapp [options]                 register a dapp
		deposit [options]                      deposit assets to an app
		dapptransaction [options]              create a dapp transaction
		lock [options]                         lock account transfer
		getfullblockbyid [id]                  get full block by block id
		getfullblockbyheight [height]          get full block by block height
		gettransactionbytes [options]          get transaction bytes
		gettransactionid [options]             get transaction id
		getblockbytes [options]                get block bytes
		getblockpayloadhash [options]          get block bytes
		getblockid [options]                   get block id
		verifybytes [options]                  verify bytes/signature/publickey
		contract [options]                     contract operations
		crypto [options]                       crypto operations
		dapps [options]                        manage your dapps
		creategenesis [options]                create genesis block
		peerstat                               analyze block height of all peers
		delegatestat                           analyze delegates status
		ipstat                                 analyze peer ip info

**2.使用案例**

+ 查询主链ip端口

```
etm-cli -H xxx.xxx.xxx.xxx -P 8096 getheight //ip 端口是主链的ip端口

56110
```

+ 得到区块状态

```
etm-cli -H xxx.xxx.xxx.xxx -P 8096 getblockstatus
> {"success": true,
	>	  "height": 56113,
	>	  "fee": 10000000,
	>	  "milestone": 0,
	>	  "reward": 300000000,
	>	  "supply": 10016816200000000
}
```
