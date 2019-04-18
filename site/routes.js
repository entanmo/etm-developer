import Layout from './components/layout.vue'
import Iframe from './components/iframe.vue'
import demoRoutes from './dappRoutes'
import newRoutes from './skillRoutes'
import introRoutes from './introRoutes'
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
  { path: '/skill',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/skill/')[1].split('/')[0]
      return { name, showDemo: true }
    },
    children: newRoutes.map((item) => ({
      ...item,
      beforeEnter,
    })),
  },
  { path: '/doc',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/doc/')[1].split('/')[0]
      return { name, showDemo: true }
    },
    children: introRoutes.map((item) => ({
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
        path: 'docs/home',
        component: () => import('../docs/vue/use-dapp-en.md'),
        beforeEnter,
      },
      {
        path: 'docs/home-cn',
        component: () => import('../docs/vue/use-dapp.md'),
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
      { path: '', redirect: 'doc/etm-info/' },
    ],
  },
  { path: '/*', redirect: 'doc/etm-info/' },
]
