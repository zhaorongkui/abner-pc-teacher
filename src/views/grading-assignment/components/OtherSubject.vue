<template>
  <div class="listening-speaking">
    <div class="content">
      <header>
        <div>
          姓名
        </div>
        <div>
          作业进度
          <span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'finishRate' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('finishRate', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'finishRate' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('finishRate', 'Desc')"
            ></i>
          </span>
        </div>
        <div>
          正确率
          <span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'trueRate' && sortRule === 'Asc' ? 'active' : ''
              "
              @click="handleSort('trueRate', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'trueRate' && sortRule === 'Desc' ? 'active' : ''
              "
              @click="handleSort('trueRate', 'Desc')"
            ></i>
          </span>
        </div>
        <div>
          提交时间
          <span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'homeworkSubmittime' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('homeworkSubmittime', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'homeworkSubmittime' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('homeworkSubmittime', 'Desc')"
            ></i>
          </span>
        </div>
        <div>
          作业状态
          <span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'submitType' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('submitType', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'submitType' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('submitType', 'Desc')"
            ></i>
          </span>
        </div>
      </header>
      <ul class="list">
        <li
          class="item"
          v-for="(student, index) of list"
          :key="index"
          @click="handleGoWorkMarking(student)"
        >
          <div>
            <span v-if="student.homeworkIsappeal === 1">申</span>
            <span v-if="student.homeworkIsappeal === 3"
              >申
              <img src="../../../assets/img/publish/result_right.png" alt="" />
            </span>
            {{ student.studentName }}
          </div>
          <div>
            <a-progress :percent="Number(student.finishRate)" status="active" />
          </div>
          <div>{{ (student.trueRate && student.trueRate + '%') || '--' }}</div>
          <div v-if="student.homeworkSubmittime">
            {{ student.homeworkSubmittime | formatDate }}
          </div>
          <div v-else>--</div>
          <div>
            <template v-if="student.submitType === 1">
              <span :style="{ color: '#FF6365' }">未提交</span>
            </template>
            <template v-if="student.submitType === 2">
              <span :style="{ color: '#FF6365' }">未完成</span>
            </template>
            <template v-if="student.submitType === 3">
              <template v-if="student.reviewType === 0">
                <span :style="{ color: '#1059FF' }">待批阅</span>
              </template>
              <template v-else-if="student.reviewType === 2">
                学生批阅
              </template>
              <template v-else>
                教师批阅
              </template>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
export default {
  name: '',
  components: {},
  props: ['item'],
  data() {
    return {
      list: 100,
      sortColumn: '',
      sortRule: 'Asc'
    }
  },
  methods: {
    handleSort(n, s) {
      this.sortColumn = n
      this.sortRule = s
      this.list.sort((a, b) => {
        return s == 'Asc'
          ? (a[n] == undefined ? 0 : Number(a[n])) -
              (b[n] == undefined ? 0 : Number(b[n]))
          : (b[n] == undefined ? 0 : Number(b[n])) -
              (a[n] == undefined ? 0 : Number(a[n]))
      })
    },
    handleGoWorkMarking(student) {
      if (student.submitType === 3) {
        //学生列表信息
        localforage.setItem('student', student)
        // 作业列表单元信息
        localforage.setItem('item', this.item)
        // 学生列表
        localforage.setItem('list', this.list)
        this.$router.push('/work-marking')
      } else {
        this.$message.warn('该同学还未提交作业')
      }
    }
  },
  mounted() {
    this.$http
      .get('/api/teacher/homework/studentList', {
        params: {
          gradeClassId: this.item.gradeClassid,
          homeworkId: this.item.homeworkId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          this.list = data.infos
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.listening-speaking {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .content {
    flex: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #dedede;
    font-size: 14px;
    header {
      flex: 0 0 60px;
      width: 100%;
      background: rgba(241, 246, 254, 1);
      border: 1px solid rgba(187, 215, 255, 1);
      border-radius: 4px 4px 0px 0px;
      color: #4e5f71;
      font-weight: 400;
    }
    .list {
      flex: auto;
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .item {
      border-bottom: 1px solid #dedede;
      background-color: #fff;
    }
    .item:nth-child(2n) {
      background-color: #fafbfe;
    }
    header,
    .list > .item {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        text-align: center;
        flex: auto;
      }
      > div:nth-child(1) {
        flex: 0 0 180px;
        position: relative;
        span {
          display: inline-block;
          width: 30px;
          height: 30px;
          background: rgba(255, 99, 101, 1);
          border-radius: 50%;
          color: #fff;
          font-size: 12px;
          border-radius: 50%;
          line-height: 30px;
          position: absolute;
          top: 50%;
          left: 30px;
          transform: translateY(-50%);
          img {
            width: 12px;
            height: 12px;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
      > div:nth-child(2) {
        flex: 0 0 180px;
      }
      > div:nth-child(3) {
        flex: 0 0 180px;
      }
      > div:nth-child(4) {
        flex: 0 0 180px;
      }
      > div:nth-child(5) {
        flex: 0 0 180px;
      }
    }
  }
}
.sort {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}
.sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}
.sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: 4px;
}
.sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: 6px;
}
.sort-caret.ascending.active {
  border-bottom-color: #409eff;
}
.sort-caret.descending.active {
  border-top-color: #409eff;
}
</style>
