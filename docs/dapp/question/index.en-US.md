# Q&A

<img src="/images/dapp/dapp07.jpg"  >

In this document, we describe common DApp development problems and their solutions.

**Which directory is Dapp installed in?**

DApp installed in the `ETM_HOME/dapps/your-dapp-id` directory (`your-dapp-id` was generated when you registered Dapp)

The place where the logs files of the main project are stored (`ETM_HOME/logs/`).

View all registered Apps: `curl http://localhost:4096/api/dapps`
All installed DApps: `curl http://localhost:4096/api/dapps/installed`
See [ http interface documentation](./http_api.md) for specific interfaces

**Log file**
If you want to view the DApp log, enter `ETM_HOME/dapps/your-dapp-id/logs/debug.log.` If you want to view the DApp main chain log, go into `ETM_HOME/logs/`, you can find the log file inside.
Specifically, you can refer to the [log chapters](./log.md).

**General Document Provisions**

The following documents refer to the files under `ETM_HOME/dapps/your-dapp-id/`to ensure that you have modified the correct files and restarted the DAPP side chain after modification.

	config.json = ETM_HOME/dapps/your-dapp-id/config.json

### 1.Dapp could not start


#### 1.1 **The peers in config. json are not configured correctly**

The peers configuration in the `config.json` file is either not configured, or at least provides one peer configuration. Do not write an empty array:

Remove the `peers` property:

```diff
- {
-   "peers": [],
-   "secrets": [
-     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
-     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
-     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
-   ]
- }
+ {
+   "secrets": [
+     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
+     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
+     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
+   ]
+ }
```

Or provide at least one peer:
```diff
- {
-   "peers": [],
-   "secrets": [
-     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
-     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
-     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
-   ]
- }
+ {
+   "peers": [{"ip":"127.0.0.1","port":4096}],
+   "secrets": [
+     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
+     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
+     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
+   ]
+ }
```

<br/><br/>

#### 1.2 **The directory structure of DApp must be correct**

The minimum file configuration is as follows:
1. config.json -> configuration file<br>
2. dapp.json   -> Configuration of peer and delegate<br>
3. init.js     -> Initialize configuration, which defines transaction costs and contracts <br>
4. model     ->  Definition model <br>
5. contract ->  Defining contracts<br>
6. interface  -> Defining interfaces <br>



#### 1.3 **Check that DApp is registered and started**
Make sure your DApp file is in `ETM_HOME/dapps/your-dapp-id` directory. Open the link below to see all installed dapp: `curl http://localhost:4096/api/dapps/installed`


#### 1.4 **ETM_HOME/public/dist/dapps This directory must exist**

Ensure that the `ETM_HOME/public/dist/dapps` directory must exist and, if not, create it, such as running `mkdir-p public/dist/dapp` under Linux

#### 1.5 **The string type data in the Dapp model has no write length**

The `model/` directory in the DApp directory stores all the definitions of custom tables and table fields. If you define a column of `string` type, you must also provide the length attribute for that column!

The wrong way:
```js
module.exports = {
  name: 'articles',
  fields: [
    {
      name: 'tid',
      type: 'String'
    }
  ]
}
```

The right way:
```js
module.exports = {
  name: 'articles',
  fields: [
    {
      name: 'tid',
      type: 'String',
      length: 64
    }
  ]
}
```

<br/><br/>

### 2.DApp Can't Create Blocks
#### 2.1 **Config. json does not have enough DApp agent secret**

Make sure that the `config.json` file contains enough DApp proxy passwords. In addition, the DApp proxy password in `config.json` should be consistent with the public key in `dapp.json`. If you need to modify the public key in `dapp. json`, **you need to re-register DApp and restart ETM node after modification.**

> notes:The agent password that the specified DApp needs to provide when registering


```diff
- {
-   "peers": [{"ip":"127.0.0.1","port":4096}],
-   "secrets": [
-   ]
- }
+ {
+   "peers": [{"ip":"127.0.0.1","port":4096}],
+   "secrets": [
+     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
+     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
+     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
+     "ribbon crumble loud chief turn maid neglect move day churn share fabric",
+     "scan prevent agent close human pair aerobic sad forest wave toe dust"
+   ]
+ }
```


<br/><br/>

### 3.Transaction failure
#### 3.1 **Previous transaction validation failures**
If your transaction is not executed because it relies on another transaction, the other transaction has not been submitted and confirmed (written into the side chain block).

