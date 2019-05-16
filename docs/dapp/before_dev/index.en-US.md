# Ready

<img src="/images/dapp/dapp01_en.jpg"  >

This chapter introduces the development skills and hardware facilities that DAPP developers need to know.


* 1.[Introduction](#1Introduction)
  * [1.1 En-Tan-Mo Component Version](#11-En-Tan-Mo Component Version)
  * [1.2 etm-js](#12-etm-js)
  * [1.3 Developing Language Requirements](#13-Developing Language Requirements)
  * [1.4 Development System Requirements](#14-Development System Requirements)
  * [1.5 Other Requirements](#15-Other Requirements)
* [2.System Requirements and dependencies](#2System Requirements and dependencies)
  * [2.1 Linux Requirements](#21-Linux Requirements)
  * [2.2 windows Requirements](#22-windows Requirements)
  * [2.3 docker Requirements](#23-docker Requirements)
* [3. Install En-Tan-Mo Mainnet Node](#3 Install En-Tan-Mo Mainnet Node)
  * [3.1 Install Node in Linux Environment](#31-Install Node in Linux Environment)
  * [3.2 Install Node in Windows Environment](#32-Install Node in Windows Environment)
* [4.En-Tan-Mo Wallet](#4En-Tan-Mo Wallet)
  * [4.1 Install En-Tan-Mo Wallet](#41-Install En-Tan-Mo Wallet)
  * [4.2 Use En-Tan-Mo Wallet](#42-Use En-Tan-Mo Wallet)
* [5.etm-cli Introduction](#5etm-cli Introduction)
  * [5.1 Install etm-cli](#51-Install etm-cli)
  * [5.2 Use etm-cli](#52-Use etm-cli)


### 1.Introduction

#### 1.1 En-Tan-Mo Component Version
| Component | version           |
| ------------- |:-------------:|
| entanmo Main chain | preview-1.0.0 |
| sidechain | preview-1.0.0      |
| etm-cli | preview-1.0.0      |
| wallet | preview-1.0.0      |

#### 1.2 etm-js
etm-js is an official tool library provided by entanmo to developers. Developers can quickly assemble a request by filling in relevant parameters through etm-js.[Demo]()

#### 1.3 Developing Language Requirements
En-Tan-Mo block chain uses etm-vm virtual machine to execute program code, which makes the system more compatible. Noejs code can be run directly on etm-vm, so the most convenient way to develop is to use nodejs directly to develop related programs.

Other versions of JS (TypeScript, ActionScript, etc.) can also be supported with third-party.
#### 1.4 Development System Requirements
**The entanmo blockchain supports the following environments:**

+ Centos 7
+ Ubuntu 16.04(Ubuntu 16.10 recommended )/Ubuntu 18.04
+ windows

#### 1.5 Other Requirements
+ database:  uses SQLite as the database.
+ command line：Entanmo provides a variety of tools and commands, so developers are required to have command line (shell) knowledge.
+ log：Entanmo has two main log output files, one is the mainchain log, the other is the sidechain log, which requires developers to be able to find related issues based on the relevant log.

-------------------
### 2.System Requirements and dependencies

#### 2.1 Linux Requirements
**1.System Requirements**

+ OS : Linux，recommend Ubuntu18.04 LTS(Ubuntu16.04 supported)
+ CPU :Pentium dual-core or above
+ memory : the mininum is 4G
+ Hard disk : the mininum is  50G
+ Bandwidth :  fiber optics of 20M and above
+ GPU :  The computing power of POW should be above 160MHash/s or be equivalent to 6*RX570 and above

**2.Install dependencies**

	//update source file
	sudo apt-get update
	//Install dependency package
	sudo apt-get install curl sqlite3 ntp wget git libssl-dev openssl make gcc g++ autoconf automake python build-essential libtool libtool-bin -y

**3.Install Node.js**

	//Install nvm
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	//Install
	sudo apt-get install nodejs -y

> EnTanMo support the latest LTS version of Node.js(current version is v8.11.3). Please make sure that you install the right version.

**4.Modify configuration**

+ modify config.json

```
// Documents under Home Directory
-rw-rw-r--   1 wanglei wanglei   5229 Feb 15 22:24 app.js
drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:52 config
drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:24 dapps
drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:52 data
drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:38 logs
drwxrwxr-x 384 wanglei wanglei  12288 Feb 15 22:34 node_modules
-rw-rw-r--   1 wanglei wanglei 126339 Feb 15 22:34 package-lock.json
-rw-rw-r--   1 wanglei wanglei   1693 Feb 15 22:24 package.json
drwxrwxr-x  12 wanglei wanglei   4096 Feb 15 22:24 src
// If it's a stand-alone test, use config-personal.json instead of config.json (you also need to use genesisBlock-personal.json instead of genesisBlock.json)
cd config
mv config.json config.json.bk && mv config-personal.json config.json
mv genesisBlock.json genesisBlock.json.bk && mv cgenesisBlock-personal.json genesisBlock.json
```

+ Start the node `node app.js`

```
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

If the machine is only used for testing, you can modify`. /config/miner-cfg.json` to turn this option off

```
//modify to false
"enableGPU": true
```

**5.Working Successfully**

After successful operation, the block height will change continuously.

	> height: 6 round: 1 slot: 3632162 reward: 600000000
	> [transport] 3s boardcast tr count: 0

**6.Other instructions**

+ Other Linux systems, as long as the lib is installed, can easily build the development environment.

#### 2.2 windows Requirements

> Note: Because entanmo uses C++ compiler tools, it is very tedious to install C++ compiler environment on windows, and installation failure is difficult to clear away, so it is recommended that developers use MAC or Linux system.

**1.System Requirements**

- OS : Linux，recommend win7 64-bit system or above
- CPU :Pentium dual-core or above
- memory : the mininum is 4G
- Hard disk : the mininum is  50G
- Bandwidth :  fiber optics of 20M and above
- GPU :  The computing power of POW should be above 160MHash/s or be equivalent to 6*RX570 and above

**2.Install Node.js**

Download the specified version on the [Node.js official website](https://nodejs.org/en/download/) and click Install

**3.Install node-gyp**

> Node-gyp is a compiling tool based on C + + source code. node-gyp is a compiling tool used when node compiles C + + extensions.

[More Detailes](https://github.com/nodejs/node-gyp)

+ Option1 :use NPM

  Install all the required tools and configurations using Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) using `npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe (run as Administrator).

  //The following prompt is displayed to indicate successful installation

  ```
  ---------- Visual Studio Build Tools ----------
  Successfully installed Visual Studio Build Tools.
  ------------------ Python --------------------
  Python 2.7.15 is already installed, not installing again.
  Now configuring the Visual Studio Build Tools..
  All done!
  ```

+ Option2:Install tools and configuration manually

  + Install Visual C++ Build Environment: [Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools) (using "Visual C++ build tools" workload) or [Visual Studio 2017 Community](https://visualstudio.microsoft.com/pl/thank-you-downloading-visual-studio/?sku=Community) (using the "Desktop development with C++" workload)
  + Install [Python 2.7](https://www.python.org/downloads/) (`v3.x.x` is not supported), and run `npm config set python python2.7` (or see below for further instructions on specifying the proper Python version and path.)
  + Launch cmd, `npm config set msvs_version 2017`

  If the above steps didn't work for you, please visit [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules) for additional tips.

  To target native ARM64 Node.js on Windows 10 on ARM, add the components "Visual C++ compilers and libraries for ARM64" and "Visual C++ ATL for ARM64".

  //configure

  ```
  npm config set python python2.7
  npm config set msvs_version 2015
  ```

**4.Install sqlite3**

>  SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. SQLite is the most used database engine in the world. SQLite is built into all mobile phones and most computers and comes bundled inside countless other applications that people use every day.

+ Please visit the download page to download the installation package.

  //download page
  https://www.sqlite.org/2018/sqlite-dll-win32-x86-3260000.zip
  https://www.sqlite.org/2018/sqlite-tools-win32-x86-3260000.zip

+ Create a folder C:\sqlite, and decompress the two compressed files under this folder. You will get sqlite3. def, sqlite3. dll and sqlite3. exe files.

+ Add C:\sqlite to the PATH environment variable, and at the command prompt, use the **sqlite3** command to display the following results

  `````shell
  C:\>sqlite3
  SQLite version 3.26.0 2018-12-01 12:34:55
  Enter ".help" for usage hints.
  Connected to a transient in-memory database.
  Use ".open FILENAME" to reopen on a persistent database.
  `````

****

#### 2.3 docker Requirements
[More Details](https://github.com/etm-dev/etm-dev-docker)

> Pay attention to modifying the configuration

	# Installation command
	docker run -it --rm --name etm-dev -v $(pwd):/etm -p 4096:4096 ray0523/etm_base /bin/bash -c "npm install https://github.com/entanmo/etm-js.git https://github.com/entanmo/etm-vm.git && npm install && node app.js"
	# If the configuration is incorrect, enter the docker environment, the image has been installed lib, and then repeat the mac verification process.
	docker run -it --rm --name etm-dev -v $(pwd):/etm -p 4096:4096 ray0523/etm_base /bin/bash

--------------

### 3.Install En-Tan-Mo Mainnet Node

[More Details](https://github.com/entanmo/etm/blob/testNet/README.zh-CN.md)

#### 3.1 Install Node in Linux Environment

**1.Download installation package**

   > Note: There should be no special symbols or spaces in the path.

```
# Download the installation package.
wget http://www.entanmo.com/download/entanmo-ubuntu.tar.gz
# Unzip the installation package.
tar zxvf entanmo-ubuntu.tar.gz
# Enter the corresponding directory
cd entanmo
```
**2.Start the node**

start`./deploy run`

> **Command introduction**
> `install`: Check whether Node.js and PM2 are shippable in the current operating system and install them as needed
> `uninstall`: Uninstall installed Node.js and PM2
> `isinstalled`: Check whether Node.js and PM2 are available in the current operating system
> `deploy`: Deployment of entanmo node program through PM2
> `undeploy`: Stop and delete the previously deployed entanmo program
> `isdeployed`: Detecting and querying whether entanmo programs have been deployed
> `startup`: Setting up entanmo program after boot-up
> `unstartup`: Cancel deploying entanmo program after boot-up
> `isstartuped`: Query whether the entanmo program has been deployed after boot-up
> `account*`: Configure the mint secret of the current node
> `network*`: Configure the network information of the current node
> `config*`: View the configuration information of the current node

#### 3.2  Install Node in Windows Environment

**1.Download installation package**

Download installation package at : http://www.entanmo.com/download/entanmo-windows.zip

Unzip the installation package.

> Note: There should be no special symbols or spaces in the path.

**2.Opens the console**

Enter the entanmo-windows/entanmo/tools/deploy folder, open the etmConsole.cmd tool, and enter the console.

**3.Start the node**

start  `deploy.cmd run`

> **Command introduction**
> `install`: Check whether Node.js and PM2 are shippable in the current operating system and install them as needed
> `uninstall`: Uninstall installed Node.js and PM2
> `isinstalled`: Check whether Node.js and PM2 are available in the current operating system
> `deploy`: Deployment of entanmo node program through PM2
> `undeploy`: Stop and delete the previously deployed entanmo program
> `isdeployed`: Detecting and querying whether entanmo programs have been deployed
> `startup`: Setting up entanmo program after boot-up
> `unstartup`: Cancel deploying entanmo program after boot-up
> `isstartuped`: Query whether the entanmo program has been deployed after boot-up
> `account*`: Configure the mint secret of the current node
> `network*`: Configure the network information of the current node
> `config*`: View the configuration information of the current node

+++++++++++

### 4.En-Tan-Mo Wallet

####4.1 Install En-Tan-Mo Wallet

**1. Use git tool clone wallet code**

	git clone  -b dev2.0 https://github.com/entanmo/etm-wallet.git

**2. Modify configuration**

	cd etm-wallet
	vi config/dev.env.js
		BASE_API:'"https://xxx.xxx.xxx.xx:4096"'//Modify IP address to local ETM mainchain IP port

**3. Compile and run**

	npm install //Installation Lib
	npm run dev //start
	-----------------------------------------------------------------
	//or docker start
	docker run -d --name etm-wallet -w /etm -v $(pwd):/etm -p 8080:8080 node /bin/bash -c "npm install && npm run dev"

**4.debug**

Visit http://0.0.0.0:8080 to display wallet pages

####4.2 Use En-Tan-Mo Wallet

**1.basic operation**

1. Go to the home page of your wallet
2. register new account
3. Complete registration as required (remember secret key)
4. Saving secret key (Keys cannot be retrieved, please save properly)
5. Login
6. View wallet address in personal center(example：ANZccyU3CFJSmS2bfC5MRneoaCzAXEK5ki)

**2.Getting Private blockchain Token**

Generally, there is no token for a new account. If it is a newly launched private blockchain , entanmo officially creates a super account for developers. There are many tokens in this account, which can be tested by developers.

> secret key : race forget pause shoe trick first abuse insane hope budget river enough

**3.Additional Things**

> there are 101 out-of-block nodes in config/config.json have tokens

	//101 out-of-block node secret keys can be viewed in config/config.json
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

### 5.etm-cli Introduction

####5.1 Install etm-cli

**1.Use git tool clone etm-cli code**

```
//clone Code
git clone https://github.com/etm-developer/etm-cli.git
```

**2.Install dependencies**

```
//Enter the corresponding folder
cd etm-cli

//Install dependencies
npm install
```

**3.Setting environment variables**

	//Set the bin directory to environment variables
	set xx/xx/etm-cli/bin to path //Pseudo-code, depending on different system settings

####5.2 Use etm-cli

> Template   `etm-cli [options][command]`

**1.instruction**

	options:
		-V, --version                          Version information
		-H, --host <host>                      Specify host(default: 127.0.0.1)
		-P, --port <port>                      Specify Port(default: 4096)
		-M, --main                             Specify the mainnet, default: false
		-h, --help                             Help information

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

**2.Simple Demo**

+ Query Blockchain Height

	etm-cli -H xxx.xxx.xxx.xxx -P 8096 getheight //use  Mainnet ip port
	> 56110
+ Get blockchain status

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
