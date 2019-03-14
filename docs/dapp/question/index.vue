<script>
import CN from './index.zh-CN.md'
import US from './index.en-US.md'
export default {
  category: 'Components',
  render () {
    return (
      <div>
        <api>
          <CN slot='cn' />
          <US/>
        </api>

      </div>
    )
  },
}
</script>
