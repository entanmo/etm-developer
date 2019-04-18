export default [
  {
    path: 'use-dapp',
    component: () => import('../docs/skill/use-dapp/index.en-US.md'),
  }, {
    path: 'use-dapp-cn',
    component: () => import('../docs/skill/use-dapp/index.zh-CN.md'),
  },
  {
    path: 'upos',
    component: () => import('../docs/skill/upos/index.en-US.md'),
  }, {
    path: 'upos-cn',
    component: () => import('../docs/skill/upos/index.zh-CN.md'),
  },
  {
    path: 'vote',
    component: () => import('../docs/skill/vote/index.en-US.md'),
  }, {
    path: 'vote-cn',
    component: () => import('../docs/skill/vote/index.zh-CN.md'),
  },
  {
    path: 'algorithm',
    component: () => import('../docs/skill/algorithm/index.en-US.md'),
  }, {
    path: 'algorithm-cn',
    component: () => import('../docs/skill/algorithm/index.zh-CN.md'),
  },
  {
    path: 'extend',
    component: () => import('../docs/skill/extend/index.en-US.md'),
  }, {
    path: 'extend-cn',
    component: () => import('../docs/skill/extend/index.zh-CN.md'),
  },
]
