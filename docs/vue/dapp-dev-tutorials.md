# En-Tan-Mo DApp 核心开发流程解析

## 1.准备工作


`基础知识`：明白什么是区块链？什么是侧链？怎么用 Linux？怎么用 Nodejs？Bitcoin 的基本运行原理？什么是共识？什么是 DPoS？什么是受托人？什么是主密码？什么是私钥、公钥、地址？什么是创世块？什么是资产？这些弄明白了（最起码得大体了解）再往下看，否则就是事倍功半，真没必要往下看了。

`概念理解`：ETM 的 DApp 是运行在侧链上的，每个 DApp 也可以简单理解为一条侧链，具有区块链的基本属性，比如共识机制（默认是dpos，高端玩家可以定制自己的共识算法）、区块信息、转账交易记录、P2P广播通讯、数据库文件等，跟 ETM 主链有相同的加密算法、地址生成算法，也就是说同一个账户在主链和 DApp 中是通用的（通用指的是同一个密码登陆进去后地址相同）。

`OS`：Ubuntu 14.04.x 或者 16.04.x(物理机、虚拟机或者 Bash on Ubuntu/Windows都可以)

`IDE`：vscode

`nodejs`： 8.4.0

`npm`：5.3.0

在开发期间遇到的任何的技术问题都可以去 https://github.com/entanmo/etm/issues 查找或者创建新的 issue。

> `友情提示`：区块链是块大蛋糕，但吃之前先给自己做个评估，看是否有能力吃的下、能吃多少、是否能吃的顺心。

## 2.搭建本地 Localnet

Localnet 简单理解就是 ETM 私有链，这里是为了方便 DApp 开发而搭建的。Localnet上的 DApp 如果开发、测试顺利通过，相当于整个 DApp 已完成 90% 的工作。

```
# Install dependency package
sudo apt-get install curl sqlite3 ntp wget git libssl-dev openssl make gcc g++ autoconf automake python build-essential -y
# libsodium for ubuntu 14.04
sudo apt-get install libtool -y
# libsodium for ubuntu 16.04
sudo apt-get install libtool libtool-bin -y

# Install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
# This loads nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install node and npm for current user.
nvm install v8
# check node version and it should be v8.x.x
node --version

# git clone sourece code
git clone https://github.com/entanmo/etm && cd etm

# Install node packages
npm install
至此，完成localnet服务端部分的构建。
```

```
# Web Wallet
git clone https://github.com/entanmo/etm-wallet && cd etm-wallet

npm install bower -g
npm install browserify -g
npm install yarn  -g

yarn install


npm run build
gulp build-test #This make the front-end files in public dir.
至此，完成localnet前端页面（钱包UI）的构建。
```

```
// 启动etm
cd etm && node app.js // 日志打印到屏幕终端，ctrl+c结束进程
或者其它的启动方式，比如pm2 start app.js


启动 etm 钱包
cd  etm-wallet  && npm run dev

```
然后在浏览器中打开 ```http://localhost:8080```，如果能看到etm钱包登陆页面说明localnet的搭建和启动成功（localnet的创世账户密码："someone manual strong movie roof episode eight spatial brown soldier soup motor"，里面有一亿ETM）。如果页面报错，则需要检查app.js进程是否存在、日志报错信息等。


## 3.注册并启动第一个 DApp

### 3.1 利用模板启动第一个 DApp
etm作为一个区块链开发平台，为开发者提供了一个安全且高性能的虚拟机（etm-sandbox）以及一系列的内部接口、框架等。其中的一个脚手架就是利用模板来生成自定义的 DApp ，通过回答几个问题就可以完成 DApp 框架代码的开发工作。
模板包含了启动一个DApp 需要的最少数据

#### 3.1.1 生成 DApp 元信息(创世块）

