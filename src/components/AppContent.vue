<script>
export default {
  name: 'app-content',
  render() {
    return <div class="app-content">{this.$slots.default}</div>
  }
}
</script>

<style lang="scss" scoped>
.app-content {
  flex: auto;
  height: 100%;
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