__Solution:__
Wait **10 seconds** until the previous transaction has been confirmed, and then resubmit your transaction. Blocks generate one every 10 seconds. As long as the previous transaction is still in the unrecognized transaction (http://localhost:4096/api/transactions/unconfirmed), you need to wait.


#### 3.2 **Send the transaction to the wrong API address**

Since DAPP will add many new API addresses, your request may be sent to other Dapp API addresses:

Main chain:

- Signed (HTTP __POST__): `http://localhost:4096/peer/transaction`
- Unsigned (HTTP PUT): `http://localhost:4096/api/transactions`

Side chain (DApp):

- Signed (HTTP PUT): `http://localhost:4096/api/chains/your-dapp-name/transactions/signed`
- Unsigned (HTTP PUT): `http://localhost:4096/api/chains/your-dapp-name/transactions/unsigned`



<br/><br/>
### 4.Unable to register contract

#### 4.1 **Control code must be no less than 1000**
The contract serial number under 1000 is the system reserved contract serial number. Please use the contract serial number above 1000.

```diff
# init.js file

module.exports = async function () {
  app.logger.info('enter dapp init')

- app.registerContract(800, 'cctime.postArticle')
+ app.registerContract(1002, 'cctime.postArticle')

}
```

#### 4.2 **The contract does not point to the correct files and functions**

The string `news.postArticle`indicates that there must be a `news.js` file in the `contract/`directory and that the `news.js` file must contain a `postArticle` function.

Reference [demo](./demo.md)

```js
registerContract(1001, 'news.postArticle')
```

<br/><br/>

### 5.Request 404
#### 5.1 **Check the Dapp name inside the request URL**

Check again if you are accessing the correct DApp. Especially check your-dapp-id inside your request.(`http://localhost:4096/api/dapps/your-dapp-id/endpoint`).

View all installed DApps:

```bash
curl http://localhost:4096/api/dapps/installed

# returns:
{
  "success":true,
  "chains":[
    {
      "tid":"23f3c877d9a4163d14cb90a10a8132d9b5ae2d25cf568d994720acd85a9272b1",
      "name":"test-rTGrJniQQEys",
      "address":"CNKb1p78kKY9DGT7eNfYQ4Xe2r1B9T91nB",
      "desc":"A hello world demo for asch dapp",
      "link":"https://test-wnNethfKMmTk.zip",
      "icon":"http://o7dyh3w0x.bkt.clouddn.com/hello.png",
      "unlockNumber":3,
      "_version_":1
    }
  ]
}
```

<br/><br/>
### 6.Failure to run npm install in ETM directory
#### 6.1 **The name of the parent directory contains spaces**

If the parent directory name of ETM contains spaces, `npm install` will not work properly:

Error:
```
configure: error: The build directory contains whitespaces - This can cause tests/installation to fail due to limitations of some libtool versions
Makefile:61: recipe for target 'libsodium' failed
make: *** [libsodium] Error 1
/home/a1300/test/asch 2/node_modules/sodium/install.js:287
            throw new Error(cmdLine + ' exited with code ' + code);
            ^
```

Solution:

- Remove the space in the parent directory name

<br/><br/>

### 7.Request sent to side chain failed
####7.1**Check ports and configuration**

If you run ETM locally, the default port is `4096`.

- Check if you have changed the port number in the `config.json` configuration file?
- Do you start Dapp with commands like `node app.js -- port 1234`, then call the interface life, still using port 4096?
- Do you use`. /etmd start` as a backend service to start the ETM process? Check the `etm.pid` file and see which port the current ETM is listening on: `netstat-tulpn | grep-f etm.pid`.


<br/><br/>


### 8.Side chain recharge problem
Side chain recharging process

1. Main chain account transfer to side chain contract publishing account of ETM
2. Side chain system checks that the contract receives ETM, and then according to the received ETM, it enters the corresponding tokens into the user account (the same as the main chain account).

**Question:**
Since the side chain is a separate dapp, fees are required for every step of operation. Because users recharge the accounts in the dapp, in fact, the two account systems exchange value. First, the main chain converts money, and then the side chain recharges. Because the user has no token in the side chain, so the user can not pay the handling fee, so the user recharge will not be completed.

**Solution:**
Side chains default to give users a certain amount of tokens (such as a handling fee) when they recharge.

### 9.Float accuracy overflow problem
There will be accuracy overflow when using float. It is suggested that float should not be used.
### 10.Boolean value problem of contract storage
sqlite3 may not recognize `false` or `true` in different versions.
Only `0` or`1` can be used

### 11.Old value problem

	TODO
### 12.Time stamp problem
	TODO
### 13.To be continued

