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
          综合得分
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
        <div>
          跟读平均分
          <span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'wordReadFollow' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('wordReadFollow', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'wordReadFollow' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('wordReadFollow', 'Desc')"
            ></i>
          </span>
        </div>
        <div>
          听写正确率
          <span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'wordListenWrite' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('wordListenWrite', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'wordListenWrite' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('wordListenWrite', 'Desc')"
            ></i>
          </span>
        </div>
        <div>
          英译汉正确率
          <span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'wordEnglishChina' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('wordEnglishChina', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'wordEnglishChina' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('wordEnglishChina', 'Desc')"
            ></i>
          </span>
        </div>
      </header>
      <ul class="list">
        <li
          class="item"
          v-for="(item, index) of performanceList"
          :key="index"
          @click="
            toPage(
              'work-answer-results-wordWork',
              item.studentInfoId,
              item.studentName
            )
          "
        >
          <div>{{ item.studentName }}</div>
          <div>
            <el-progress
              :percentage="
                item.finishRate != undefined ? Number(item.finishRate) : 0
              "
            ></el-progress>
            <!-- <a-progress
              :percent="item.finishRate != undefined ? item.finishRate : 0"
            /> -->
          </div>
          <div>
            {{ item.average != undefined ? item.average : '--' }}
          </div>
          <div>
            {{ item.wordReadFollow != undefined ? item.wordReadFollow : '--' }}
          </div>
          <div>
            {{
              item.wordListenWrite != undefined
                ? item.wordListenWrite + '%'
                : '--'
            }}
          </div>
          <div>
            {{
              item.wordEnglishChina != undefined
                ? item.wordEnglishChina + '%'
                : '--'
            }}
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
      sortColumn: '',
      sortRule: 'Asc',
      performanceList: []
    }
  },
  created() {
    this.getPerformance()
  },
  mounted() {},
  methods: {
    toPage(path, id, name) {
      localforage
        .setItem('homeworkClassIdWord', this.item.homeworkClassId)
        .then(() => {
          localStorage.setItem('studentName', name)
          localforage.setItem('studentInfoIdWord', id).then(() => {
            this.$router.push({
              name: path,
              params: {
                studentInfoIdWord: id,
                homeworkClassIdWord: this.item.homeworkClassId
              }
            })
          })
        })
    },
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
        flex: auto;
      }
      > div:nth-child(1) {
        flex: 0 0 180px;
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
  cursor: pointer;
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
