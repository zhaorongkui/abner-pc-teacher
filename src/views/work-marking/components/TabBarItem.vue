<template>
  <li
    class="tabbar-item"
    :class="item.homeworkQuestionId == homeworkQuestionId ? 'active' : 'normal'"
    @click="handleTab(item.homeworkQuestionId)"
  >
    <span>{{ index + 1 }} </span>
    <template v-if="subjectAbbreviation === 'yingyu'">
      <template v-if="item.hasRewive === 0">
        <div>未批</div>
      </template>
      <template v-else>
        <template v-if="item.questionIsappeal === 1">
          <div>申</div>
        </template>
        <template v-else>
          <span class="full" v-if="item.score === item.questionScore"
            >满分</span
          >
          <span v-else class="yinyu">{{ item.score }}分</span>
        </template>
      </template>
    </template>
    <template v-else>
      <template v-if="item.hasRewive === 0">
        <div>未批</div>
      </template>
      <template v-else>
        <template v-if="item.questionIsappeal === 1">
          <div>申</div>
        </template>
        <template v-else>
          <span v-if="item.isTrue === 0">
            <img src="../../../assets/img/ic_right@2x.png" alt="" />
          </span>
          <span v-if="item.isTrue === 1">
            <img
              src="../../../assets/img/ic_wrong@2x.png"
              alt=""
              style="border:1px solid #ff5235;border-radius:50%;"
            />
          </span>
          <span v-if="item.isTrue === 2">
            <img src="../../../assets/img/ic_half@2x.png" alt="" />
          </span>
        </template>
      </template>
    </template>
  </li>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['index', 'item'],
  data() {
    return {}
  },
  computed: {
    //获取学科简称
    subjectAbbreviation() {
      return this.$store.getters.subjectAbbreviation
    },
    // 获取当前批阅试题列表ID
    homeworkQuestionId() {
      return this.$store.state.marking.homeworkQuestionId
    }
  },
  mounted() {},
  methods: {
    handleTab(value) {
      this.$store.commit('marking/UPDATEREVIEWVOICESRC', null)
      this.$store.commit('marking/UPDATEREVIEWVOICE', null)
      this.$store.commit('marking/UPDATEHOMEWORKQUESTIONID', value)
      this.$store.commit('marking/PICINDEX', 1)
      this.$store.commit('marking/IMGURL', {})
      this.$store.dispatch('marking/questionInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar-item {
  width: 94px;
  height: 46px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(185, 185, 185, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 5px 22px 22px 5px;
  color: #bdbebe;
  line-height: 46px;
  padding: 0 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  img {
    width: 26px;
    height: 26px;
  }
  div {
    width: 26px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    background-color: #ff6365;
    border: 1px solid #ff6365;
    font-size: 12px;
    color: #fff;
    border-radius: 50%;
  }
  .yinyu {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
    color: #1059ff;
    border: 1px solid rgba(16, 89, 255, 1);
    background-color: #fff;
  }
  .full {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid rgba(19, 169, 159, 1);
    border-radius: 50%;
    color: rgba(19, 169, 159, 1);
    background-color: #fff;
  }
}
.active {
  color: #fff;
  background-color: #1059ff;
  width: 110px;
}
.normal {
  color: #666;
}
</style>
