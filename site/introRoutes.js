export default [
  {
    path: 'etm-info',
    component: () => import('../docs/intro/etmInfo/index.en-US.md'),
  },
  {
    path: 'etm-info-cn',
    component: () => import('../docs/intro/etmInfo/index.zh-CN.md'),
  },
  {
    path: 'etm-registered',
    component: () => import('../docs/intro/etmRegistered/index.en-US.md'),
  },
  {
    path: 'etm-registered-cn',
    component: () => import('../docs/intro/etmRegistered/index.zh-CN.md'),
  },
  {
    path: 'etm-vote',
    component: () => import('../docs/intro/etmVote/index.en-US.md'),
  },
  {
    path: 'etm-vote-cn',
    component: () => import('../docs/intro/etmVote/index.zh-CN.md'),
  },
  {
    path: 'etm-miner',
    component: () => import('../docs/intro/etmMiner/index.en-US.md'),
  },
  {
    path: 'etm-miner-cn',
    component: () => import('../docs/intro/etmMiner/index.zh-CN.md'),
  },
  {
    path: 'etm-dapp',
    component: () => import('../docs/intro/etmDapp/index.en-US.md'),
  },
  {
    path: 'etm-dapp-cn',
    component: () => import('../docs/intro/etmDapp/index.zh-CN.md'),
  },
]
