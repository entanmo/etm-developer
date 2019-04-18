export default[
  {
    path: 'smart-contract',
    component: () => import('../docs/dapp/smart_contract/index.en-US.md'),
  }, {
    path: 'smart-contract-cn',
    component: () => import('../docs/dapp/smart_contract/index.zh-CN.md'),
  }, {
    path: 'before-dev',
    component: () => import('../docs/dapp/before_dev/index.en-US.md'),
  }, {
    path: 'before-dev-cn',
    component: () => import('../docs/dapp/before_dev/index.zh-CN.md'),
  }, {
    path: 'smart-contract-api',
    component: () => import('../docs/dapp/smart_contract_api/index.en-US.md'),
  }, {
    path: 'smart-contract-api-cn',
    component: () => import('../docs/dapp/smart_contract_api/index.zh-CN.md'),
  }, {
    path: 'http-api',
    component: () => import('../docs/dapp/http_api/index.en-US.md'),
  }, {
    path: 'http-api-cn',
    component: () => import('../docs/dapp/http_api/index.zh-CN.md'),
  }, {
    path: 'demo',
    component: () => import('../docs/dapp/demo/index.en-US.md'),
  }, {
    path: 'demo-cn',
    component: () => import('../docs/dapp/demo/index.zh-CN.md'),
  }, {
    path: 'log',
    component: () => import('../docs/dapp/log/index.en-US.md'),
  }, {
    path: 'log-cn',
    component: () => import('../docs/dapp/log/index.zh-CN.md'),
  }, {
    path: 'question',
    component: () => import('../docs/dapp/question/index.en-US.md'),
  }, {
    path: 'question-cn',
    component: () => import('../docs/dapp/question/index.zh-CN.md'),
  },
]