```
// 生成 5 个受托人账号
dev@MiAir:~/Codes/github/entanmo/etm$ etm-cli crypto -g
? Enter number of accounts to generate 5
[ { address: 'A9pDhjc7NuYMWYLxkgAgVmHE2NQ7diMcWX',
    secret: 'fit night someone unveil dwarf believe middle evidence puzzle hotel common choose',
    publicKey: 'afdf69f0da9ff333218f2cd10cb0a907c2e76788f752b799cb1dab3a9f03bf63' },
  { address: 'A2jvQUNowLgP9hHMN3tSCAUkakuigGRytB',
    secret: 'lawsuit ride civil slice kitchen unfold unable lumber prevent suspect finger chunk',
    publicKey: '67d52a0265f9e5366660c8b384cee56d3f8b5737b2dd3c617d22df83b5ebef02' },
  { address: 'A7JjHgx7ACCJ6AxypBn4Qt9NrGaY4JuZDF',
    secret: 'absurd sweet blast dinner battle zero ladder steak coral fork venture coffee',
    publicKey: '39c2322600a0c81ecfa97119ec8e2d5bfb73394914d92b54e961846a987e4e22' },
  { address: 'AMu7kuP9TjywkUQQQgALid96So2VCve5QB',
    secret: 'topic ramp throw cloud moment jungle bar series task protect erupt answer',
    publicKey: '4740d2c16bf6c5a174eba1e0f859253a64851d30acbc9655b01394af82d3e325' },
  { address: 'A9BzaJDkyzb9RVAFjsePMemSVXMDLiQpjJ',
    secret: 'shoot tired know dish rally kiwi snack patrol bunker ocean panel this',
    publicKey: 'b433c226645981477642491f77de7b8d63274aa51f932bbe1fe3f445a8aaecc9' } ]
Done
```

```
// 根据模板和自定义参数生成自己的dapp框架，包含创世块、配置文件、数据和合约、接口、日志等目录
cd dapps
mkdir hello-dapp && cd hello-dapp
dev@MiAir:~/Codes/github/entanmo/etm/dapps$ etm-cli dapps -a
Copying template to the current directory ...
? Enter DApp name hello-dapp
? Enter DApp description hello-dapp.org
? Enter DApp tags news
? Choose DApp category News
? Enter DApp link http://github/entanmo/hello-dapp/master.zip
? Enter DApp icon url http://a.com/x.png
? Enter public keys of dapp delegates - hex array, use ',' for separator afdf69f0da9ff333218f2cd10cb0a907c2e76788f752b799cb1dab3a9f03bf63,67d52a0265f9e5366660c8b384cee56d3f8b5737b2dd3c617d22
df83b5ebef02,39c2322600a0c81ecfa97119ec8e2d5bfb73394914d92b54e961846a987e4e22,4740d2c16bf6c5a174eba1e0f859253a64851d30acbc9655b01394af82d3e325,b433c226645981477642491f77de7b8d63274aa51f932bb
e1fe3f445a8aaecc9
? How many delegates are needed to unlock asset of a dapp? 3
 DApp meta information is saved to ./dapp.json ...
? Enter master secret of your genesis account [hidden] //这里输入的密码为：'almost journey future similar begin type write celery girl month forget breeze'
? Do you want publish a inbuilt asset in this dapp? Yes
? Enter asset name, for example: BTC, CNY, USD, MYASSET ETM
? Enter asset total amount 100000000
? Enter asset precision 8
New genesis block is created at: ./genesis.json
// 生成的文件如下
dev@MiAir:~/Codes/github/entanmo/etm/dapps/hello-dapp$ ls
config.json  contract  dapp.json  genesis.json  init.js  interface  model  public
```

#### 3.1.2 注册 DApp 到 Localnet 上

```
dev@MiAir:~/Codes/github/entanmo/etm/dapps/hello-dapp$ etm-cli registerdapp -f dapp.json -e "almost journey future similar begin type write celery girl month forget breeze"
// 返回结果为dappId
75d084dc91221b380e7a3c6b3b7467935572b4ebaa1e9a3db91e1239377c1fed
```

此时钱包的“应用列表”就可以看到该应用了。


将 hello-dapp 目录改名为 75d084dc91221b380e7a3c6b3b7467935572b4ebaa1e9a3db91e1239377c1fed,这样就完成了 DApp 在本地节点的安装（整个过程是手工安装，以后正式上线后，其他节点安装时无须这么麻烦，只需要在页面点击就可以安装）。

```
cd ..
mv hello-dapp 75d084dc91221b380e7a3c6b3b7467935572b4ebaa1e9a3db91e1239377c1fed
```

#### 3.1.3 启动 DApp

重启 ETM 服务，默认会加载 dapps 目录下的所有的 DApp。此时 DApp 中只有模板预置的信息，虽然此时没有自定义的数据、合约、接口等信息，但 DApp 已经是一条具备最小功能的侧链了，只需要配置好受托人就可以产块和转账。
此时钱包的“已安装应用列表”就可以看到该应用了。

启动后，dapps/75d084dc91221b380e7a3c6b3b7467935572b4ebaa1e9a3db91e1239377c1fed下会多出一个 `blockchain.db` 文件。DApp 第一次启动时会创建两种表.

