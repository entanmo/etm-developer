import Layout from './components/layout.vue'
import Iframe from './components/iframe.vue'
import demoRoutes from './dappRoutes'
import NProgress from 'nprogress'

const beforeEnter = (to, from, next) => {
  NProgress.start()
  next()
}
export default [
  { path: '/dapp',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/dapp/')[1].split('/')[0]
      return { name, showDemo: true }
    },
    children: demoRoutes.map((item) => ({
      ...item,
      beforeEnter,
    })),
  },
  { path: '/iframe',
    component: Iframe,
    children: demoRoutes.map((item) => ({
      ...item,
      props: (route) => {
        const hash = route.hash.replace('#', '')
        return { iframeName: hash }
      },
    })),
  },
  {
    path: '/',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/docs/')[1].split('/')[0]
      return { name, showApi: true }
    },
    children: [
      {
        path: 'docs/use-dapp',
        component: () => import('../docs/vue/use-dapp.md'),
        beforeEnter,
      },
      {
        path: 'docs/use-dapp-cn',
        component: () => import('../docs/vue/use-dapp.md'),
        beforeEnter,
      },
      {
        path: 'docs/upos',
        component: () => import('../docs/vue/upos.md'),
        beforeEnter,
      },
      {
        path: 'docs/upos-cn',
        component: () => import('../docs/vue/upos.md'),
        beforeEnter,
      },
      {
        path: 'docs/vote',
        component: () => import('../docs/vue/vote.md'),
        beforeEnter,
      },
      {
        path: 'docs/vote-cn',
        component: () => import('../docs/vue/vote.md'),
        beforeEnter,
      },
      {
        path: 'docs/algorithm',
        component: () => import('../docs/vue/algorithm.md'),
        beforeEnter,
      },
      {
        path: 'docs/algorithm-cn',
        component: () => import('../docs/vue/algorithm.md'),
        beforeEnter,
      },
      {
        path: 'docs/extend',
        component: () => import('../docs/vue/extend.md'),
        beforeEnter,
      },
      {
        path: 'docs/extend-cn',
        component: () => import('../docs/vue/extend.md'),
        beforeEnter,
      },
      {
        path: 'docs/dapp-introduction',
        component: () => import('../docs/vue/dapp-introduction.md'),
        beforeEnter,
      },
      {
        path: 'docs/dapp-introduction-cn',
        component: () => import('../docs/vue/dapp-introduction.md'),
        beforeEnter,
      },
      {
        path: 'docs/dapp-dev-tutorials',
        component: () => import('../docs/vue/dapp-dev-tutorials.md'),
        beforeEnter,
      },
      {
        path: 'docs/dapp-dev-tutorials-cn',
        component: () => import('../docs/vue/dapp-dev-tutorials.md'),
        beforeEnter,
      },
      {
        path: 'docs/getting-started',
        component: () => import('../docs/vue/getting-started.en-US.md'),
        beforeEnter,
      },
      {
        path: 'docs/getting-started-cn',
        component: () => import('../docs/vue/getting-started.zh-CN.md'),
        beforeEnter,
      },
      {
        path: 'docs/introduce',
        component: () => import('../docs/vue/introduce.en-US.md'),
        beforeEnter,
      },
      {
        path: 'docs/introduce-cn',
        component: () => import('../docs/vue/introduce.zh-CN.md'),
        beforeEnter,
      },
      {
        path: 'docs/changelog',
        component: () => import('../CHANGELOG.en-US.md'),
        beforeEnter,
      },
      {
        path: 'docs/changelog-cn',
        component: () => import('../CHANGELOG.zh-CN.md'),
        beforeEnter,
      },
      { path: '', redirect: '/docs/use-dapp-cn/' },
    ],
  },
  { path: '/*', redirect: '/docs/use-dapp-cn/' },
]
