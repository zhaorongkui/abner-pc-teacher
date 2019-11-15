<template>
  <div class="peer-grading" v-if="estimateResult" @click="handleShow">
    <div class="wrap">
      <h3>互批评分</h3>
      <template v-if="subjectAbbreviation === 'yingyu'">
        <span
          class="score man"
          v-if="
            parseInt(studentList[0].reviewResult) === parseInt(questionScore)
          "
        >
          满
        </span>
        <span class="score" v-else>
          {{ parseInt(studentList[0].reviewResult) }}
        </span>
      </template>
      <template v-else>
        <img
          v-if="parseInt(studentList[0].reviewResult) === 2"
          src="../../assets/img/publish/result_right.png"
          alt=""
        />
        <img
          v-else-if="parseInt(studentList[0].reviewResult) === 0"
          src="../../assets/img/publish/result_wrong.png"
          alt=""
        />
        <img v-else src="../../assets/img/publish/result_half.png" alt="" />
      </template>
      <p v-if="studentList[0].reviewFile">查看</p>
    </div>
    <div class="full-screen" id="index">
      <ul>
        <li
          v-for="(item, index) of studentList[0].reviewFileStr.split(',')"
          :key="index"
        >
          <img :ref="'pic' + index" :src="item+'?t=pic'" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 互批
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
export default {
  name: '',
  components: {},
  props: ['questionInfo'],
  computed: {
    questionListInfo() {
      return this.$store.state.marking.questionListInfo || {}
    },
    subjectAbbreviation() {
      return this.$store.getters.subjectAbbreviation
    },
    studentList() {
      return (
        (this.questionInfo.reviewList &&
          this.questionInfo.reviewList.filter(
            item => item.reviewUserType === 1
          )) ||
        []
      )
    },
    questionScore() {
      return this.questionInfo.questionScore
    },
    estimateResult() {
      let list = this.questionInfo.reviewList || []
      let student = this.studentList

      if (!list || list.length === 0) {
        return false
      } else if (student.length === 0) {
        return false
      } else {
        if (
          this.questionListInfo.reviewType !== 2 &&
          this.questionListInfo.reviewType !== 4
        ) {
          return false
        }
        return true
      }
    },
    picList() {
      return (
        this.studentList[0].reviewFile &&
        this.studentList[0].reviewFile.split(',')
      )
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    handleShow() {
      this.isShow = !this.isShow
      const ViewerDom = document.getElementById('index')
      this.Viewer = new Viewer(ViewerDom, {
        // 相关配置项,详情见下面
      })
      this.$refs['pic0'][0].click()
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.peer-grading {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 10px;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 82px;
    height: 98px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 2px 8px 0px rgba(186, 213, 238, 0.29);
    border-radius: 5px 5px 70px 70px;
    margin-left: 10px;
    h3 {
      font-size: 12px;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
      line-height: 18px;
    }
    .score {
      display: inline-block;
      width: 34px;
      height: 34px;
      margin: 5px auto;
      text-align: center;
      background-image: url('../../assets/img/publish/score-line.png');
      background-size: 54px 22px;
      background-position: 0 100%;
      background-repeat: no-repeat;
      font-size: 18px;
    }
    .man {
      color: #13a99f;
    }
    img {
      width: 34px;
      height: 34px;
      margin: 7px 0;
    }
    p {
      width: 40px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      background: #8697b8;
      border-radius: 9px;
      color: #fff;
    }
  }

  .full-screen {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
  }
}
</style>
