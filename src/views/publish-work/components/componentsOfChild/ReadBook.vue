<style scoped>
.read-book {
  padding: 20px 0;
  height: calc(100% - 42px);
  position: relative;
}
.read-book-content {
  display: flex;
  height: 100%;
  border-radius: 4px;
  background: #ffffff;
}
.read-book-content-left {
  display: flex;
  flex-direction: column;
  width: 294px;
  height: 100%;
  border-right: 1px solid #e9e9e9;
}

.read-book-content-right {
  min-width: 0;
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.work-select-box {
  padding: 17px 22px;
  background: #399eff;
  border-radius: 4px 4px 0 0;
}
.work-list {
  min-height: 0;
  flex: 1;
  overflow: auto;
}
.page-btn-list {
  padding: 15.5px 20px;
  border-bottom: 1px solid #dddddd;
}
.work-list-box {
  min-height: 0;
  flex: 1;
  height: 100%;
  padding: 0 32px;
  overflow: auto;
}
.work-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 32px;
}
.selected-box {
  cursor: pointer;
  top: 50%;
  right: 10px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: #fdfbee;
  border: 1px solid rgba(253, 220, 148, 1);
  border-radius: 12px;
  padding: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(240, 113, 36, 1);
}
.selected-work-number {
  font-size: 30px;
  line-height: 1.2;
}
.selected-text {
  font-size: 14px;
}
.work-info {
  font-size: 14px;
  font-weight: 400;
}
.work-page-number {
  color: rgba(94, 132, 173, 1);
}
.work-page-all-select,
.work-page-size {
  color: rgba(170, 170, 170, 1);
}
</style>

<template>
  <div class="read-book">
    <div class="read-book-content">
      <div class="read-book-content-left">
        <div class="work-select-box">
          <a-select
            :placeholder="'请选择'"
            style="width: 100%;"
            @change="handleChange"
            v-model="workBookId"
          >
            <template v-for="item in workBookData">
              <a-select-option
                :value="item.value"
                :data-type="item.type"
                :key="item.value"
                >{{ item.label }}</a-select-option
              >
            </template>
          </a-select>
        </div>
        <div class="work-list">
          <read-tree
            :tree="treeData"
            v-model="treeModel"
            @on-change="treeChange"
          ></read-tree>
        </div>
      </div>
      <div class="read-book-content-right">
        <div class="page-btn-list" v-show="workbookChapterCode">
          <page-btn
            v-if="workBookType === 1"
            v-model="pageNumber"
            :page-list="workbookPageInfoList"
            @on-change="changePageNumber"
          ></page-btn>
          <ability-screening
            v-model="workBookTypeValue"
            :data="abilityDimensionList"
            v-else-if="workBookType === 2"
            @on-change="changeAbilityScreening"
          ></ability-screening>
        </div>
        <div class="work-info" v-if="workBookType === 1">
          <span class="work-page-number"> 第{{ this.pageNumber }}页 </span>
          <span class="work-page-size">
            本页共{{ this.workbookArticleList.length }}题
          </span>
          <span class="work-page-all-select">
            <a-checkbox @change="onCheckAll" :checked="checkAll">{{
              (checkAll ? '取消' : '本页') + '全选'
            }}</a-checkbox>
          </span>
        </div>
        <div class="work-info" v-else>
          <span class="work-page-size">
            共{{ this.abilityDimensinFiltration.length }}题
          </span>
          <span class="work-page-all-select">
            <a-checkbox
              @change="onAbilityDimensionListCheckAll"
              :checked="abilityDimensionListCheckAll"
              >{{
                (abilityDimensionListCheckAll ? '取消' : '本节') + '全选'
              }}</a-checkbox
            >
          </span>
        </div>
        <div class="work-list-box">
          <no-work-book-page-info
            v-if="!workbookArticleList.length && workBookType === 1"
          ></no-work-book-page-info>
          <no-work-book-page-info
            v-if="!abilityDimensinFiltration.length && workBookType === 2"
          ></no-work-book-page-info>
          <template v-if="workBookType === 1">
            <read-list-card
              v-for="item in workbookArticleList"
              :data="item"
              :selected="workListById"
              :key="item.questionId"
              @look="lookOriginal"
              @on-add-work="addWork"
              @on-add-favorites="addFavorites"
            >
            </read-list-card>
          </template>
          <template v-else>
            <read-list-card
              v-for="item in abilityDimensinFiltration"
              :data="item"
              :selected="workListById"
              :key="item.questionId"
              @look="lookOriginal"
              @on-add-work="addWork"
              @on-add-favorites="addFavorites"
            >
            </read-list-card>
          </template>
        </div>
      </div>
    </div>
    <look-original ref="original"></look-original>
    <ClassifyDialog
      v-if="showDialog"
      @toParentEvents="showDialog = false"
      @toParentEvent="getId"
      @toParentEventStore="addCollectStore"
    ></ClassifyDialog>
  </div>
