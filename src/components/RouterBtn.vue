<template>
  <div class="router-btn">
    <router-link :to="{ path }">{{ text }}</router-link>
  </div>
</template>

<script>
export default {
  props: ['path', 'params', 'text'],
  name: '',
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
div.router-btn {
  @include wh(50px, auto);
  position: absolute;
  right: -65px;
  top: 0px;
  padding: 0 20px;
  a {
    display: block;
    @include wh(50px, auto);
    padding: 10px;
    background: rgba(239, 144, 81, 0);
    border: 1px solid rgba(16, 89, 255, 1);
    box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
    border-radius: 25px;

    text-align: center;
    @include sc(16px, rgba(16, 89, 255, 1));
    font-weight: bold;
  }
}
</style>
