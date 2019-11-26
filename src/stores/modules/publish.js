import http from '../../api/index'
import localforage from 'localforage'
const state = {
  fullid: '',
  tscount: 1,
  classList: [], //获取班级数据
  workHomeList: [], //获取练习册列表数据
  workHomeProgress: '', //获取练习册列表数据
  workbookPageQuestion: [], //题列表
  calcelStore: [], //取消收藏数据
  addStore: [], //添加收藏数据
  collectionGroupList: [],
  addgroup: [], //添加分组
  homeworkDetailList: [],
  publishWork: [], //发布作业
  errorPublishWork: [],
  chapter: [],
  isToggle: false, //单词听说的展开收起
  delGroup: [],
  moveGroup: [],
  type: localStorage.getItem('type') ? localStorage.getItem('type') : '',
  workAllList: JSON.parse(
    localStorage.getItem('addWorkbookPageQuestionnumAllList')
  )
    ? JSON.parse(localStorage.getItem('addWorkbookPageQuestionnumAllList'))
    : [],
  errorWorkAllList: JSON.parse(
    localStorage.getItem('errorAddWorkbookPageQuestionnumAllList')
  )
    ? JSON.parse(localStorage.getItem('errorAddWorkbookPageQuestionnumAllList'))
    : [],
  classType: JSON.parse(localStorage.getItem('classType'))
    ? JSON.parse(localStorage.getItem('classType'))
    : [],

  selectClassList: JSON.parse(localStorage.getItem('selectClassList'))
    ? JSON.parse(localStorage.getItem('selectClassList'))
    : [],
  errorClassType: localStorage.getItem('errorClassType')
    ? localStorage.getItem('errorClassType')
    : null,
  errorClasslist: JSON.parse(localStorage.getItem('errorClasslist'))
    ? JSON.parse(localStorage.getItem('errorClasslist'))
    : [],

  // 单词作业数据
  wordList: [],
  // 单词作业菜单脚引
  wordMenuIndex: 0,
  // 单词要求题型数据
  hqtnJson: [
    {
      homeworkQuestionType: 3,
      submitNum: 3
    },
    {
      homeworkQuestionType: 4,
      submitNum: 0
    },
    {
      homeworkQuestionType: 5,
      submitNum: 0
    }
  ],
  // 英语听说作业

  // 章节
  EnglishWork: [],
  // 章节下试题
  EnglishWorkList: [],
  // 当前章节code
  EnglishWorkTextbookChapterCode: null,
  // 当前章节id
  EnglishWorkTextbookChapterId: null,
  EnglishWorkUnitModelId:
    localStorage.getItem('EnglishWorkUnitModelId') || null,
  // 选中的作业
  selectedItemList: []
}
const getters = {
  wordPageList(state) {
    return state.wordMenuIndex
      ? state.wordList[state.wordMenuIndex]
      : state.wordList[0]
  },
  //单词已选题量
  wordHomeWorkCount(state) {
    let length = 0
    let list = state.wordList
    list.forEach(item => {
      item.wordPageList.forEach(page => {
        page.wordInfoList.forEach(word => {
          if (word.active) {
            length += 1
          }
        })
      })
    })
    return length
  },
  isAllWork(state) {
    let result = []
    let list = state.wordList
    list.forEach(item => {
      item.wordPageList.forEach(page => {
        page.wordInfoList.forEach(word => {
          if (word.active) {
            result.push(word.isWord)
          }
        })
      })
    })
    return result.every(item => item === 2)
  },
  //	作业试题ID（“,”间隔）
  questionIds(state) {
    let result = []
    let list = state.wordList
    list.forEach(item => {
      item.wordPageList.forEach(page => {
        page.wordInfoList.forEach(word => {
          if (word.active) {
            result = [...result, word.wordId]
          }
        })
      })
    })
    return result.join(',')
  }
}
// actions
const actions = {
  // 班级列表
  publishPageClass({ commit, rootGetters }) {
    return http
      .get('/api/teacher/getClass', {
        params: { teacherId: rootGetters.teacherId }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('CLASSLIST', data.infos)
          return data
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 错误作业班级列表
  errorPublishPageClass({ commit, rootGetters }) {
    return http
      .get('/api/teacher/wrongquestion/class', {
        params: {
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('CLASSLIST', data.infos)
          return data
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 练习册列表
  async publishPageWorkHomeList({ commit, dispatch, rootGetters }) {
    let result = await dispatch('publishPageWorkHomeProgress')
    return http
      .get('/api/workbook/allworkbook', {
        params: {
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('WORKHOMELIST', data.infos || [])
        }
        return {
          data,
          result
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 获取阅读练习册
  async readAllWorkbook({ commit, dispatch, rootGetters }) {
    let result = await dispatch('publishPageWorkHomeProgress')
    return http
      .get('/api/workbook/allworkbook', {
        params: {
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('WORKHOMELIST', data.infos.workbookList || [])
        }
        return {
          data,
          result
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 这里获取章节id,与code
  async publishPageWorkHomeProgress({ commit, rootGetters }) {
    return http
      .get('/api/teacher/textbook/progress', {
        params: {
          gradeClassIds:
            JSON.parse(localStorage.getItem('classType')) != undefined
              ? JSON.parse(localStorage.getItem('classType')).join(',')
              : '',
          subjectAbbreviation: rootGetters.subjectAbbreviation,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('WORKHOMEPROGRESS', data.infos.textbookChapterCode)
          commit(
            'ENGLISHWORKTEXTBOOKCHAPTERCODE',
            data.infos.textbookChapterCode
          )
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  workbookPageQuestion({ commit, rootGetters }, info) {
    return http
      .get('/api/question/getWorkbookQuestion', {
        params: {
          section: rootGetters.section,
          subjectAbbreviation: rootGetters.subjectAbbreviation,
          teacherId: rootGetters.teacherId,
          workBookId: info.workBookId,
          workbookChapterCode: info.workbookChapterCode,
          workbookChapterPage: info.workbookChapterPage
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('WORKBOOKPAGEQUESTION', data.infos)
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  cancelStore({ commit }, id) {
    return http
      .get('/api/collection/teacher/delCollection', {
        params: {
          teacherQuestionCollectionId: id
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('CANCELSTORE', data.infos)
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  addStore({ commit, rootGetters }, CollectionInfos) {
    return http
      .post('/api/collection/teacher/addCollection', {
        collectonGroupId: CollectionInfos.collectonGroupId,
        grade: CollectionInfos.grade || rootGetters.grade,
        questionTypeCode: CollectionInfos.questionTypeCode,
        questionId: CollectionInfos.questionId,
        questionInfoId: CollectionInfos.questionInfoId,
        questionSourceId: CollectionInfos.questionSourceId,
        questionSourceName: CollectionInfos.questionSourceName,
        questionUuid: CollectionInfos.questionUuid,
        section: rootGetters.section,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        subjectId: rootGetters.subjectId,
        subjectName: rootGetters.subjectName,
        teacherId: rootGetters.teacherId,
        teacherName: rootGetters.teacherName
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('ADDSTORE', data.infos)
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  collectionGroup({ commit, rootGetters }) {
    return http
      .get('/api/collection/teacher/getgroup', {
        params: {
          teacherId: rootGetters.teacherId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('COLLECTIONGROUP', data.infos)
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  addGroup({ commit, rootGetters }, name) {
    return http
      .post('/api/collection/teacher/addgroup', {
        groupName: name,
        teacherId: rootGetters.teacherId,
        teacherName: rootGetters.teacherName
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('ADDGROUP', data.infos)
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  getGroup({ rootGetters }) {
    return http
      .get('/api/collection/teacher/getgroup', {
        params: {
          teacherId: rootGetters.teacherId
        }
      })
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  delGroup({ commit }, id) {
    return http
      .get('/api/collection/teacher/delgroup', {
        params: {
          collectionGroupId: id
        }
      })
      .then(({ data }) => {
        commit('DELGROUP', data.infos)
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  moveGroup({ commit }, obj) {
    return http
      .get('/api/collection/teacher/moveGroup', {
        params: {
          collectonGroupId: obj.collectonGroupId,
          teacherQuestionCollectonId: obj.teacherQuestionCollectonId
        }
      })
      .then(({ data }) => {
        commit('MOVEGROUP', data.infos)
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  getGroupQuestions({ rootGetters }, obj) {
    return http
      .get('/api/collection/group/questionsmerge', {
        params: {
          collectonGroupId: obj.id,
          currentPage: obj.page,
          pageSize: 10,
          section: rootGetters.section,
          subjectAbbreviation: rootGetters.subjectAbbreviation,
          teacherId: rootGetters.teacherId
        }
      })
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  getGroupArticleQuestions({ rootGetters }, obj) {
    return http
      .get('/api/collection/group/article/questions', {
        params: {
          collectonGroupId: obj.id,
          currentPage: obj.page,
          pageSize: 10,
          section: rootGetters.section,
          subjectAbbreviation: rootGetters.subjectAbbreviation,
          teacherId: rootGetters.teacherId
        }
      })
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  homeworkDetail({ commit, rootGetters }, obj) {
    return http
      .get('/api/teacher/homework/homeworkDetail', {
        params: {
          questionInfoId: obj.questionInfoId,
          questionTypeCode: obj.questionTypeCode,
          section: rootGetters.section,
          subjectAbbreviation: rootGetters.subjectAbbreviation
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('HOMEWORKDETAIL', data.infos)
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  paperList({ rootGetters }) {
    return http
      .get('/api/paper/list', {
        params: {
          currentPage: 1,
          pageSize: 999,
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  chapter({ commit }, id) {
    return http
      .get('/api/paper/chapter', {
        params: {
          paperId: id
        }
      })
      .then(({ data }) => {
        commit('CHAPTER', data.infos)
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  getPaperQuestion({ rootGetters }, id) {
    return http
      .get('/api/question/getPaperQuestion', {
        params: {
          paperId: id,
          section: rootGetters.section,
          subjectAbbreviation: rootGetters.subjectAbbreviation,
          teacherId: rootGetters.teacherId
        }
      })
      .then(({ data }) => {
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  wrongQuestion({ rootGetters }) {
    return http
      .get('/api/textbook/getTextbookChapter/wrongquestion', {
        params: {
          gradeClassIds: localStorage.getItem('errorClassType'),
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        return {
          data
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  wrongQuestionlist({ rootGetters }, obj) {
    return http
      .get('/teacherApi/wrong/textbook/question/list', {
        params: {
          currentPage: obj.page,
          gradeClassIds: localStorage.getItem('errorClassType'),
          pageSize: 1000,
          section: rootGetters.section,
          subjectAbbreviation: rootGetters.subjectAbbreviation,
          teacherId: rootGetters.teacherId,
          textbookChapterCode: obj.textbookChapterCode,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        return {
          data
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  publishWork({ commit }, obj) {
    return http
      .post('/api/teacher/homework/publish/ordinarys', {
        requestParam: JSON.stringify(obj)
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('PUBLISHWORK', data.infos)
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  errorPublishWork({ commit }, obj) {
    return http
      .post('/api/teacher/homework/publish/wrong', {
        requestParam: JSON.stringify(obj)
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('PUBLISHWORK', data.infos)
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 获取单词作业数据
  textbookWord({ commit, rootGetters }) {
    return http
      .get('api/teacher/word/textbookWord', {
        params: {
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          let list = [...data.infos]
          list.forEach((element, index) => {
            element.wordPageList.forEach((item, innerIndex) => {
              element.wordPageList[innerIndex] = { ...item, active: false }
              item.wordInfoList.forEach((word, wordIndex) => {
                item.wordInfoList[wordIndex] = { ...word, active: false }
              })
            })
            list[index] = { ...element, active: false }
          })
          commit('TEXTBOOKWORD', list)
        }
      })
  },
  //单词--发布作业
  publishWordWork({ state, getters, rootGetters }, payload) {
    return http.post('/api/teacher/homework/publish', {
      homeworkIshp: 2,
      homeworkQuestionType: 0,
      homeworkType: 4,
      homeworkName: payload.homeworkName,
      homeworkClassIds: payload.homeworkClassIds,
      homeworkStarttime: payload.homeworkStarttime,
      homeworkEndtime: payload.homeworkEndtime,
      hqtnJson: JSON.stringify(state.hqtnJson),
      section: rootGetters.section,
      subjectAbbreviation: rootGetters.subjectAbbreviation,
      teacherId: rootGetters.teacherId,
      teacherName: rootGetters.teacherName,
      questionIds: getters.questionIds
    })
  },
  // 听说--课本章节
  async getEnglishWork({ commit, dispatch, rootGetters }) {
    let result = await dispatch('publishPageWorkHomeProgress')
    return http
      .get('/api/textbook/getTextbookChapter/video', {
        params: {
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          data.infos.forEach((item, index) => {
            if (item.textbookChapterLevel === 1) {
              data.infos.splice(index, 1)
            }
            if (item.unitModelList) {
              item.unitModelList.forEach(item1 => {
                if (item1.unitModelId === 0) {
                  item.unitModelList.forEach((item1, index1) => {
                    if (item1.unitModelId !== 0) {
                      item.unitModelList.splice(index1, 1)
                    }
                  })
                }
              })
            }
          })
          commit('ENGLISHWORK', data.infos)
        }
        return {
          data,
          result
        }
      })
  },
  // 听说--章节模块下的试题
  unitModel({ commit, state, rootGetters }) {
    let params = {
      textbookId: rootGetters.textbookId,
      textbookChapterCode: state.EnglishWorkTextbookChapterCode,
      unitModelId: state.EnglishWorkUnitModelId
    }
    // 当点击章节时，查询章节题目不传unitModelId，当点击单元模块再传
    if (params.unitModelId === '') {
      delete params.unitModelId
    }
    return http
      .get('/api/video/chapter/questionList/unitModel', {
        params
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          let list = data.infos
          list.forEach((item, index) => {
            list[index] = { ...item, readNumber: 1, active: false }
          })
          localforage.getItem('selectedItemList').then(selectedItemList => {
            if (selectedItemList) {
              let target = [...list]
              let source = [...selectedItemList]
              target.forEach((titem, tindex) => {
                source.forEach(sitem => {
                  if (titem.questionId === sitem.questionId) {
                    target[tindex] = { ...titem, ...sitem }
                  }
                })
              })
              commit('ENGLISHWORKLIST', target)
              commit('SELECTITEM')
            } else {
              commit('ENGLISHWORKLIST', list)
              commit('SELECTITEM')
            }
          })
        }
      })
  },
  // 英语听说发布作业
  publishEnglish({ state }, payload) {
    return http.post('/api/teacher/homework/publish/video', {
      requestParam: payload
    })
  }
}

// mutations
const mutations = {
  FULLID(state, payload) {
    state.fullid = payload
  },
  TSCOUNT(state, payload) {
    state.tscount = payload
  },
  ISTOGGLE(state, payload) {
    state.isToggle = payload
  },

  TYPE(state, payload) {
    state.type = payload
  },
  CLASSTYPE(state, payload) {
    state.classType = payload
  },
  SELECTCLASSLIST(state, payload) {
    state.selectClassList = payload
  },
  ERRORCLASSTYPE(state, payload) {
    state.errorClassType = payload
  },
  ERRORCLASSLIST(state, payload) {
    state.errorClasslist = payload
  },
  WORKALLLIST(state, payload) {
    state.workAllList = payload
  },
  ERRORWORKALLLIST(state, payload) {
    state.errorWorkAllList = payload
  },
  CLASSLIST(state, payload) {
    state.classList = payload
  },
  WORKHOMELIST(state, payload) {
    state.workHomeList = payload
  },
  WORKHOMEPROGRESS(state, payload) {
    state.workHomeProgress = payload
  },
  WORKBOOKPAGEQUESTION(state, payload) {
    state.workbookPageQuestion = payload
  },
  CANCELSTORE(state, payload) {
    state.calcelStore = payload
  },
  ADDSTORE(state, payload) {
    state.addStore = payload
  },
  COLLECTIONGROUP(state, payload) {
    state.collectionGroupList = payload
  },
  ADDGROUP(state, payload) {
    state.addgroup = payload
  },
  HOMEWORKDETAIL(state, payload) {
    state.homeworkDetailList = payload
  },
  PUBLISHWORK(state, payload) {
    state.publishWork = payload
  },
  ERRORPUBLISHWORK(state, payload) {
    state.errorPublishWork = payload
  },
  DELGROUP(state, payload) {
    state.delGroup = payload
  },
  MOVEGROUP(state, payload) {
    state.moveGroup = payload
  },
  CHAPTER(state, payload) {
    state.chapter = payload
  },
  // 获取单词作业数据 ok
  TEXTBOOKWORD(state, payload) {
    state.wordList = payload
  },
  // 选中当前单词 ok
  UPDATEWORD(state, payload) {
    let wordMenuIndex =
      payload.wordMenuIndex !== undefined
        ? payload.wordMenuIndex
        : state.wordMenuIndex
    let pageIndex = payload.pageIndex
    let wordIndex = payload.wordIndex

    let list = [...state.wordList]
    let menuActive
    let pageActive
    list.forEach((element, index) => {
      if (wordMenuIndex === index) {
        element.wordPageList.forEach((item, innerIndex) => {
          if (pageIndex === innerIndex) {
            item.wordInfoList.forEach((word, deeperIndex) => {
              if (wordIndex === deeperIndex) {
                item.wordInfoList[deeperIndex] = {
                  ...word,
                  active: !word.active
                }
              }
            })
            pageActive = item.wordInfoList.some(word => word.active)
            element.wordPageList[innerIndex] = { ...item, active: pageActive }
          }
        })
        menuActive = element.wordPageList.some(item => item.active)

        list[index] = { ...element, active: menuActive }
      }
    })
    localforage.setItem('wordList', list).then(() => {
      state.wordList = list
    })
  },
  // 选中当前页下的所有单词 ok
  UPDATEPAGE(state, payload) {
    let wordMenuIndex = state.wordMenuIndex
    let pageIndex = payload.pageIndex
    let list = [...state.wordList]
    let menuActive
    let pageActive
    list.forEach((element, index) => {
      if (wordMenuIndex === index) {
        element.wordPageList.forEach((item, innerIndex) => {
          if (pageIndex === innerIndex) {
            pageActive = item.wordInfoList.every(word => word.active)
            item.wordInfoList.forEach((word, deeperIndex) => {
              item.wordInfoList[deeperIndex] = {
                ...word,
                active: !pageActive
              }
            })
            element.wordPageList[innerIndex] = { ...item, active: !pageActive }
          }
        })
        menuActive = element.wordPageList.every(item => item.active)

        list[index] = { ...element, active: menuActive }
      }
    })
    localforage.setItem('wordList', list).then(() => {
      state.wordList = list
    })
  },
  // 移除当前页下单词 ok
  REMOVEPAGE(state, payload) {
    let wordMenuIndex = payload.wordMenuIndex
    let pageIndex = payload.pageIndex
    let list = [...state.wordList]
    list.forEach((element, index) => {
      if (wordMenuIndex === index) {
        element.wordPageList.forEach((item, innerIndex) => {
          if (pageIndex === innerIndex) {
            item.wordInfoList.forEach((word, deeperIndex) => {
              item.wordInfoList[deeperIndex] = {
                ...word,
                active: false
              }
            })
            element.wordPageList[innerIndex] = { ...item, active: false }
          }
        })
        list[index] = { ...element, active: false }
      }
    })
    localforage.setItem('wordList', list).then(() => {
      state.wordList = list
    })
  },
  // 移除当前菜单下单词 ok
  RemoveMenu(state, payload) {
    let wordMenuIndex = payload.wordMenuIndex
    let list = [...state.wordList]

    list.forEach((element, index) => {
      if (wordMenuIndex === index) {
        element.wordPageList.forEach((item, innerIndex) => {
          item.wordInfoList.forEach((word, deeperIndex) => {
            item.wordInfoList[deeperIndex] = {
              ...word,
              active: false
            }
          })
          element.wordPageList[innerIndex] = { ...item, active: false }
        })
        list[index] = { ...element, active: false }
      }
    })
    localforage.setItem('wordList', list).then(() => {
      state.wordList = list
    })
  },
  // 选中多页码单词 ok
  UPDATEPAGEWORD(state, payload) {
    let startMenuIndex = payload.startMenuIndex
    let startPageIndex = payload.startPageIndex
    let endMenuIndex = payload.endMenuIndex
    let endPageIndex = payload.endPageIndex
    let list = [...state.wordList]
    let menuActive
    list.forEach((element, index) => {
      if (
        index === startMenuIndex ||
        index === endMenuIndex ||
        (index < endMenuIndex && index > startMenuIndex)
      ) {
        element.wordPageList.forEach((item, innerIndex) => {
          if (
            innerIndex === startPageIndex ||
            innerIndex === endPageIndex ||
            (innerIndex < endPageIndex && innerIndex > startPageIndex)
          ) {
            item.wordInfoList.forEach((word, deeperIndex) => {
              item.wordInfoList[deeperIndex] = {
                ...word,
                active: true
              }
            })
            element.wordPageList[innerIndex] = { ...item, active: true }
          }
        })
        menuActive = element.wordPageList.every(item => item.active)
        list[index] = { ...element, active: menuActive }
      }
    })
    localforage.setItem('wordList', list).then(() => {
      state.wordList = list
    })
  },
  //重置选中单词 ok
  RESETWORDLIST() {
    let list = [...state.wordList]
    list.forEach((element, index) => {
      element.wordPageList.forEach((item, innerIndex) => {
        item.wordInfoList.forEach((word, wordIndex) => {
          item.wordInfoList[wordIndex] = { ...word, active: false }
        })
        element.wordPageList[innerIndex] = { ...item, active: false }
      })
      list[index] = { ...element, active: false }
    })
    localforage.setItem('wordList', list).then(() => {
      state.wordList = list
    })
  },
  // 单词菜单脚引
  UPDATEWORDMENUINDEX(state, payload) {
    state.wordMenuIndex = payload
  },
  // 单词要求题型数据
  HQTNJSON(state, payload) {
    state.hqtnJson = payload
  },
  // 听说作业章节
  ENGLISHWORK(state, payload) {
    state.EnglishWork = payload
  },
  // 章节id
  ENGLISHWORKTEXTBOOKCHAPTERID(state, payload) {
    state.EnglishWorkTextbookChapterId = payload
  },
  // 章节code
  ENGLISHWORKTEXTBOOKCHAPTERCODE(state, paload) {
    state.EnglishWorkTextbookChapterCode = paload
  },
  //模块id
  ENGLISHWORKUNITMODEID(state, payload) {
    state.EnglishWorkUnitModelId = payload
  },
  ENGLISHWORKLIST(state, payload) {
    state.EnglishWorkList = payload
  },
  SELECTITEM(state) {
    let target = [...state.selectedItemList]
    let source = [...state.EnglishWorkList]
    source.forEach(aitem => {
      let result = target.some(item => item.questionId === aitem.questionId)
      if (result) {
        target.forEach((titem, tindex) => {
          if (titem.questionId === aitem.questionId) {
            target[tindex] = { ...titem, ...aitem }
          }
        })
      } else {
        target.push(aitem)
      }
    })
    let list = target.filter(item => item.active)
    localforage.setItem('selectedItemList', list).then(() => {
      state.selectedItemList = list
    })
  },
  CANCLEONEITEM(state, payload) {
    let list = [...state.selectedItemList]
    let source = [...state.EnglishWorkList]
    list.forEach((item, index) => {
      if (item.questionId === payload.questionId) {
        list[index] = { ...item, active: false }
      }
    })
    source.forEach((item, index) => {
      if (item.questionId === payload.questionId) {
        source[index] = { ...item, active: false }
      }
    })
    localforage.setItem('selectedItemList', list).then(() => {
      state.selectedItemList = list
    })
    state.EnglishWorkList = source
  },
  ADDONEITEM(state, payload) {
    let list = [...state.selectedItemList]
    let source = [...state.EnglishWorkList]

    list.forEach((item, index) => {
      if (item.questionId === payload.questionId) {
        list[index] = { ...item, active: true }
      }
    })
    source.forEach((item, index) => {
      if (item.questionId === payload.questionId) {
        source[index] = { ...item, active: true }
      }
    })
    localforage.setItem('selectedItemList', list).then(() => {
      state.selectedItemList = list
    })
    state.EnglishWorkList = source
  },
  UPDATESELECTEDITEMLIST(state) {
    localforage.setItem('selectedItemList', []).then(() => {
      state.selectedItemList = []
    })
  },
  //隐藏预览中未选中的选项
  HIDESELECTEDITEMLIST(state) {
    let list = state.selectedItemList.filter(item => item.active)
    localforage.setItem('selectedItemList', list).then(() => {
      state.selectedItemList = list
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
