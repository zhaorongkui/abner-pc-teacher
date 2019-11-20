<style lang="scss" scoped>
.my-graded {
  width: 88px;
  height: 205px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(223, 223, 223, 1);
  box-shadow: 0px 8px 20px 0px rgba(186, 213, 238, 0.29);
  h3 {
    height: 43px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(88, 104, 120, 1);
    line-height: 43px;
    text-align: center;
  }
  .gradedList {
    width: 100%;
    height: 240px;
    overflow-y: auto;
    .full {
      color: #53bbb3;
    }
    .active {
      background-color: rgba(16, 89, 255, 1);
      color: #fff;
    }
    li {
      width: 76px;
      height: 38px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(185, 185, 185, 1);
      box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      border-radius: 19px;
      margin: 10px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 38px;
      text-align: center;

      font-size: 26px;
      font-weight: 400;
      color: rgba(16, 89, 255, 1);
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
<template>
  <div class="my-graded">
    <h3>我的评分</h3>
    <ul class="gradedList">
      <li
        :class="Number(value) === 2 ? 'active' : ''"
        @click="hanldeReadOverOne(2)"
      >
        <img src="../../assets/img/publish/result_right.png" alt="" />
      </li>
      <li
        :class="Number(value) === 1 ? 'active' : ''"
        @click="hanldeReadOverOne(1)"
      >
        <img src="../../assets/img/publish/result_half.png" alt="" />
      </li>
      <li
        :class="Number(value) === 0 ? 'active' : ''"
        @click="hanldeReadOverOne(0)"
      >
        <img src="../../assets/img/publish/result_wrong.png" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
// 主观题评分
export default {
  name: "SubjectiveReadOver",
  props: {
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    hanldeReadOverOne(val) {
      this.$emit("input", val);
      this.$emit("on-change", val);
    }
  }
};
</script>