1. 用户自定义表，由model下的数据模型文件决定，

2. etm_sandbox预置表，这些都是区块链的系统表。

目前我们这个 DApp 的 `blockchain.db` 包含如下表：

`accounts` DApp 内账户信息，etm_sandbox预置

`blocks`  DApp 区块表，etm_sandbox预置

`domains` 域名表，非etm_sandbox预置表，而是根据model下的 `domain.js` 定义生成的表，可以删除

`transactions` DApp 交易表，etm_sandbox预置

`variables` DApp 变量表，etm_sandbox预置

`balances` DApp 余额表，etm_sandbox预置

`deposits` 主链往 DApp 上充值记录表，etm_sandbox预置

`round_fees` DApp 的dpos共识下，每轮的手续费详情表，etm_sandbox预置

`transfers` DApp 内部转账表，etm_sandbox预置

浏览器打开 `http://localhost:4096/api/dapps/` 如果能搜索到“hello-dapp” 说明 DApp 启动成功。

#### 3.1.4 配置 DApp 的受托人
编辑dapps/75d084dc91221b380e7a3c6b3b7467935572b4ebaa1e9a3db91e1239377c1fed/config.json文件,将上面5个受托人的密码加入到该文件中
```
{
        "secrets": [
          "fit night someone unveil dwarf believe middle evidence puzzle hotel common choose",
          "lawsuit ride civil slice kitchen unfold unable lumber prevent suspect finger chunk",
          "absurd sweet blast dinner battle zero ladder steak coral fork venture coffee",
          "topic ramp throw cloud moment jungle bar series task protect erupt answer",
          "hoot tired know dish rally kiwi snack patrol bunker ocean panel this"
        ]
}
```
然后重启 etm，此时 DApp 已经可以产块了。具体可以看 DApp 的日志输出 dapps/75d084dc91221b380e7a3c6b3b7467935572b4ebaa1e9a3db91e1239377c1fed/logs/debug.20180805.log

#### 3.1.5 DApp 基本操作

##### 3.1.5.1 往 DApp 中进行充值
##### 3.1.5.2 往 DApp 中进行提现
##### 3.1.5.3 往 DApp 中进行转账


OK，上面BB了那么多，其实就干了一件事：没有写一行代码只是利用现有的工具就搭建起来一条具备跨连充值、跨链提现、内部转账功能的侧链，并且还可以创建内置资产。从下面章节开始，才是用户自定义数据、智能合约、外部接口的代码编写。

## 4 DApp 核心开发流程
开发 DApp 跟把大象放进冰箱的步骤一毛一样，本章节就是围绕下面这三步来做 :)


下面这些操作都是在dapps/75d084dc91221b380e7a3c6b3b7467935572b4ebaa1e9a3db91e1239377c1fed/目录下进行的。

### 4.1 自定义用户数据模型（RDBMS表）

注意事项：

- `表结构定义需要放到model目录下`

- `字段属性都是RDBMS通用的，比如类型有string、nmber等，not_null，defaut值，length长度、主外键约束、唯一约束等`

- `如果字段是String类型，则必须加上length属性`

- ` DApp 启动时会检查这些表是否存在，如果不存在则会自动创建，保存到blockchain.db文件中`

在model目下创建article.js文件，该文件定义了articles表，内容如下
```
module.exports = {
  name: 'articles',
  fields: [
    // 文章id
    {
      name: 'id',
      type: 'String',
      length: '20',
      not_null: true,
      primary_key: true
    },
    // 发表文章时的交易id
    {
      name: 'tid',
      type: 'String',
      length: 64,
      not_null: true,
      unique: true
    },
    // 文章作者的地址
    {
      name: 'authorId',
      type: 'String',
      length: 50,
      not_null: true
    },
    // 时间戳，距离hello-dapp创世块经历的秒数
    {
      name: 'timestamp',
      type: 'Number',
      not_null: true
    },
    // 文章标题
    {
      name: 'title',
      type: 'String',
      length: 256,
      not_null: true
    },
    // 如果文章是引用的，其url地址定义
    {
      name: 'url',
      type: 'String',
      length: 256
    },
    // 文章内容
    {
      name: 'text',
      type: 'String',
      length: 4096,
      not_null: true,
    },
    // 文章标签
    {
      name: 'tags',
      type: 'String',
      length: 20
    },
    // 文章得到的投票数
    {
      name: 'votes',
      type: 'Number',
      not_null: true
    },
    // 文章评论
    {
      name: 'comments',
      type: 'Number',
      not_null: true,
      default: 0
    },
    // 举报
    {
      name: 'reports',
      type: 'Number',
      not_null: true,
      default: 0
    }
  ]
}
```

