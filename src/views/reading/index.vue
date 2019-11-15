<template>
  <div class="reading">
    <div class="chart-content">
      <read-chart />
    </div>
    <div class="table-card card">
      <div class="table-state margin-bottom-10">
        <a-button :type="tableState==='0' ? 'primary': 'default'" class="button-radius margin-right-20" @click="changeTableState('0')">阅读篇目分析</a-button>
        <a-button :type="tableState==='1' ? 'primary': 'default'" class="button-radius margin-right-10" @click="changeTableState('1')">学生训练分析</a-button>
        <a-popover placement="right" >
          <template slot="content">
            数据统计范围只包含已生成的结果数据
          </template>
          <a-icon type="question-circle" theme="filled" :style="{fontSize: '15px', color: '#CAD3DF'}"/>
        </a-popover>
      </div>
      <div class="table-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import ReadChart from './components/ReadChart'
export default {
  name: 'reading',
  components: {ReadChart},
  data () {
    return {
      tableState: null,
      readNumber: 30,
      routerNames: {
        "0": 'readAnalyze',
        "1": 'studentAnalyze',
      }
    }
  },
  created() {
    this.setTableState()
  },
  methods: {
    setTableState(){
      for(let k in this.routerNames) {
        if (this.routerNames[k] === this.$route.name) {
          this.tableState = k;
          return false;
        }
      }
    },
    changeTableState(state) {
      this.tableState = state
      this.$router.push({
        name: this.routerNames[this.tableState]
      })
    }
  }
}
</script>

