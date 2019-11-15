<template>
  <el-dialog
    title="互评小组设置"
    class="custom_dialog"
    :visible.sync="showCreateDialog"
    :modal-append-to-body="false"
    :width="'1080px'"
    @close="handleDialogClose"
    center>
    <div>
      <a-row style="margin: 10px auto;">
        <a-col span="8">
          <a-button
            type="primary"
            style="width: 114px;height: 30px;font-size: 16px;text-align: center;line-height: 30px;border-radius: 10px;">{{className}}</a-button>
        </a-col>
        <a-col span="16">
          <span class="right-words">
            共<span>{{studentAmount}}</span>位学生&nbsp;
            分为<span>{{allList.length}}</span>个小组&nbsp;
            每组约<span>{{averageAmount}}</span>人&nbsp;
            待分配<span>{{waitSplitList.length}}</span>人
          </span>
        </a-col>
      </a-row>
      <hr style="border: 0;border-top: 1px solid rgba(221, 22e1, 221, .3);"/>
      <div style="position: relative;">
        <div class="groupList">
          <div v-for="(list, $index) in allList">
            <p>
              <span>第  {{list.groupNum}} 组</span>
              <span>{{list.people.length}}<span>人</span></span>
            </p>
            <hr style="border-top: 1px solid #ddd;"/>
            <ul>
              <draggable :list="list.people" group="student" :disabled="list.people.length === 10" @change="handleDragChange(list.people)">
                <li class="std_list" v-for="oneStd in list.people">
                  <span>{{oneStd.studentName}}</span>
                  <img
                    @click="deleteStudentToWaitList($index, oneStd.studentInfoId)"
                    style="width: 12px;height: 12px;cursor: pointer;"
                    src="../../../../assets/img/publish/del_std.png">
                </li>
                <li v-if="list.people.length === 0" class="no_std_list">该组没有学生~</li>
              </draggable>
            </ul>
            <div>增加学生拖入到列表里</div>
          </div>
        </div>
        <div class="waitSplitList">
          <div class="group-area">
            <p>
              <span>待分配学生</span>
              <span>{{waitSplitList.length}}<span>人</span></span>
            </p>
            <hr style="border: 0;border-top: 1px solid rgba(221, 221, 221, .3);width: 163px;margin: 0 auto;"/>
            <ul>
              <draggable
                :list="waitSplitList"
                group="student"
                ghost-class="ghost">
                <li class="std" v-for="element in waitSplitList" :key="element.studentInfoId">
                  <span>{{element.studentName}}</span>
                  <img src="../../../../assets/img/publish/drag_icon.png">
                </li>
                <li v-if="waitSplitList.length === 0" class="no_std">
                  <img src="../../../../assets/img/publish/no_std.png" />
                  <p>已经都分配完了~</p>
                </li>
              </draggable>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="modal-footer">
      <div class="footer-content">
        <span>每个小组约分配</span>
        <el-input-number
          style="margin: 0 5px;display: inline-block;"
          size="small"
          v-model="oneGroupAmount"
          :min="3"
          :max="8"
          :step="1"
          @blur="handleGroupAmountChange">
        </el-input-number>
        <span>人，调整后请点击重新分配。</span>
      </div>
      <a-button type="primary" style="border-radius: 17px;margin-right: 180px;margin-left: -35px;" @click="setGroupOrder" ghost>重新分配</a-button>
      <a-button type="primary" style="border-radius: 17px;" @click="lessSetOrder" ghost>剩余自动分配</a-button>
      <div class="float_box" v-if="studenetGroupNotFinished || lessThreeStd">
        <h4>提示</h4>
        <p v-if="studenetGroupNotFinished">还有学生没分配，请将待分配学生分配到小组中。</p>
        <p v-if="lessThreeStd">请将少于3人的小组成员，分配到其它小组。</p>
        <button @click="closeTips">知道了</button>
      </div>
      <a-button type="primary" style="border-radius: 17px;margin-left: -50px;" @click="sureGroup">确定分组</a-button>
    </span>
  </el-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import http from '../../../../api/index'
