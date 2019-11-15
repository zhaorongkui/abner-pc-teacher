<script>
export default {
  name: 'publish-homework',
  render() {
    return (
      <div class="publish-btn">
        <router-link to="/publish-work">
          <p>布置</p>
          <p>作业</p>
        </router-link>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.publish-btn {
  a {
    width: 96px;
    height: 96px;
    background: linear-gradient(
      -30deg,
      rgba(13, 17, 125, 1),
      rgba(4, 15, 181, 1)
    );
    box-shadow: 0px 8px 20px 0px rgba(16, 17, 99, 0.31);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 30px;
    bottom: 150px;
    z-index: 9999;
    p {
      font-size: 20px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