</template>

<script>
import ReadTree from '../../../../components/readTree/ReadTree'
import PageBtn from '../../../../components/PageBtn'
import ReadListCard from '../../../../components/ReadListCard'
import LookOriginal from '../../../../components/LookOriginal'
import AbilityScreening from '../../../../components/AbilityScreening'
import ClassifyDialog from './ClassifyDialog'
import NoWorkBookPageInfo from '../../../../components/NoWorkBookPageInfo'

export default {
  name: 'readBook',
  components: {
    ReadTree,
    PageBtn,
    ReadListCard,
    LookOriginal,
    AbilityScreening,
    ClassifyDialog,
    NoWorkBookPageInfo
  },
  data() {
    return {
      sectionIndex: 0,
      abilityDimensionList: [],
      workbookPageInfoList: [],
      showDialog: false,
      // workbookArticleList: [],
      CollectionInfos: null,
      collectonGroupId: 0,
      // workList: [],
      // workListById: [],
      pageNumber: 0,
      treeModel: [],
      treeData: [],
      workbookChapterCode: '',
      workBookId: undefined,
      workBookType: null,
      workBookTypeValue: '',
      workBookData: []
    }
  },
  computed: {
    workbookArticleList: {
      set: function(v) {
        this.$store.commit('work/SET_READ_QUESTION_LIST', v)
      },
      get: function() {
        return this.$store.state.work.readQuestionList
      }
    },
    abilityDimensinFiltration() {
      if (this.workBookTypeValue === '全部') {
        return this.workbookArticleList
      } else {
        console.log(this.workBookTypeValue)
        let value = this.workBookTypeValue.split(',')
        var arr = this.workbookArticleList.filter(item => {
          let abilityDimensionsArr = []
          if (item.abilityDimensions) {
            abilityDimensionsArr = $.trim(item.abilityDimensions).split('|')
          }
          //console.log('abilityDimensionsArr', abilityDimensionsArr)
          //console.log('value', value)
          let count = abilityDimensionsArr.filter(item => {
            let str = $.trim(item)
            return value.includes(str)
          })
          //console.log('count', count)
          return count.length
        })
        return arr
      }
    },
    checkAll() {
      if (this.workbookArticleList.length) {
        return this.workbookArticleList.every(item => {
          return this.workListById.includes(item.questionId)
        })
      } else {
        return false
      }
    },
    abilityDimensionListCheckAll() {
      if (this.abilityDimensinFiltration.length) {
        return this.abilityDimensinFiltration.every(item => {
          return this.workListById.includes(item.questionId)
        })
      } else {
        return false
      }
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    workList() {
      return this.$store.getters['work/readWorkList']
    },
    workListById() {
      return this.$store.getters['work/readWorkListById']
    }
  },
  created() {
    this.getWorkBookData()
  },
  activated() {
    if (this.pageData) {
      this.changePageNumber(this.pageData)
    }
  },
  methods: {
    hideImageView() {
      this.picflag = false
    },
    onCheckAll() {
      this.allAllWork()
    },
    onAbilityDimensionListCheckAll() {
      this.allAbilityDimensionListAllWork()
    },
    getId(id) {
      this.collectonGroupId = id
    },
    addFavorites(data) {
      if (data.teacherQuestionCollectonId) {
        this.deleteCollection(data)
      } else {
        this.showDialog = true
        this.CollectionInfos = data
      }
    },
    deleteCollection(data) {
      let params = {
        teacherQuestionCollectionId: data.teacherQuestionCollectonId
      }
      this.$http('/api/collection/teacher/delCollection', { params })
        .then(res => {
          if (res.data.flag === 1) {
            let obj = {
              collectonId: null,
              findId: data.questionId
            }
            this.setWorlCollecton(obj)
            this.$message.success('取消收藏成功')
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    addCollectStore() {
      ;(this.CollectionInfos.collectonGroupId = this.collectonGroupId),
        this.$store
          .dispatch('publish/addStore', this.CollectionInfos)
          .then(data => {
            if (data.flag === 1) {
              this.showDialog = false
              let obj = {
                collectonId: data.infos,
                findId: this.CollectionInfos.questionId
              }
              this.setWorlCollecton(obj)
              this.CollectionInfos = null
              this.$message.success('收藏成功')
            } else {
              this.$message.error('收藏失败')
            }
          })
    },
    setWorlCollecton(obj) {
      this.$store.commit('work/SET_TECHER_QUESTION_COLLECTONID', obj)
    },
    lockWorkList() {
      this.$refs['readWorkListModal'].visible = true
    },
    allAbilityDimensionListAllWork() {
      let workListById = this.workListById
      let workList = this.workList
      let checkAll = this.abilityDimensionListCheckAll
      this.abilityDimensinFiltration.forEach(item => {
        if (workListById.includes(item.questionId)) {
          if (checkAll) {
            workList = workList.filter(child => {
              return child.questionId !== item.questionId
            })
            workListById = workListById.filter(child => {
              return child !== item.questionId
            })
          }
        } else {
          workListById.push(item.questionId)
          workList.push(item)
        }
      })
      this.$store.commit('work/SETREADWORKLIST', workList)
      this.$store.commit('work/SETREADWORKLISTBYID', workListById)
      // if (checkAll) {
      //   this.$message.success('取消全选成功')
      // } else {
      //   this.$message.success('全选成功')
      // }
    },
    allAllWork() {
      let workListById = this.workListById
      let workList = this.workList
      let checkAll = this.checkAll
      this.workbookArticleList.forEach(item => {
        if (workListById.includes(item.questionId)) {
          if (checkAll) {
            workList = workList.filter(child => {
              return child.questionId !== item.questionId
            })
            workListById = workListById.filter(child => {
              return child !== item.questionId
            })
          }
        } else {
          workListById.push(item.questionId)
          workList.push(item)
        }
      })
      this.$store.commit('work/SETREADWORKLIST', workList)
      this.$store.commit('work/SETREADWORKLISTBYID', workListById)
      // if (checkAll) {
      //   this.$message.success('取消全选成功')
      // } else {
      //   this.$message.success('全选成功')
      // }
    },
    addWork(data) {
      let workListById = this.workListById
      let workList = this.workList
      if (workListById.includes(data.questionId)) {
        workList = workList.filter(item => {
          return item.questionId !== data.questionId
        })
        workListById = workListById.filter(item => {
          return item !== data.questionId
        })
        this.$store.commit('work/SETREADWORKLIST', workList)
        this.$store.commit('work/SETREADWORKLISTBYID', workListById)
        // this.$message.success('移出成功')
      } else {
        workListById.push(data.questionId)
        workList.push(data)
        this.$store.commit('work/SETREADWORKLIST', workList)
        this.$store.commit('work/SETREADWORKLISTBYID', workListById)
        // this.$message.success('加入成功')
      }
    },
    lookOriginal(obj) {
      this.$refs['original'].id = obj.questionId
      this.$refs['original'].visible = true
    },
    // 获取阅读练习册
    getWorkBookData() {
      this.$store
        .dispatch('publish/readAllWorkbook')
        .then(res => {
          let remote = res.data.infos.workbookList
          let allAbility = { label: '全部', value: '全部' }
          let abilityArr = res.data.infos.abilityDimensionList.map(item => {
            return {
              value: item.dataValue,
              label: item.dataKey
            }
          })
          this.abilityDimensionList = [allAbility, ...abilityArr] // 练习册能力维度
          this.workBookTypeValue = this.abilityDimensionList[0].value // 默认选中全部
          this.workBookData = remote.map(item => {
            return {
              value: item.workbookId,
              label: item.workbookName,
              type: item.workbookType
            }
          })
          if (this.workBookData.length) {
            this.workBookId = this.workBookData[0].value // 默认选中第一个练习册
            this.workBookType = this.workBookData[0].type // 练习册类型
            let data = {
              workbookId: this.workBookData[0].value,
              workbookType: this.workBookData[0].type
            }
            this.getWorkBookChapter(data) // 请求练习册数据
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleChange(val, option) {
      let data = {
        workbookId: val,
        workbookType: option.data.attrs['data-type']
      }
      this.workBookType = option.data.attrs['data-type']
      this.workBookTypeValue = this.abilityDimensionList[0].value // 默认选中全部
      this.treeModel = []
      this.getWorkBookChapter(data)
    },
    // 获取练习册数据
    getWorkBookChapter(data) {
      this.$http('/api/workbook/chapter', { params: data })
        .then(res => {
          if (res.data.flag === 1) {
            let remote = res.data.infos
            this.createTreeData(remote) // 创建左侧练习册数据
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 左侧练习册章节数据
    createTreeData(data) {
      let arr = data.sort(function(a, b) {
        return a.workbookChapterLevel - b.workbookChapterLevel
      })
      let treeData = {}
      let laval = arr[0].workbookChapterLevel
      arr.forEach(item => {
        if (laval === item.workbookChapterLevel) {
          treeData[item.workbookChapterId] = {
            value: item.workbookChapterId,
            label: item.workbookChapterName,
            sort: item.workbookChapterSort,
            laval: item.workbookChapterLevel,
            ...item,
            children: []
          }
        } else {
          if (treeData[item.workbookChapterParentid]) {
            treeData[item.workbookChapterParentid].children.push({
              value: item.workbookChapterId,
              label: item.workbookChapterName,
              sort: item.workbookChapterSort,
              laval: item.workbookChapterLevel,
              ...item,
              children: []
            })
          }
        }
      })
      let treeSort = []
      for (let key in treeData) {
        treeSort.push(treeData[key])
      }
      this.treeData = treeSort.sort(function(a, b) {
        if (a.lavel === b.lavel) {
          return a.sort - b.sort
        } else {
          return 0
        }
      })
      this.treeData = this.treeData.map(item => {
        if (item.children && item.children.length) {
          item.children = item.children.sort(function(a, b) {
            return a.sort - b.sort
          })
        }
        return item
      })
      if (this.treeData.length) {
        for (let i = 0, count = this.treeData.length; i < count; i++) {
          if (this.treeData[i].children.length) {
            for (
              let j = 0, childrenCount = this.treeData[i].children.length;
              j < childrenCount;
              j++
            ) {
              if (this.treeData[i].children[j].workbookPageInfoList.length) {
                for (
                  let t = 0,
                    pageCount = this.treeData[i].children[j]
                      .workbookPageInfoList.length;
                  t < pageCount;
                  t++
                ) {
                  if (
                    this.treeData[i].children[j].workbookPageInfoList[t]
                      .workbookPageQuestionArticlenum
                  ) {
                    this.sectionIndex = j
                    this.defaultSection(this.treeData[i]) // 选中章节
                    return false
                  }
                }
              }
            }
            // for(let j = 0, pageCount = this.treeData[i].workbookPageInfoList.length; j < pageCount; i++) {
            //   if (this.treeData[i].workbookPageInfoList[j].workbookPageQuestionArticlenum) {
            //     this.sectionIndex = i
            //     this.defaultSection(this.treeData[i]) // 选中章节
            //     return false
            //   }
            // }
          }
        }
        this.defaultSection(this.treeData[0]) // 选中章节
      }
    },
    // 暂时只支持两级默认选中
    // 默认选中章节
    defaultSection(data) {
      this.treeModel.push(data.value)
      data.expand = true // 打开第一个子题
      if (data.children && data.children.length) {
        this.defaultSection(data.children[this.sectionIndex])
        this.sectionIndex === 0
      } else {
        this.treeChange(data)
      }
    },
    // 默认选中第一个有数据的Page
    defaultPageInfo(arr) {
      if (this.workBookType === 1) {
        // 普通练习册
        if (arr && arr.length) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].workNum) {
              this.pageNumber = arr[i].pageNumber
              this.changePageNumber(arr[i]) // 获取当前页码下的文章
              return
            }
          }
          this.pageNumber = arr[0].pageNumber
          this.workbookArticleList = []
        } else {
          this.pageNumber = 1
          this.workbookArticleList = []
        }
      } else if (this.workBookType === 2) {
        // 专项练习册
        let data = {
          section: this.userInfo.section,
          subjectAbbreviation: 'yuwen',
          teacherId: this.userInfo.teacherId,
          workbookChapterCode: this.workbookChapterCode,
          workbookId: this.workBookId
        }
        this.getWorkbookArticleList(data) // 获取所有数据
      }
    },
    // 拿到当前章节页码
    treeChange(obj) {
      console.log('当前章节页码', obj)
      this.workbookChapterCode = obj.workbookChapterCode
      let data = {
        workbookChapterCode: obj.workbookChapterCode,
        workbookId: obj.workbookId
      }
      // if (obj.children && obj.children.length) {
      //   let pageList = []
      //   obj.children.forEach((item) => {
      //     item.workbookPageInfoList.forEach((child) => {
      //       pageList.push({
      //         ...data,
      //         pageNumber: child.workbookPage,
      //         workNum: child.workbookPageQuestionnum
      //       })
      //     })
      //   })
      //   this.workbookPageInfoList = pageList
      // } else {
      this.workbookPageInfoList = obj.workbookPageInfoList.map(item => {
        return {
          ...data,
          pageNumber: item.workbookPage,
          workNum: item.workbookPageQuestionArticlenum
        }
      })
      // }
      this.defaultPageInfo(this.workbookPageInfoList)
    },
    // change page run
    changePageNumber(obj) {
      this.pageData = obj
      let data = {
        section: this.userInfo.section,
        subjectAbbreviation: 'yuwen',
        teacherId: this.userInfo.teacherId,
        workbookChapterCode: obj.workbookChapterCode,
        workbookChapterPage: obj.pageNumber,
        workbookId: obj.workbookId
      }
      if (obj.workNum) {
        this.getWorkbookArticleList(data)
      } else {
        this.$message.warning('当前页码下没有题目')
        this.workbookArticleList = []
      }
    },
    // change ability run
    changeAbilityScreening(obj) {},
    // 获取文章
    getWorkbookArticleList(data) {
      this.$http('/api/question/workbook/article/list', { params: data })
        .then(res => {
          if (res.data.flag === 1) {
            let remote = res.data.infos
            this.workbookArticleList = remote
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted() {}
}
</script>
