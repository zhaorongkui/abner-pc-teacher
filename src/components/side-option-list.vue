<template>
  <div>
    <div class="work-select-box">
      <a-select
        :placeholder="'请选择'"
        style="width: 100%"
        @select="handleChange"
        v-model="selectedOption">
        <template v-for="(item,index) in readingOptions">
          <a-select-option :value="index" :key="item.value">{{ item.value }}</a-select-option>
        </template>
      </a-select>
    </div>
    <div class="work-list">
      <div v-for="(optionItem, index) in selectedList" :key="index"
           v-bind:class="{selected: optionItem.selected}"
           @click="selectWorkTarget(optionItem)">
        <div class="item-label item-label-other" v-if="selectedList === typeList || selectedList === abilityList">
          {{optionItem.value}}
        </div>
        <div class="work-list-else-if-time" v-else-if="selectedList === timeList">
          <span class="special-line" v-bind:class="{'special-line-month': optionItem.type === 'month'}"></span>
          <span class="item-label-time" v-if="optionItem.type === 'month'">
                <span class="item-label-month-circle-wrapper">
                  <span class="item-label-month-circle"></span>
                </span>
                <span class="item-label-month-flex">
                  <span class="item-label-month-dash"></span>
                  <span class="item-label-month-text">{{optionItem.momentTime.month() + 1}} 月</span>
                  <span class="item-label-month-dash"></span>
                </span>

              </span>
          <span class="item-label-time item-label-time-today" v-else-if="optionItem.isToday">
                <span class="item-label-today-circle"></span>
                <span class="item-label-today-text">今天</span>
              </span>
          <span v-else class="item-label-time item-label-time-today  "
                v-bind:class="{'item-label-time-selected': optionItem.selected}">
                <span class="item-label-day-circle"></span>
                <span class="item-label-day-text" >{{optionItem.momentTime.format('MM月 DD日')}}</span>
              </span>
        </div>
      </div>
      <!--            <read-tree :tree="treeData" v-model="treeModel" @on-change="treeChange"></read-tree>-->
    </div>
  </div>
</template>

