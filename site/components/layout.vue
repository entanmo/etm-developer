<script>
import AllDemo from '../dapp'
import AllDemo1 from '../skill'
import AllDemo2 from '../intro'
import Header from './header'
import Footer from './footer'
import zhCN from 'antd/locale-provider/zh_CN'
import enUS from 'antd/locale-provider/default'
// import sortBy from 'lodash/sortBy'
import { isZhCN } from '../util'
import { Provider, create } from '../../components/_util/store'
import NProgress from 'nprogress'

const docsList = [
  // { key: 'home', enTitle: 'Use in DApp', title: '选择 ETM 轻松开发 DApp' },
]
export default {
  props: {
    name: String,
    showDemo: Boolean,
    showApi: Boolean,
  },
  data () {
    this.store = create({
      currentSubMenu: [],
    })
    this.subscribe()
    return {
      showSideBars: false,
      currentSubMenu: [],
      sidebarHeight: document.documentElement.offsetHeight,
    }
  },
  provide () {
    return {
      demoContext: this,
    }
  },
  beforeDestroy () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
    clearTimeout(this.timer)
    if (this.resizeEvent) {
      this.resizeEvent.remove()
    }
    if (this.debouncedResize && this.debouncedResize.cancel) {
      this.debouncedResize.cancel()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.addSubMenu()
      const nprogressHiddenStyle = document.getElementById('nprogress-style')
      if (nprogressHiddenStyle) {
        this.timer = setTimeout(() => {
          nprogressHiddenStyle.parentNode.removeChild(nprogressHiddenStyle)
        }, 0)
      }
    })
  },
  watch: {
    '$route.path': function () {
      this.store.setState({ currentSubMenu: [] })
      this.addSubMenu()
    },
  },
  methods: {
    addSubMenu () {
      const pathArr = ['/docs/', '/doc/', '/skill/', '/dapp/']
      const hasPath = pathArr.some(item => this.$route.path.indexOf(item) >= 0)
      if (hasPath) {
        this.$nextTick(() => {
          const menus = []
          const doms = [...this.$refs.doc.querySelectorAll(['h2', 'h3'])]
          doms.forEach(dom => {
            const id = dom.id
            if (id) {
              const title = dom.textContent.split('#')[0].trim()
              menus.push({ cnTitle: title, usTitle: title, id })
            }
          })
          this.currentSubMenu = menus
        })
      }
    },
    subscribe () {
      const { store } = this
      this.unsubscribe = store.subscribe(() => {
        this.currentSubMenu = this.store.getState().currentSubMenu
      })
    },
    getSubMenu (isCN) {
      const currentSubMenu = this.currentSubMenu
      const lis = []
      currentSubMenu.forEach(({ cnTitle, usTitle, id }) => {
        const title = isCN ? cnTitle : usTitle
        lis.push(<a-anchor-link key={id} href={`#${id}`} title={title} />)
      })
      return (
        <a-anchor offsetTop={100} class='demo-anchor'>
          {lis}
        </a-anchor>
      )
    },
    getDocsMenu (isCN, pagesKey) {
      const docsMenu = []
      docsList.forEach(({ key, enTitle, title }, index) => {
        const k = isCN ? `${key}-cn` : key
        pagesKey.push({ name: k,
          url: `/docs/${k}/`,
          title: isCN ? title : enTitle,
        })
        docsMenu.push(<a-menu-item key={k}>
          <router-link to={`/docs/${k}/`}>{isCN ? title : enTitle }</router-link>
        </a-menu-item>)
      })
      return docsMenu
    },
    resetDocumentTitle (component, name, isCN) {
      let titleStr = 'En-Tan-Mo Developer'
      if (component) {
        const { subtitle, title } = component
        const componentName = isCN ? subtitle + ' ' + title : title
        titleStr = componentName + ' - ' + titleStr
      } else {
        const currentKey = docsList.filter((item) => {
          return item.key === name
        })
        if (currentKey.length) {
          titleStr = (isCN ? currentKey[0]['title'] : currentKey[0]['enTitle']) + ' - ' + titleStr
        }
      }
      document.title = titleStr
    },
    mountedCallback () {
      NProgress.done()
      document.documentElement.scrollTop = 0
    },
    createMenu (options, route, MenuGroup, AllDemo) {
      const titleMap = {}

      const menuConfig = {
        General: [],
      // Layout: [],
      // Navigation: [],
      // 'Data Entry': [],
      // 'Data Display': [],
      // Feedback: [],
      // Other: [],
      }
      for (const [title, d] of Object.entries(AllDemo)) {
        const type = d.type || 'Other'
        const key = `${title.replace(/(\B[A-Z])/g, '-$1').toLowerCase()}`
        titleMap[key] = title
        AllDemo[title].key = key
        menuConfig[type] = menuConfig[type] || []
        menuConfig[type].push(d)
      }
      const reName = name.replace(/-cn\/?$/, '')

      for (const [type, menus] of Object.entries(menuConfig)) {
        const MenuItems = []
        menus.forEach(({ title, subtitle, entitle }) => {
          const linkValue = options.isCN
            ? [<span>{title}</span>, <span class='chinese'>{subtitle}</span>]
            : [<span>{entitle}</span>]
          let key = `${title.replace(/(\B[A-Z])/g, '-$1').toLowerCase()}`
          if (options.isCN) {
            key = `${key}-cn`
          }
          options.pagesKey.push({
            name: key,
            url: `/${route}/${key}/`,
            title: options.isCN ? `${title} ${subtitle}` : entitle,
          })
          options.searchData.push({
            title: entitle,
            subtitle,
            url: `/${route}/${key}/`,
          })
          if (route === 'dapp') {
            options.dappData.push({
              title,
              subtitle,
              url: `/${route}/${key}/`,
            })
          } else if (route === 'skill') {
            options.skillData.push({
              title,
              subtitle,
              url: `/${route}/${key}/`,
            })
          } else if (route === 'doc') {
            options.introData.push({
              title,
              subtitle,
              url: `/${route}/${key}/`,
            })
          }
          MenuItems.push(<a-menu-item key={key} style='paddingLeft : 50px'>
            <router-link to={`/${route}/${key}/`}>{linkValue}</router-link>
          </a-menu-item>)
        })
        MenuGroup.push(<a-menu-item-group >{MenuItems}</a-menu-item-group>)
      }
      const config = AllDemo[titleMap[reName]]
      this.resetDocumentTitle(config, reName, options.isCN)
    },
  },

  render () {
    const name = this.name
    const isCN = isZhCN(name)
    const options = {
      pagesKey: [],
      isCN: isCN,
      searchData: [],
      skillData: [],
      dappData: [],
      introData: [],
    }
    const docsMenu = this.getDocsMenu(options.isCN, options.pagesKey)
    const routes = ['dapp', 'skill', 'doc']
    const MenuGroup = []
    const MenuGroup1 = []
    const MenuGroup2 = []
    let prevPage = null
    let nextPage = null
    this.createMenu(options, routes[2], MenuGroup2, AllDemo2)
    this.createMenu(options, routes[1], MenuGroup1, AllDemo1)
    this.createMenu(options, routes[0], MenuGroup, AllDemo)

    options.pagesKey.forEach((item, index) => {
      if (item.name === name) {
        prevPage = options.pagesKey[index - 1]
        nextPage = options.pagesKey[index + 1]
      }
    })
    let locale = zhCN
    if (!isCN) {
      locale = enUS
    }
    const { showSideBars } = this
    return (
      <div class='page-wrapper'>
        <Header searchData={options.searchData} name={name}/>
        <a-locale-provider locale={locale}>
          <div class='main-wrapper'>
            <a-row>
              <a-col v-show={showSideBars} ref='sidebar' class='site-sidebar' xxl={4} xl={5} lg={5} md={6} sm={8} xs={12}>
                <div class='drawer-mask' onClick={() => { this.showSideBars = false }}></div>
                <a-menu
                  class='aside-container menu-site'
                  selectedKeys={[name]}
                  defaultOpenKeys={['Components']}
                  inlineIndent={40}
                  mode='inline'>
                  {docsMenu}
                  <a-sub-menu title={ isCN ? `简介 (${options.introData.length})` : `Intro (${options.introData.length})`} key='Components'>
                    {MenuGroup2}
                  </a-sub-menu>
                  <a-sub-menu title={ isCN ? `技术解读 (${options.skillData.length})` : `Technical Interpretation (${options.skillData.length})`} key='Components2'>
                    {MenuGroup1}
                  </a-sub-menu>
                  <a-sub-menu title={ isCN ? `DApp 开发教程 (${options.dappData.length})` : `DApp Tutorials (${options.dappData.length})`} key='Components3'>
                    {MenuGroup}
                  </a-sub-menu>
                </a-menu>
                <div class='close-drawer' onClick={() => { this.showSideBars = false }}>
                  <a-icon type='close'/>
                </div>
              </a-col>
              <div v-show={!showSideBars} class='open-drawer' onClick={() => { this.showSideBars = true }}>
                <a-icon type='bars'/>
              </div>
              <a-col class='main-container' xxl={20} xl={19} lg={19} md={18} sm={24} xs={24}>
                <div class='content'>
                  <div class='toc-affix' style='width: 120px;'>
                    {this.getSubMenu(isCN)}
                  </div>
                  {/*
                    this.showDemo ? <Provider store={this.store} key={isCN ? 'cn' : 'en'}>
                      <router-view
                        // class={`demo-cols-${config.cols || 2}`}

                        {...{ directives: [
                          {
                            name: 'mountedCallback',
                            value: this.mountedCallback,
                          },
                        ] }}
                      ></router-view>
                    </Provider> : ''
                  */}
                  {<div class='markdown api-container' ref='doc'>
                    <router-view
                      {...{ directives: [
                        {
                          name: 'mountedCallback',
                          value: this.mountedCallback,
                        },
                      ] }}
                    ></router-view>
                  </div>}
                </div>
                <section class='prev-next-nav'>
                  {prevPage ? <router-link class='prev-page' to={`${prevPage.url}`}><a-icon type='left' />&nbsp;&nbsp;{prevPage.title}</router-link> : ''}
                  {nextPage ? <router-link class='next-page' to={`${nextPage.url}`}>{nextPage.title}&nbsp;&nbsp;<a-icon type='right' /></router-link> : ''}
                </section>
              </a-col>
            </a-row>
          </div>
        </a-locale-provider>
        <Footer ref='footer' isCN={isCN}/>
        { name.indexOf('back-top') === -1 ? <a-back-top /> : null }
      </div>
    )
  },
}
</script>


