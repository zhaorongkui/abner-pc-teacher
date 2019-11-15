<template>
  <li>
    <span>{{ item.word }}</span>
    <!-- 单词跟读 -->
    <div
      v-if="item.wordReadFollow != undefined && item.isWord == 1"
      class="wordReadFollow"
    >
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType == 3
        "
      >
        <span>
          <i>单词跟读</i>
          <span
            v-if="item.homeworkStudentAnswerList[0].answerState == 2"
            class="fenshu"
          >
            <i v-if="flag == true"
              >平均得分 <i>{{ item.homeworkStudentAnswerList[0].score }}</i></i
            >
            <span v-else>
              <span class="progress">
                <i v-for="(i, index) in countArr" :key="index" class="jzt"></i>
              </span>
              <span class="count">
                <i>{{ count }}</i>
                <i>/{{ item.homeworkStudentAnswerList[0].fileList.length }}</i>
              </span>
            </span>
          </span>
        </span>
        <span
          class="progress-wrap"
          v-if="item.homeworkStudentAnswerList[0].answerState == 1"
        >
          <span
            >剩余{{
              item.wordReadFollow -
                item.homeworkStudentAnswerList[0].fileList.length
            }}次未读</span
          >
        </span>

        <a
          href="javascript:;"
          v-if="item.homeworkStudentAnswerList[0].answerState == 2"
        >
          <img
            src="../../../assets/img/publish/read_play.png"
            alt=""
            @click="play_audio(item.homeworkStudentAnswerList[0].fileList)"
            v-if="flag == true"
          />
          <img
            src="../../../assets/img/publish/read_suspend.png"
            alt=""
            v-else
            @click="play_audio(item.homeworkStudentAnswerList[0].fileList)"
          />
          <audio
            ref="audioRef"
            :src="audioUrl"
            controls="controls"
            style="display:none;"
          />
        </a>
      </template>

      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 3 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType == 3)
        "
      >
        <span>
          <i>单词跟读</i>
          <span
            v-if="item.homeworkStudentAnswerList[1].answerState == 2"
            class="fenshu"
          >
            <i v-if="flag == true"
              >平均得分 <i>{{ item.homeworkStudentAnswerList[1].score }}</i></i
            >
            <span v-else>
              <span class="progress">
                <i v-for="(i, index) in countArr" :key="index" class="jzt"></i>
              </span>
              <span class="count">
                <i>{{ count }}</i>
                <i>/{{ item.homeworkStudentAnswerList[1].fileList.length }}</i>
              </span>
            </span>
          </span>
        </span>
        <span
          class="progress-wrap"
          v-if="item.homeworkStudentAnswerList[1].answerState == 1"
        >
          <span
            >剩余{{
              item.wordReadFollow -
                item.homeworkStudentAnswerList[1].fileList.length
            }}次未读</span
          >
        </span>

        <a
          href="javascript:;"
          v-if="item.homeworkStudentAnswerList[1].answerState == 2"
        >
          <img
            src="../../../assets/img/publish/read_play.png"
            alt=""
            @click="play_audio(item.homeworkStudentAnswerList[1].fileList)"
            v-if="flag == true"
          />
          <img
            src="../../../assets/img/publish/read_suspend.png"
            alt=""
            v-else
            @click="play_audio(item.homeworkStudentAnswerList[1].fileList)"
          />
          <audio
            ref="audioRef"
            :src="audioUrl"
            controls="controls"
            style="display:none;"
          />
        </a>
      </template>

      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 3 &&
            item.homeworkStudentAnswerList[1] == undefined
        "
      >
        <span>
          <i>单词跟读</i>
        </span>
        <span class="wz">未做</span>
      </template>

      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 3 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType != 3) &&
            (item.homeworkStudentAnswerList[2] != undefined &&
              item.homeworkStudentAnswerList[2].homeworkQuestionType == 3)
        "
      >
        <span>
          <i>单词跟读</i>
          <span
            v-if="item.homeworkStudentAnswerList[2].answerState == 2"
            class="fenshu"
          >
            <i v-if="flag == true"
              >平均得分 <i>{{ item.homeworkStudentAnswerList[2].score }}</i></i
            >
            <span v-else>
              <span class="progress">
                <i v-for="(i, index) in countArr" :key="index" class="jzt"></i>
              </span>
              <span class="count">
                <i>{{ count }}</i>
                <i>/{{ item.homeworkStudentAnswerList[2].fileList.length }}</i>
              </span>
            </span>
          </span>
        </span>
        <span
          class="progress-wrap"
          v-if="item.homeworkStudentAnswerList[2].answerState == 1"
        >
          <span
            >剩余{{
              item.wordReadFollow -
                item.homeworkStudentAnswerList[2].fileList.length
            }}次未读</span
          >
        </span>

        <a
          href="javascript:;"
          v-if="item.homeworkStudentAnswerList[2].answerState == 2"
        >
          <img
            src="../../../assets/img/publish/read_play.png"
            alt=""
            @click="play_audio(item.homeworkStudentAnswerList[2].fileList)"
            v-if="flag == true"
          />
          <img
            src="../../../assets/img/publish/read_suspend.png"
            alt=""
            v-else
            @click="play_audio(item.homeworkStudentAnswerList[2].fileList)"
          />
          <audio
            ref="audioRef"
            :src="audioUrl"
            controls="controls"
            style="display:none;"
          />
        </a>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 3 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType != 3) &&
            item.homeworkStudentAnswerList[2] == undefined
        "
      >
        <span>
          <i>单词跟读</i>
        </span>
        <span class="wz">未做</span>
      </template>
      <template v-if="item.homeworkStudentAnswerList == undefined">
        <span>
          <i>单词跟读</i>
        </span>
        <span class="wz">未做</span>
      </template>
    </div>
    <!-- 单词听写 -->
    <div
      v-if="item.wordListenWrite != undefined && item.isWord == 1"
      class="wordListenWrite"
    >
      <span>单词听写</span>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType == 4
        "
      >
        <a href="javascript:;">
          <img
            src="../../../assets/img/publish/ic_right.png"
            alt=""
            v-if="item.homeworkStudentAnswerList[0].isTrue == 1"
          />
          <img src="../../../assets/img/publish/ic_wrong.png" alt="" v-else />
        </a>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 4 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType == 4)
        "
      >
        <a href="javascript:;">
          <img
            src="../../../assets/img/publish/ic_right.png"
            alt=""
            v-if="item.homeworkStudentAnswerList[1].isTrue == 1"
          />
          <img src="../../../assets/img/publish/ic_wrong.png" alt="" v-else />
        </a>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 4 &&
            item.homeworkStudentAnswerList[1] == undefined
        "
      >
        <span>未做</span>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 4 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType != 4) &&
            (item.homeworkStudentAnswerList[2] != undefined &&
              item.homeworkStudentAnswerList[2].homeworkQuestionType == 4)
        "
      >
        <a href="javascript:;">
          <img
            src="../../../assets/img/publish/ic_right.png"
            alt=""
            v-if="item.homeworkStudentAnswerList[2].isTrue == 1"
          />
          <img src="../../../assets/img/publish/ic_wrong.png" alt="" v-else />
        </a>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 4 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType != 4) &&
            item.homeworkStudentAnswerList[2] == undefined
        "
      >
        <span>未做</span>
      </template>
      <template v-if="item.homeworkStudentAnswerList == undefined">
        <span>未做</span>
      </template>
    </div>
    <!-- 英译汉 -->
    <div v-if="item.wordEnglishChina != undefined" class="wordEnglishChina">
      <span>英译汉</span>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType == 5
        "
      >
        <a href="javascript:;">
          <img
            src="../../../assets/img/publish/ic_right.png"
            alt=""
            v-if="item.homeworkStudentAnswerList[0].isTrue == 1"
          />
          <img src="../../../assets/img/publish/ic_wrong.png" alt="" v-else />
        </a>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 5 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType == 5)
        "
      >
        <a href="javascript:;">
          <img
            src="../../../assets/img/publish/ic_right.png"
            alt=""
            v-if="item.homeworkStudentAnswerList[1].isTrue == 1"
          />
          <img src="../../../assets/img/publish/ic_wrong.png" alt="" v-else />
        </a>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 5 &&
            item.homeworkStudentAnswerList[1] == undefined
        "
      >
        <span>未做</span>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 5 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType != 5) &&
            (item.homeworkStudentAnswerList[2] != undefined &&
              item.homeworkStudentAnswerList[2].homeworkQuestionType == 5)
        "
      >
        <a href="javascript:;">
          <img
            src="../../../assets/img/publish/ic_right.png"
            alt=""
            v-if="item.homeworkStudentAnswerList[2].isTrue == 1"
          />
          <img src="../../../assets/img/publish/ic_wrong.png" alt="" v-else />
        </a>
      </template>
      <template
        v-if="
          item.homeworkStudentAnswerList != undefined &&
            item.homeworkStudentAnswerList[0].homeworkQuestionType != 5 &&
            (item.homeworkStudentAnswerList[1] != undefined &&
              item.homeworkStudentAnswerList[1].homeworkQuestionType != 5) &&
            item.homeworkStudentAnswerList[2] == undefined
        "
      >
        <span>未做</span>
      </template>
      <template v-if="item.homeworkStudentAnswerList == undefined">
        <span>未做</span>
      </template>
    </div>
  </li>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  props: ['item', 'index', 'currentIndex'],
  data() {
    return {
      flag: true,
      count: 0,
      countArr: [],
      audioUrl: '',
      answerVideoAllUrl: []
    }
  },
  watch: {
    currentIndex(value) {
      if (value != this.index) {
        var self = this
        setTimeout(function() {
          self.flag = true
          self.$refs.audioRef.pause()
        })
      }
    }
  },
  mounted() {},
  methods: {
    play_audio(file) {
      this.$emit('toParentsEvent', this.index)
      this.flag = !this.flag
      this.count = 0
      this.countArr = []
      this.answerVideoAllUrl = file
      if (this.$refs.audioRef.paused) {
        // 暂停中
        this.$refs.audioRef.currentTime = 0
        this.$refs.audioRef.src = this.answerVideoAllUrl[
          this.count
        ].answerFileUrlStr

        this.$refs.audioRef.play()
        //this.countArr.push(this.count)
        this.$refs.audioRef.addEventListener(
          'ended',
          this.playEndedHandler,
          false
        )
        this.$refs.audioRef.loop = false
      } else {
        // 播放中
        this.$refs.audioRef.pause()
      }
    },
    playEndedHandler() {
      this.count++
      this.$refs.audioRef.src =
        this.answerVideoAllUrl[this.count] != undefined
          ? this.answerVideoAllUrl[this.count].answerFileUrlStr
          : ''

      this.$refs.audioRef.play()
      this.countArr.push(this.count)
      this.$nextTick().then(() => {
        for (
          var i = 0;
          i < document.getElementsByClassName('jzt').length;
          i++
        ) {
          document.getElementsByClassName('jzt')[i].style.width =
            100 / this.answerVideoAllUrl.length + '%'
        }
      })
      if (this.count > this.answerVideoAllUrl.length - 1) {
        this.flag = true
        this.$refs.audioRef.removeEventListener(
          'ended',
          this.playEndedHandler,
          false
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
