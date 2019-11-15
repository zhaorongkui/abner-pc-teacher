<script>
export default {
  name: '',
  components: {},
  props: ['trueOrFalse'],
  render() {
    return (
      <div class="trueOrFalse">
        {this.trueOrFalse === 'y' ? '正确' : '错误'}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.trueOrFalse {
  font-size: 14px;
}
</style>