### 4.2 自定义用户合约

这一步里面主要用到的文档是：https://github.com/etm-developer/etm-docs/blob/master/dapp/dapp-sdk-api.md
app.xxx这种接口都来自etm_vm (https://github.com/entanmo/etm_vm)

合约就是业务逻辑处理。

```
// 在contrac目录下创建hello-dapp.js
module.exports = {
  // 定义发布文章的智能合约函数
  postArticle: async function (title, url, text, tags) {
    // 下面这些if判断是用来校验文章信息是否合法，有些是可以用 app.validate(type, value) 接口进行重写的
    if (!url && !text) {
      return 'Should provide url or text'
    }
    if (url && text) {
      return 'Both url and text are not supported'
    }
    if (!tags) {
      return 'Should provide tags'
    }
    if (tags.length > 20) {
      return 'Invalid tags size'
    }
    if (!title) {
      return 'Should provide title'
    }
    if (title.length > 256) {
      return 'Invalid title size'
    }
    if (url && url.length > 256) {
      return 'Url too long'
    }
    if (text && text.length > 4096) {
      return 'Text too long'
    }
    //TODO validate url format

    // 对key进行加锁，防止重复数据。这里的意思是如果用户发表的文章是转载其它url的，则需要检查该url是否已经被发布过了。需要在内存中将这个url的key锁住，防止同一个区块内其他人再次发布这个url然后去检查db中是否已经有这个url了
    if (url) {
      app.sdb.lock('postArticle@' + url)
      let exists = await app.model.Article.exists({ url: url })
      if (exists) {
        return 'Url already exists'
      }
    }
    // 调用app.sdb.create将校验过的文章信息插入到articles表中
    app.sdb.create('Article', {
      title: title,
      url: url || '',
      text: text || '',
      tags: tags,
      id: app.autoID.increment('article_max_id'),
      votes: 0,
      tid: this.trs.id,
      authorId: this.trs.senderId,
      timestamp: this.trs.timestamp,
      comments: 0
    })
  }
}
```

```
// 修改init.js
// 注册合约
module.exports = async function () {
  console.log('enter dapp init')
  // 注册合约，用户自定义合约编号是从1000开始的，之前的都是system保留合约。
  app.registerContract(1000, 'hello-dapp.postArticle')

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}
```

### 4.3 自定义查询接口

`interface`目录下新增 `index.js`，内容如下

```
// 根据条件查询被举报次数小于的文章，并按照时间倒序排
async function getArticlesByTime(options) {
  // 查询符合条件的记录数
  let count = await app.model.Article.count({ reports: { $lt: 3 } })
  // 查询符合条件的记录详情
  let articles = await app.model.Article.findAll({
    condition: {
      reports: { $lt: 3 }
    },
    limit: options.limit || 50,
    offset: options.offset || 0,
    sort: { timestamp: -1 }
  })
  return { count: count, articles: articles }
}

// 定义url路由，根据条件获取文章
app.route.get('/articles', async (req) => {
    // 获取url传进来的参数
    let query = req.query
    // 默认按照timestamp来排序
    if (!query.sortBy) {
      query.sortBy = 'timestamp'
    }

    // 设定本次查询的key
    let key = ['articles', query.sortBy, query.limit, query.offset].join('_')
    // 如果内存中有本次查询的key，则直接返回其对应的结果
    if (app.custom.cache.has(key)) {
      return app.custom.cache.get(key)
    }

    let res = null
    if (query.sortBy === 'timestamp') {
      res = await getArticlesByTime(query)
    } else {
      throw new Error('Sort field not supported')
    }
    // 从articles表只能获取到地址，没有昵称，下面一系列的操作是把昵称加入到返回结果中
    let addresses = res.articles.map((a) => a.authorId)
    let accounts = await app.model.Account.findAll({
      condition: {
        // sql的in查询
        address: { $in: addresses }
      },
      fields: ['str1', 'address']
    })
    let accountMap = new Map
    for (let account of accounts) {
      accountMap.set(account.address, account)
    }
    for (let article of res.articles) {
      let account = accountMap.get(article.authorId)
      if (account) {
        article.nickname = account.str1
      }
    }
    // 将key和其值加入到内存中
    app.custom.cache.set(key, res)
    return res
  })
```

4.4 测试
重启etm服务。

未完待续
