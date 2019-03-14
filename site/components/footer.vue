<script>
export default {
  props: {
    isCN: Boolean,
  },
  render () {
    const isCN = this.isCN
    return (
      <footer id='footer'>
        <div class='footer-wrap'>
          <a-row>
            <a-col md={6} sm={24} xs={24}>
              <div class='footer-center'>
                <h2>En-Tan-Mo</h2>
                <div>
                  <a href='https://github.com/entanmo' target='_blank '>
                    <span>GitHub</span></a><span></span>
                  <span><i class='anticon anticon-github'></i></span>
                </div>
                <div>
                  <a href='http://www.entanmo.com/' target='_blank'>Home</a>
                </div>
              </div>
            </a-col>
            <a-col md={6} sm={24} xs={24}>
              <div class='footer-center'>
                <h2>{isCN ? '联系我们' : 'Contact Us'}</h2>
                <div>
                  <a href='https://twitter.com/entanmo1' target='_blank'>Twitter</a>
                </div>
                <div>
                  <a href='https://t.me/entanmo' target='_blank'>Telegram</a>
                </div>
                {/* <div>
                  <a href='http://tangjinzhou.gitee.io/ant-design-vue/' target='_blank' >
                    <span>{isCN ? '国内镜像' : 'China Mirror'} 🇨🇳</span>
                  </a>
                </div>*/}
              </div>
            </a-col>
            {/* <a-col md={6} sm={24} xs={24}>
              <div class='footer-center'>
                <h2>{isCN ? '社区' : 'Community'}</h2>
                {
                  isCN ? <div>
                    <a href='https://zhuanlan.zhihu.com/ant-design-vue' target='_blank'>
                      <span>知乎专栏</span>
                    </a>
                  </div>
                    : ''
                }
                <div>
                  <a href='https://github.com/vueComponent/ant-design-vue/releases' target='_blank'>
                    <span>{isCN ? '更新记录' : 'Change Log'}</span>
                  </a>
                </div>
                <div>
                  <a rel='noopener noreferrer' target='_blank' href={`https://vuecomponent.github.io/issue-helper/${isCN ? '?lang=zh' : ''}`}>
                    <span>{isCN ? '报告 Bug' : 'Bug Report'}</span>
                  </a>
                </div>
              </div>
            </a-col>*/}
            <a-col md={6} sm={24} xs={24}>
              <div class='footer-center'>
                <h2>
                  <img alt='' class='title-icon' src='https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg'/>
                  <span>{isCN ? '更多产品' : 'More Products'}</span>
                </h2>
                <div>
                  <a href='https://wallet.entanmo.com' rel='noopener noreferrer' target='_blank'>ETM Wallet</a>
                  <span> - </span>
                  <span>{isCN ? '在线钱包' : 'Online Wallet'}</span></div>
              </div>
            </a-col>
          </a-row>
        </div>
      </footer>
    )
  },
}
</script>