<script>

    import moment from "moment";

    export default {
      name: "side-option-list",
      props: ['infos'],
      data() {
        return {
          selectedOption: 0,
          selectedWorkTarget: null,
          selectedList: [],
          readingOptions: [
            {
              key: '1',
              value: '按文体',
              selected: false
            },
            {
              key: '2',
              value: '按维度',
              selected: false
            },
            {
              key: '3',
              value: '按时间',
              selected: false
            },
          ],
          // 按文体
          typeList: [],
          // 按维度
          abilityList: [],
          // 按时间
          timeList: [
          ],
        }
      },
      watch: {
        infos() {
          if (!this.infos) {
            return;
          }
          this.mapOptionIntoSideList(this.infos)
          this.selectedList = this.typeList
        }
      },
      methods: {
        selectWorkTarget(item) {
          console.log('item', item)
          // 阻挡时间当中月和今天的选择
          if (item.type === 'month' || item.isToday) {
            return
          }

          if (this.selectedWorkTarget) {
            this.selectedWorkTarget.selected = false;
          }

          item.selected = true
          this.selectedWorkTarget = item;
          console.log('call get reading here')
          // this.getReadings();
          this.sendEmitValue()
        },
        sendEmitValue() {
          let params = {
            questionTextType: null,
            questionAbility: null,
            questionCreatetime: null
          }
          if (this.selectedList === this.typeList) {
            // params.questionTextType =  this.selectedWorkTarget.key
            params.questionTextType =  this.selectedWorkTarget.key
          } else if (this.selectedList === this.abilityList) {
            params.questionAbility =  this.selectedWorkTarget.key
          } else {
            params.questionCreatetime =  this.selectedWorkTarget.value
          }
          this.$emit('selectSideOption', params)

        },
        handleChange(target) {
          console.log('target', target)
          switch (target) {
            case 0:
              this.selectedList = this.typeList;
              break;
            case 1:
              this.selectedList = this.abilityList;
              break;
            case 2:
              this.selectedList = this.timeList;
              break;
          }
          console.log('this. selected list', this.selectedList)
        },
        mapOptionIntoSideList(data) {
          console.log('map option', data)
          this.typeList = this.mapKeyValueWithSelected(data.articleTextTypeList);
          this.abilityList = this.mapKeyValueWithSelected(data.articleAbilityList);

          // fake date data
          let date3 = '2019-06-01'
          let date4 = '2019-07-02'

          data.dateList.unshift(date4)
          data.dateList.unshift(date3)

          // code restart here

          let checkIsTodayBoo = false;
          let todayMoment = moment()

          this.timeList = data.dateList.map((time, index) => {
            // console.log('jsTime', jsTime)
            let momentTime = moment(time);
            let timeObj = {
              key: index,
              value: time,
              momentTime: momentTime,
              selected: false,
              type: 'day',
            }

            // 默认 moment diff 会round down， 加了true 会出小数
            if (momentTime.diff(todayMoment, 'days', true) > -1
              && momentTime.diff(todayMoment, 'days', true) <= 0 ) {
              timeObj.isToday = true;
              checkIsTodayBoo = true;
            } else {
              timeObj.isToday = false
            }

            console.log('time', timeObj)
            return timeObj
          })

          if (!checkIsTodayBoo) {
            let todayIndex = this.timeList.findIndex((time, index) => {
              if( index + 1 < this.timeList.length - 1
                && time.momentTime < todayMoment && this.timeList[index + 1].momentTime > todayMoment) {
                return true;
              } else {
                return false
              }
            })
            // 将今天插入到最后
            if (todayIndex === -1) {
              this.timeList.push({
                key: this.timeList.length,
                value: todayMoment.toISOString(),
                momentTime: todayMoment,
                selected: false,
                type: 'day',
                isToday: true,
              })
            } else {
              // 插入今天 到todayindex
              this.timeList.splice(todayIndex + 1, 0, {
                key: todayIndex,
                value: todayMoment.toISOString(),
                momentTime: todayMoment,
                selected: false,
                type: 'day',
                isToday: true,
              })
            }
          }

          this.timeList = this.timeList.reverse();
          this.timeList = this.changeTimeArrFormat()
        },
        changeTimeArrFormat() {
          let formatedTimeArray = [];
          // 第一个月的对象
          formatedTimeArray.push({
            key: 0,
            value: this.timeList[0].value,
            selected: false,
            momentTime: this.timeList[0].momentTime,
            type: 'month'
          })
          // 循环日，找出日之间的月，然后插入月的对象
          this.timeList.map((time, index) => {
            if (index > 0 && time.momentTime.month() < this.timeList[index - 1].momentTime.month()){
              formatedTimeArray.push({
                key: formatedTimeArray.length,
                value: this.timeList[index].value,
                selected: false,
                momentTime: this.timeList[index].momentTime,
                type: 'month'
              })
              formatedTimeArray.push(time)
            } else {
              formatedTimeArray.push(time)
            }
            console.log('loop time', time)
          })

          console.log('formatedTimeArray', formatedTimeArray)

          // 加最后一个月
          // formatedTimeArray.push({
          //   key: formatedTimeArray.length,
          //   value: formatedTimeArray[formatedTimeArray.length - 1].value,
          //   selected: false,
          //   momentTime: formatedTimeArray[formatedTimeArray.length - 1].momentTime,
          //   type: 'month'
          // })
          return formatedTimeArray
        },
        mapKeyValueWithSelected(datas) {
          return datas.map(data => {
            return {
              key: data.key,
              value: data.value,
              selected: false,
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../styles/common";
  .work-select-box {
    padding: 17px 22px;
    background: #399eff;
    border-radius: 4px 4px 0 0;
  }

  .work-list {
    min-height: 0;
    flex: 1;
    overflow: auto;
    padding: 15px;
  }

  .work-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 32px;
  }

  .item-label {
    cursor: pointer;
    height:42px;
    padding: 15px;
    margin: 15px 0;
    font-size:14px;
    font-weight:400;
    color:rgba(91,103,121,1);
    border-radius:8px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(210, 210, 210, 1);
    display: flex;
    align-items: center;
  }

  .work-list-else-if-time {
    position: relative;
  }

  .item-label-time {
    position: relative;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 25px;
    /*margin-top: 30px;*/
    padding: 15px 0;
    cursor: pointer;
  }

  .item-label-time-selected {
    color: $clr-blue;

    .item-label-day-circle {
      background: $clr-blue;
      border-color: $clr-blue;
    }
  }

  .special-line {
    position: absolute;
    // top: -15px;
    // bottom: -15px;
    height: 51px;
    left: 35px;
    width: 50%;
    border-left: 1px solid #DDDDDD;
  }

  .special-line-month {
    height: 70px;
  }

  .item-label-time-today {
    justify-content: flex-start;
  }

  .item-label-month-flex {
    display: inline-flex;
    width: 90%;
    justify-content: space-around;
    align-items: center;
  }

  .item-label-month-text {
    display: flex;
    justify-content: center;
    align-items: center;
    width:60px;
    height:30px;
    font-size:14px;
    background:rgba(229,240,254,1);
    border-radius:15px;
    color: $clr-blue;
  }

  .item-label-today-text {
    color: #F07124;
    font-size: 14px;
  }

  .item-label-month-circle-wrapper {
    width: 17px;
    display: inline-flex;
    justify-content: center;
  }

  .item-label-month-circle {
    display: inline-block;
    width:8px;
    height:8px;
    background:rgba(16,89,255,1);
    border-radius:50%;
  }

  .item-label-today-circle {
    width:20px;
    height:20px;
    margin-right: 10px;
    background:rgba(255, 228, 0, 1);
    border:2px solid rgba(255, 228, 0, 1);
    border-radius: 50%;
  }

  .item-label-day-circle {
    display: inline-block;
    width:20px;
    height:20px;
    background:rgba(255,255,255,1);
    border:2px solid rgba(214, 225, 229, 1);
    border-radius:50%;
    margin-right: 10px;
  }

  .item-label-day-text {
    font-size:14px;
  }



  .item-label-month-dash {
    width: 70px;
    height:1px;
    border:1px dashed $clr-blue;
  }

  .work-list {
    .selected {
      .item-label-other {
        background: $clr-blue;
        color: white;
      }
    }
    .item-label:first-child {
      margin: 0
    }
  }
</style>
