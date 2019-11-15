<template>
  <div class="tag-list">
    <template v-for="(item, index) in tagList">
      <div :key='index' class="list-item">
        <span class="tag-list-label">{{ item.label }}</span>
        <span class="tag-list-value">{{ item.value }}</span>
        <a-divider v-if="index !== (tagList.length - 1) && tagList.length !== 1" type="vertical" style="margin: 0 20px;" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TagList',
  props: {
    questiondata : {
      type: Object,
      default() {
        return [
          {
            label: '暂无',
            value: '暂无'
          }
        ]
      }
    }
  },
  computed: {
    tagList() {
      if(this.questiondata) {
        let arr = [];
        arr.push({
          label: '试题来源',
          value: this.questiondata.workbookName
        })
        arr.push({
          label: '页数',
          value: this.questiondata.workbookChapterPage
        })
        if (this.questiondata.questionNumber) {
          arr.push({
            label: '题号',
            value: this.questiondata.questionNumber || '--'
          })
        }
        arr.push({
          label: '题型',
          value: this.questiondata.questionYytypeName
        })
        return arr
      }else {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tag-list {
  display: inline-block;
}
.list-item {
  display: inline-flex;
  align-items: center;
}
.tag-list-label {
  margin-right: 20px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
}
.tag-list-value {
  max-width: 300px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(94, 132, 173, 1);
  line-height: 19px;
}
</style>
