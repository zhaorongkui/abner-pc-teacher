<template>
  <div style="position: relative">
    <a-table
    class="hwd-table"
    :columns="columns"
    :dataSource="data"
    :pagination="false"
    :scroll="{ y: scroll }"
    :customRow="onClick">
      <span slot="compositionType" slot-scope="text, record">
        <span v-if="Number(record.compositionType) === 1">命题作文</span>
        <span v-else-if="Number(record.compositionType) === 2">半命题作文</span>
        <span v-else-if="Number(record.compositionType) === 3">材料作文</span>
        <span v-else>-</span>
      </span>
      <span slot="compositionRequire" slot-scope="text, record">
        <span v-if="Number(record.compositionRequire) === 1">文体不限</span>
        <span v-else-if="Number(record.compositionRequire) === 2">记叙文</span>
        <span v-else-if="Number(record.compositionRequire) === 3">议论文</span>
        <span v-else>-</span>
      </span>
      <span slot="avgScore" slot-scope="text, record">
        <span v-if="record.avgScore">{{ record.avgScore }}分</span>
        <span v-else>-</span>
      </span>
      <span slot="submitRate" slot-scope="text, record">
        <span v-if="record.submitRate">{{ record.submitRate }}%</span>
        <span v-else>-</span>
      </span>
      <span slot="avgWriteTime" slot-scope="text, record">
        <span v-if="record.avgWriteTime">{{ record.avgWriteTime }}分钟</span>
        <span v-else>-</span>
      </span>
      <span slot="submitTime" slot-scope="text, record">
        <span v-if="record.createTime">{{ record.createTime | getFormatDate }}</span>
        <span v-else>-</span>
      </span>
    </a-table>
    <no-data v-if="!(data && data.length)" style="width: 1140px;"></no-data>
  </div>
</template>

<script>
import noData from '../../../components/noData'
export default {
  name: 'data-table',
  data() {
    return {
      scroll: 500
    }
  }, 
  props: ['data', 'columns'],
  components: {
    noData
  }, 
  computed: {
      
  },
  filters: {
    datetimeFormat(val) {
      if (!val) {
        return ''
      }
      let time1 = new Date(val)
      let year = time1.getFullYear()
      let month = time1.getMonth() + 1
      let day = time1.getDate()
      let hour = time1.getHours()
      let minute = time1.getMinutes()
      let second = time1.getSeconds()
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      hour = hour < 10 ? `0${hour}` : hour
      minute = minute < 10 ? `0${minute}` : minute
      return `${year}/${month}/${day} ${hour}:${minute}`
    }
  },
  mounted() {
      
  }, 
  methods: {
    // 点击行
    onClick(record, index) {
      return {
        on: {
          click: () => {
            // let rece iveData = Object.assign(record, this.item)
            // localforage.setItem('compositionStdInfo', receiveData).then(() => {
              this.$router.push({
                name: 'composition-one-detail',
                // params: { record: receiveData }
              })
            // })
          }
        }
      }
    },
  }
}
</script>