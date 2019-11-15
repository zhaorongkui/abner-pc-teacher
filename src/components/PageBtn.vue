<style scoped>
.page-back,
.page-next {
  cursor: pointer;
  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(214, 225, 229, 1);
  text-align: center;
  line-height: 34px;
  color: #339bff;
  font-size: 14px;
}
.page-back {
  border-radius: 4px 0px 0px 4px;
}
.page-next {
  border-radius: 0px 4px 4px 0px;
}
.page-btn {
  display: flex;
}
.page-list {
  flex: 1;
  overflow: hidden;
  padding: 0 14px 0 0;
}
.page-box {
  display: inline-block;
  cursor: pointer;
  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #1059ff;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: #1059ff;
  line-height: 32px;
  margin-left: 15px;
}
.page-box:last-child {
  margin-right: 0;
}
.page-box-current {
  color: #ffffff;
  border-color: #1059ff;
  background: #1059ff;
}
.page-box-no-count {
  color: #838383;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(214, 225, 229, 1);
}
</style>
<template>
  <div class="page-btn" onselectstart="return false;">
    <div class="page-back" @click="backPageNumber">
      <a-icon theme="filled" type="caret-left" />
    </div>
    <div class="page-list">
      <template v-for="item in pageListSlice">
        <div
          class="page-box"
          :class="{
            'page-box-current': value === item.pageNumber,
            'page-box-no-count': item.workNum === 0
          }"
          :key="item.pageNumber"
          @click="goPage(item)"
        >
          {{ 'P' + item.pageNumber }}
        </div>
      </template>
    </div>
    <div class="page-next" @click="nextPageNumber">
      <a-icon theme="filled" type="caret-right" />
    </div>
  </div>
</template>

<script>
// 发布作业选中页码组件
export default {
  name: 'PageBtn',
  props: {
    value: {
      type: Number,
      default: null
    },
    pageList: {
      type: Array,
      default() {
        return [
          {
            pageNumber: 1,
            workNum: 0
          },
          {
            pageNumber: 2,
            workNum: 10
          },
          {
            pageNumber: 3,
            workNum: 0
          },
          {
            pageNumber: 4,
            workNum: 10
          }
        ]
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      COUNTITEM: 16
    }
  },
  watch: {},
  computed: {
    pageListSlice() {
      return this.pageList.slice(
        (this.currentPage - 1) * this.COUNTITEM,
        this.currentPage * this.COUNTITEM
      )
    },
    currentIndex() {
      for (let i = 0, count = this.pageList.length; i < count; i++) {
        if (this.pageList[i].pageNumber === this.value) {
          this.currentPage = Math.ceil(i / this.COUNTITEM) || 1
          return i
        }
      }
      return 0
    },
    workIndex() {
      let arr = []
      this.pageList.forEach((item, index) => {
        if (item.workNum) {
          arr.push(index)
        }
      })
      return arr
    }
  },
  methods: {
    setPageNumber(num, pm) {
      this.currentPage = Math.ceil(num / this.COUNTITEM) || 1
      console.log(this.currentPage, num)
      if (this.pageList[num]) {
        if (this.pageList[num].workNum) {
          this.goPage(this.pageList[num])
        } else {
          let count = num + pm
          this.setPageNumber(count, pm)
        }
      }
    },
    nextPageNumber() {
      let num = this.currentIndex + 1
      this.setPageNumber(num, 1)
    },
    nextPage() {
      let max = Math.ceil(this.pageList.length / 16) || 1
      if (this.currentPage + 1 > max) {
        return
      }
      this.currentPage += 1
    },
    backPage() {
      if (this.currentPage - 1 < 1) {
        return
      }
      this.currentPage -= 1
    },
    backPageNumber() {
      let num = this.currentIndex - 1
      this.setPageNumber(num, -1)
    },
    goPage(item) {
      this.$emit('input', item.pageNumber)
      this.$emit('on-change', item)
    }
  }
}
</script>

