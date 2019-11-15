<template>
  <div class="single-item-wrap">
    <div class="single-item-btn">
      <div v-if="subjectivelist.length > 0">
        <span>主观题</span>
        <ul>
          <li
            v-for="(item, index) in subjectivelist"
            :key="index"
            @click="selectState(item.homeworkQuestionId)"
            :class="
              selectStateType == item.homeworkQuestionId ? 'hover-li' : ''
            "
          >
            <span
              :class="
                selectStateType == item.homeworkQuestionId ? 'hover-span' : ''
              "
              >{{ index + 1 }}</span
            >
          </li>
        </ul>
      </div>
      <div v-if="subjectivelist.length > 0 && objectivelist.length > 0"></div>
      <div v-if="objectivelist.length > 0">
        <span>客观题</span>
        <ul>
          <li
            v-for="(item, index) in objectivelist"
            :key="index"
            @click="selectState(item.homeworkQuestionId)"
            :class="
              selectStateType == item.homeworkQuestionId ? 'hover-li' : ''
            "
          >
            <span
              :class="
                selectStateType == item.homeworkQuestionId ? 'hover-span' : ''
              "
              >{{ index + subjectivelist.length + 1 }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
export default {
  name: '',
  data() {
    return {
      selectStateType: '',
      dailyList: [],
      subjectivelist: [], //主观
      objectivelist: [] //客观
    }
  },
  computed: {},
  components: {},
  mounted() {
    localforage.getItem('dailyList').then(value => {
      this.dailyList = value
      this.dailyList.forEach(item => {
        if (item.questionProperty == 1) {
          this.subjectivelist.push(item)
        } else {
          this.objectivelist.push(item)
        }
      })
    })
    localforage.getItem('homeworkQuestionId').then(value => {
      this.selectStateType = value
    })
  },
  methods: {
    selectState(t) {
      this.selectStateType = t
      this.$emit('toParentsEvent', this.selectStateType)
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.single-item-wrap {
  @include wh(130px, 100%);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  flex: 0 0 130px;
  padding-bottom: 5px;
  .single-item-btn {
    @include wh(100%, 100%);
    padding: 10px;
    overflow: scroll;
    > div {
      > span {
        @include sc(12px, #000);
      }
      ul {
        margin-top: 10px;
      }
      ul li {
        @include wh(90px, 46px);
        background: rgba(255, 255, 255, 1);
        border: 1px solid #b9b9b9;
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        border-radius: 5px 23px 23px 5px;
        margin-bottom: 5px;
        @include fj(center);
        align-items: center;
        padding: 0 5px;
        cursor: pointer;
        span {
          @include sc(14px, #666);
        }

        span:nth-child(1).hover-span {
          color: #fff;
        }
      }
      li.hover-li {
        width: 110px;
        transition: all 0.2s;
        background: #1059ff;
        color: #fff;
        border: 0;
      }
    }
    > div:nth-child(2) {
      @include wh(100%, 1px);
      background: rgba(235, 235, 235, 1);
      margin: 20px 0;
    }
  }
}
</style>
