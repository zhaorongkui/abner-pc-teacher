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
          平均得分
          <span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'average' && sortRule === 'Asc' ? 'active' : ''
              "
              @click="handleSort('average', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'average' && sortRule === 'Desc' ? 'active' : ''
              "
              @click="handleSort('average', 'Desc')"
            ></i>
          </span>
        </div>
      </header>
      <ul class="list">
        <li
          class="item"
          v-for="(items, index) of performanceList"
          :key="index"
          @click="toPage(items.studentInfoId, items.studentName)"
        >
          <div>{{ items.studentName }}</div>
          <div>
            <a-progress
              :percent="
                items.finishRate != undefined ? Number(items.finishRate) : 0
              "
            />
          </div>
          <div v-if="items.submitType == 3">
            {{ items.average != undefined ? items.average : '-' }}
          </div>
          <div v-if="items.submitType == 1" style="color:rgb(255, 99, 101)">
            未提交
          </div>
          <div v-if="items.submitType == 2" style="color:rgb(255, 99, 101)">
            未完成
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
  props: ['item'],
  components: {},
  data() {
    return {
      performanceList: [],
      sortColumn: '',
      sortRule: 'Asc',
      studentInfoId: ''
    }
  },
  created() {
    this.getPerformance()
  },
  mounted() {},
  methods: {
    handleSort(n, s) {
      this.sortColumn = n
      this.sortRule = s
      this.performanceList.sort((a, b) => {
        return s == 'Asc'
          ? (a[n] == undefined ? 0 : Number(a[n])) -
              (b[n] == undefined ? 0 : Number(b[n]))
          : (b[n] == undefined ? 0 : Number(b[n])) -
              (a[n] == undefined ? 0 : Number(a[n]))
      })
    },
    toPage(id, name) {
      this.studentInfoId = id
      localStorage.setItem('studentName', name)
      localStorage.setItem('t', 1)
      localforage.setItem('performanceList', this.performanceList).then(() => {
        localforage.setItem('studentInfoId', this.studentInfoId).then(() => {
          this.$router.push({
            name: 'work-answer-results-english',
            params: {
              studentInfoId: this.studentInfoId,
              performanceList: this.performanceList
            }
          })
        })
      })
    },
    getPerformance() {
      this.$http
        .get('/api/teacher/homework/class/student/performance', {
          params: {
            homeworkClassId: this.item.homeworkClassId
          }
        })
        .then(res => {
          this.performanceList = res.data.infos
        })
    }
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
      }
      > div:nth-child(1) {
        flex: 0 0 180px;
      }
      > div:nth-child(2) {
        flex: 0 0 500px;
      }
      > div:nth-child(3) {
        flex: 0 0 240px;
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
