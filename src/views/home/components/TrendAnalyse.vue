<template>
  <div class="trend-analyse">
    <div class="header">
      <Headline title="趋势分析"></Headline>
    </div>
    <div class="filter-toolbar">
      <div class="grade">
        <TrendAnalyseItem
          v-for="(item, index) of classes"
          :key="index"
          :item="item"
          :index="index"
          @updateGradeClass="updateGradeClass"
        ></TrendAnalyseItem>
      </div>
      <div class="rate">
        <a-checkbox @change="onTrueRateChange" :checked="trueRateChecked">
          <span class="trueRate">正确率</span>
        </a-checkbox>
        <a-checkbox @change="onFinishRateChange" :checked="finishRateChecked">
          <span class="finishRate">提交率</span>
        </a-checkbox>
      </div>
    </div>
    <div id="echarts"></div>
    <div id="tip" class="tipname hide"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import localforage from 'localforage'
const echarts = require('echarts')
import Headline from '../../../components/Headline'
import TrendAnalyseItem from './TrendAnalyseItem'
export default {
  name: 'trend-analyse',
  components: {
    Headline,
    TrendAnalyseItem
  },
  data: function() {
    return {
      classes: [],
      list: [],
      gradeClass: [],
      trueRateChecked: true,
      finishRateChecked: true,
      colors: ['#0FA2FF', '#FF9948', '#36CAB0', '#CB70FF']
    }
  },
  methods: {
    initEcharts() {
      let xAxis = []
      let series = []
      this.list[0] &&
        this.list[0].finishTruePoints.forEach(item => {
          xAxis.push(item.textbookChapterName)
        })

      this.list.forEach((item, index) => {
        if (this.gradeClass.includes(item.gradeClassId)) {
          let solid = {
            name: '',
            type: 'line',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2
                },
                color: this.colors[index]
              }
            },
            data: []
          }
          let dotted = {
            name: '',
            type: 'line',
            smooth: false, //关键点，为true是不支持虚线的，实线就用true
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted' //'dotted'虚线 'solid'实线
                },
                color: this.colors[index]
              }
            },
            data: []
          }
          let gradeClassname
          this.classes.forEach(classItem => {
            if (classItem.gradeClassid === item.gradeClassId) {
              gradeClassname = classItem.gradeClassname
            }
          })
          item.finishTruePoints.forEach(item => {
            if (this.trueRateChecked) {
              solid.name = gradeClassname + '正确率'
              solid.data.push(item.trueRate)
            }
            if (this.finishRateChecked) {
              dotted.name = gradeClassname + '提交率'
              dotted.data.push(item.finishRate)
            }
          })
          series.push(solid)
          series.push(dotted)
        }
      })
      var myChart = echarts.init(document.getElementById('echarts'))
      // 绘制图表
      myChart.setOption(
        {
          color: this.colors,
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis,
            axisLabel: {
              interval: 0,
              formatter: function(value) {
                return value.length > 3 ? value.slice(0, 5) + '..' : value
              }
            },
            triggerEvent: true
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %'
            },
            min: 0,
            max: 100
          },
          series: series
        },
        true
      )

      myChart.on('mouseover', function(params) {
        if (params.componentType == 'xAxis') {
          var tt = $('#tip')
          tt.html(params.value)

          tt.css('left', params.event.event.layerX + 10)
          tt.css('top', params.event.event.layerY + 12)

          tt.show()
        }
      })

      myChart.on('mouseout', function() {
        var tt = $('#tip')
        tt.hide()
      })
    },
    updateGradeClass(value) {
      if (this.gradeClass.includes(value)) {
        this.gradeClass.forEach((item, index) => {
          if (item === value) {
            this.gradeClass.splice(index, 1)
          }
        })
      } else {
        this.gradeClass.push(value)
      }
      this.$nextTick().then(() => {
        this.initEcharts()
      })
    },
    onTrueRateChange(event) {
      this.trueRateChecked = event.target.checked
      this.$nextTick().then(() => {
        this.initEcharts()
      })
    },
    onFinishRateChange() {
      this.finishRateChecked = event.target.checked
      this.$nextTick().then(() => {
        this.initEcharts()
      })
    }
  },
  mounted() {
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        // 获取前4班级
        let classes
        if (value.classes.length > 4) {
          classes = value.classes.slice(0, 4)
        } else {
          classes = value.classes
        }
        this.classes = classes
        classes.forEach(item => {
          this.gradeClass.push(item.gradeClassid)
        })
        // 获取前四班级数据
        this.$store.dispatch('home/finishTrueRatePoint').then(data => {
          this.list = data.infos
          this.$nextTick().then(() => {
            this.initEcharts()
          })
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
.tipname {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  max-width: 400px;
  padding: 5px;
  z-index: 99999999;
  color: #fff;
}

.echarts {
  width: 100%;
  height: 100%;
}
.trend-analyse {
  scrollbar-width: none;
  flex: 1;
  height: 300px;
  position: relative;
  background-color: #fff;
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .filter-toolbar {
    position: absolute;
    top: 3%;
    right: 10px;
    .grade {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .rate {
      text-align: right;
    }
  }
  #echarts {
    flex: auto;
    height: 300px;
  }
}
.trueRate {
  border-bottom: 2px solid #54657e;
}
.finishRate {
  border-bottom: 2px dashed #54657e;
}
</style>
