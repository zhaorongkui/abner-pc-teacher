<script>
export default {
  name: 'headline',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  render() {
    return (
      <div class="headline">
        <div class="title">{this.title}</div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.headline {
  margin-left: 14px;
  .title {
    font-size: 14px;
    position: relative;
  }
  .title::before {
    content: '';
    width: 4px;
    height: 14px;
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    margin-top: -1px;
    background: #0610a8;
  }
}
</style>
