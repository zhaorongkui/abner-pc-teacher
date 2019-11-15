<script>
export default {
  name: 'app-menu',
  render() {
    return <div class="app-menu">{this.$slots.default}</div>
  }
}
</script>

<style lang="scss" scoped>
.app-menu {
  height: 100%;
  width: 280px;
  flex: 0 0 280px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  margin-right: 10px;
}
</style>