export default {
  name: 'setGroup',
  props: ['classId', 'className', 'isSet', 'groupInfo'],
  data() {
    return {
      showCreateDialog: true,
      studenetGroupNotFinished: false,
      lessThreeStd: false,
      studentAmount: 0,
      oneGroupAmount: 5,
      allList: [],
      waitSplitList: [],
      collectionGroupList: [], //分组数据
      addGroupNames: '',
      addGroupId: '',
    }
  },
  mounted() {
    if(this.isSet) {
      // 已设置分组
      this.showGroupData();
    }else {
      // 没设置分组 获取下所有班级学生 随机分配一下
      this.setGroupOrder();
    }
  },
  computed: {
    averageAmount() {
      return this.studentAmount === 0 ? 0 : Math.floor(this.studentAmount / this.allList.length);
    }
  },
  components: {
    draggable
  },
  methods: {
    // 删除学生   返回待分配列表
    deleteStudentToWaitList(i, j) {
      let arr = this.allList[i].people.filter(val => val.studentInfoId === j);
      this.allList[i].people = this.allList[i].people.filter(val => val.studentInfoId !== j)
      this.waitSplitList.push(...arr);
    },
    // 有分组数据,  展示分组数据
    showGroupData() {
      this.studentAmount = this.groupInfo.length;
      let group = [...this.groupInfo];
      let groupNumList = [];
      group.map(val => {
        groupNumList.push(val.groupNum);
      })
      let groupList = Array.from(new Set(groupNumList));
      groupList.map(val => {
        let groupL = group.filter(value => value.groupNum === val)
        this.allList.push({
          groupNum: val,
          people: groupL
        })
      })
      this.oneGroupAmount = this.averageAmount;
    },
    // 没分组数据  随机分配
    setGroupOrder() {
      // 获取学生列表
      http.get('/api/teacher/homework/queryStudentByGradeClassId', {
        params: {
          gradeClassId: this.classId,
        }
      }).then(res => {
        console.log(res);
        let teacherId = this.$store.state.userInfo.teacherId
        this.studentAmount = res.data.infos.length;
        let data = res.data.infos;
        let forLoopTimes = Math.ceil(data.length / this.oneGroupAmount);
        this.allList = [];
        this.waitSplitList.splice(0, this.waitSplitList.length);
        for(var i = 0; i < forLoopTimes; i++) {
          this.allList.push({
            groupNum: i + 1,
            people: []
          })
          if(this.studentAmount > 10 && i === (forLoopTimes - 1)) {
            let lastTimes = data.length - i * this.oneGroupAmount;
            if(lastTimes < 3) {
              for(var l = 0; l < lastTimes; l++) {
                let obj = {
                  teacherId: teacherId
                }
                data[i * this.oneGroupAmount + l].studentInfoId ? obj.studentInfoId = data[i * this.oneGroupAmount + l].studentInfoId : '';
                data[i * this.oneGroupAmount + l].studentName ? obj.studentName = data[i * this.oneGroupAmount + l].studentName : '';
                this.allList[l].people.push(obj)
              }
              continue
            }
          }
          for(var j = 0; j < this.oneGroupAmount; j++) {
            let obj = {
              teacherId: teacherId
            }
            data[i * this.oneGroupAmount + j].studentInfoId ? obj.studentInfoId = data[i * this.oneGroupAmount + j].studentInfoId : '';
            data[i * this.oneGroupAmount + j].studentName ? obj.studentName = data[i * this.oneGroupAmount + j].studentName : '';
            this.allList[i].people.push(obj)
          }
        } 
        this.allList.map(val => {
          if(val.people.length === 0) {
            this.allList = this.allList.filter(value => value.groupNum !== val.groupNum)
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 剩余自动分配
    lessSetOrder() {
      for(var j = 0; j < this.allList.length; j++) {
        let peopleLen = this.allList[j].people ? this.allList[j].people.length : 0;
        let space = this.oneGroupAmount - peopleLen;
        if(space > 0) {
          let arr = this.waitSplitList.splice(0, space);
          this.allList[j].people.push(...arr);
        }
      }
      if(this.waitSplitList.length > 0) {
        if(this.waitSplitList.length < this.oneGroupAmount) {
          this.allList.push({
            groupNum: this.allList.length + 1,
            people: []
          })
          this.waitSplitList.map(val => {
            let pushData = {
              teacherId: val.teacherId
            }
            val.studentInfoId ? pushData.studentInfoId = val.studentInfoId : '';
            val.studentName ? pushData.studentName = val.studentName : '';
            val.id ? pushData.id = val.id : '';
            this.allList[this.allList.length - 1].people.push(pushData)
          })
          this.waitSplitList.splice(0, this.waitSplitList.length);
        }else {
          let forLoopTimes = Math.ceil(this.waitSplitList.length / this.oneGroupAmount);
          let teacherId = this.$store.state.userInfo.teacherId;
          for(var i = 0; i < forLoopTimes; i++) {
            this.allList.push({
              groupNum: this.allList.length + 1,
              people: []
            })
            for(var k = 0; k < this.oneGroupAmount; k++) {
              if(this.waitSplitList[i * this.oneGroupAmount + k]) {
                let obj = {
                  teacherId: teacherId
                }
                this.waitSplitList[i * this.oneGroupAmount + k].studentInfoId ? obj.studentInfoId = this.waitSplitList[i * this.oneGroupAmount + k].studentInfoId : '';
                this.waitSplitList[i * this.oneGroupAmount + k].studentName ? obj.studentName = this.waitSplitList[i * this.oneGroupAmount + k].studentName : '';
                this.waitSplitList[i * this.oneGroupAmount + k].id ? obj.id = this.waitSplitList[i * this.oneGroupAmount + k].id : '';
                console.log(this.allList[this.allList.length - 1])
                this.allList[this.allList.length - 1].people.push(obj)
              }
            } 
          }
          this.waitSplitList.splice(0, this.waitSplitList.length);
        }
        if(this.allList[this.allList.length - 1].people.length < 3) {
          // this.allList[this.allList.length - 1].people
          let lastGroup = this.allList.pop().people;
          lastGroup.map((val, index) => {
            this.allList[index].people.push(val);
          })
        }
      }
    },
    // 确认分组
    sureGroup() {
      if(this.waitSplitList.length > 0) {
        this.studenetGroupNotFinished = true;
        return false;
      }
      if(this.studentAmount > 10) {
        let flag = false;
        this.allList.map(val => {
          if(val.people.length > 0 && val.people.length < 3) {
            flag = true;
          }
        })
        if(flag) {
          this.lessThreeStd = true;
          return false;
        }
      }
      let teacherId = this.$store.state.userInfo.teacherId
      let params = {
        groupSetList: []
      };
      this.allList.map(val => {
        if(val.groupNum && val.people && val.people.length !== 0) {
          val.people.map(v => {
            let pushData = {
              groupNum: val.groupNum,
              studentInfoId: v.studentInfoId,
              teacherId: teacherId,
            }
            params.groupSetList.push(pushData)
          })
        }
      })
      console.log(params);
      http.post('/api/teacher/homework/setGroup', {
        requestParam:  JSON.stringify(params)
      }).then(data => {
        console.log(data);
        if(data.data.flag === 1) {
          this.$message.success('设置分组成功!')
          this.showCreateDialog = false;
          this.$emit('setGroupSuccess');
        }else {
          data.data.message ? this.$message.error(data.data.message) : this.$message.error('设置分组失败!');
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 拖拽change事件
    handleDragChange(people) {
      console.log(people)
      // if(people.length > this.oneGroupAmount) {
      //   let arr = people.splice(this.oneGroupAmount, people.length - this.oneGroupAmount);
      //   this.waitSplitList.push(...arr);
      // }
    },
    // 分配人数的change事件
    handleGroupAmountChange() {
      this.oneGroupAmount = Math.round(this.oneGroupAmount);
      this.oneGroupAmount > 8 ? this.oneGroupAmount = 8 : '';
      this.oneGroupAmount < 3 ? this.oneGroupAmount = 3 : '';
    },
    // 弹框关闭
    handleDialogClose() {
      this.showCreateDialog = false;
      this.$emit('dialogClose')
    },
    // 关闭冒泡提示
    closeTips() {
      this.studenetGroupNotFinished = false;
      this.lessThreeStd = false;
    }
  }
}
</script>

<style scoped>
.custom_dialog >>> .el-dialog__header {
  border-bottom: 1px solid #ddd;
}
.right-words {
  color: #999;
  float: right;
}
.right-words > span {
  color: #5E84AD;
}
.groupList {
  width: 800px;
  height: 437px;
  overflow-y: auto;
  padding-top: 10px;
}
.groupList > div {
  width: 184px;
  height: 370px;
  padding: 8px 10px 20px;
  border: 1px solid #dedede;
  border-radius: 10px;
  margin-right: 16px;
  float: left;
  position: relative;
  margin-bottom: 16px;
}
.groupList > div > p {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2px;
  align-items: center;
  line-height: 30px;
}
.groupList > div > p span:first-child {
  font-size: 16px;
  color: #5E84AD;
}
.groupList > div > p span:last-child {
  font-size: 18px;
  color: #5E84AD;
}
.groupList > div > p span:last-child > span {
  font-size: 12px;
}
.groupList > div > ul,
.groupList > div > ul > div {
  height: 260px;
  overflow-y: auto;
}
.groupList > div > ul li.std_list {
  width: 160px;
  height: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F4F8FF;
  color: #596878;
  font-size: 14px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 4px;
  position: relative;
  /* cursor: move; */
}
.groupList > div > div:last-child {
  width: 160px;
  height: 40px;
  border: 1px dashed #91B5F4;
  background: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  position: absolute;
  bottom: 16px;
  left: 10px;
}
.groupList .no_std_list {
  width: 100%;
  min-height: 240px;
  padding-top: 85px;
  font-size: 14px;
  color: #6181ca;
  text-align: center;
}
.waitSplitList {
  position: absolute;
  right: 0;
  top: 10px;
  border-left: 1px solid #ddd;
  padding: 11px 0 0 16px;
}
.group-area {
  width: 184px;
  height: 440px;
  border: 1px solid #dedede;
  border-radius: 10px;
  overflow-y: auto;
}
.group-area > p {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  box-sizing: border-box;
  align-items: center;
  line-height: 30px;
}
.group-area > p > span {
  color: #5E84AD;
}
.group-area > p > span:first-child {
  font-size: 16px;
}
.group-area > p > span:last-child {
  font-size: 18px;
}
.group-area > p > span:last-child span {
  font-size: 12px;
}
.group-area > ul,
.group-area > ul > div {
  height: 370px;
  overflow-y: auto;
}
.group-area > ul li.std {
  background: #FFEFE3;
  color: #ee7414;
  font-size: 14px;
  width: 160px;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 15px;
  box-sizing: border-box;
  align-items: center;
  margin: 10px auto;
  cursor: move;
  border-radius: 4px;
}
.group-area > ul li.std > img {
  width: 18px;
  height: 18px;
}
.modal-footer {
  width: 100%;
  height: 63px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  box-shadow: 0 0px 10px rgba(52,52,52,.33);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.modal-footer > div.footer-content {
  width: 430px;
  height: 42px;
  border-radius: 20px;
  background: #f2f2f2;
  font-size: 14px;
  color: #969696;
  padding-left: 6px;
  line-height: 42px;
}
.group-area ul li.no_std {
  width: 100%;
  min-height: 350px;
  text-align: center;
}
.group-area ul li.no_std img {
  width: 136px;
  height: 119px;
  margin-top: 56px;
}
.group-area ul li.no_std p {
  margin-top: 10px;
  font-size: 14px;
  color: #6181ca;
}
.float_box {
  background: url(../../../../assets/img/publish/tip_background.png);
  background-size: cover;
  position: absolute;
  width: 300px;
  padding: 25px 16px;
  display: flex;
  flex-direction: column;
  right: 12px;
  bottom: 59px;
  text-align: left;
  font-size: 14px;
  z-index: 999;
  min-height: 170px;
}
.float_box h4 {
  color: #5e84ad;
}
.float_box p {
  color: #4e5f71;
  margin-top: 12px;
}
.float_box button {
  width: 92px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #ee8b3c;
  color: #ee8b3c;
  align-self: flex-end;
  background: #fff;
  line-height: 30px;
  cursor: pointer;
  text-align: center;
  outline: none;
  font-size: 14px;
}
</style> 