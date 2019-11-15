import http from '../../api/index'
const state = {
  // 班级选择
  gradeClassId: undefined,
  questionList: [],
  sortColumn: 'ERROR_COUNT',
  sortRule: 'Desc',
  // 课本章节树
  textbookChapter: [],
  // 选中的课本章节code
  currentTextbookChapterId: undefined,
  currentTextbookChapterCode: undefined,
  currentPage: 1,
  loadmore: true,
  questionTypeList: [],
  isAllSend: '0',
  // 题注list
  childQuestionInfoList: []
}
const getters = {}
const actions = {
  //错题列表
  wrongQuestionList({ commit, state, rootGetters }) {
    return http
      .get('/api/wrongquestion/classStudent', {
        params: {
          gradeClassId: state.gradeClassId,
          subjectAbbreviation: rootGetters.subjectAbbreviation,
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId,
          sortColumn: state.sortColumn,
          sortRule: state.sortRule
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('UPDATEQUESTIONLIST', data.infos || [])
        }
      })
  },
  //错题本单个学生消息提醒
  sentRemind({ dispatch, rootGetters }, payload) {
    return http
      .post('/api/notice/teacher/sentRemind', {
        studentId: payload.studentId,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        teacherId: rootGetters.teacherId,
        teacherName: rootGetters.teacherName,
        textbookId: rootGetters.textbookId
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          dispatch('wrongQuestionList')
        }
        return data
      })
  },
  // 错题本一键消息提醒
  sentRemindAll({ dispatch, rootGetters }, payload) {
    return http
      .post('/api/notice/teacher/sentRemindAll', {
        gradeClassIds: payload.gradeClassIds,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        teacherName: rootGetters.teacherName,
        teacherId: rootGetters.teacherId,
        textbookId: rootGetters.textbookId
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          dispatch('wrongQuestionList')
        }
        return data
      })
  },
  //课本章节树
  getTextbookChapter({ commit, rootGetters }) {
    return http
      .get('/api/textbook/getTextbookChapter', {
        params: {
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('TEXTBOOKCHAPTER', data.infos)
        }
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  //班级一键提醒是否全部发送
  isSendAll({ commit, rootGetters }) {
    return http
      .get('/api/notice/teacher/isSendAll', {
        params: {
          gradeClassIds: rootGetters.gradeClassIds,
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        commit('ISALLSEND', data.infos.isAllSend)
      })
  },
  // 错题本试题列表
  getList({ commit, state, rootGetters }, payload) {
    let params
    if (
      payload.questionYytypeId &&
      !payload.wrongquestionTimeStart &&
      !payload.wrongquestionTimeEnd
    ) {
      params = {
        pageSize: 10,
        currentPage: state.currentPage,
        textbookChapterId: state.currentTextbookChapterId,
        section: rootGetters.section,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        teacherId: rootGetters.teacherId,
        textbookId: rootGetters.textbookId,
        studentInfoId: payload.studentInfoId,

        questionYytypeId: payload.questionYytypeId
      }
    }
    if (
      payload.questionYytypeId &&
      payload.wrongquestionTimeStart &&
      payload.wrongquestionTimeEnd
    ) {
      params = {
        pageSize: 10,
        currentPage: state.currentPage,
        textbookChapterId: state.currentTextbookChapterId,
        section: rootGetters.section,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        teacherId: rootGetters.teacherId,
        textbookId: rootGetters.textbookId,

        studentInfoId: payload.studentInfoId,
        questionYytypeId: payload.questionYytypeId,
        wrongquestionTimeStart: payload.wrongquestionTimeStart,
        wrongquestionTimeEnd: payload.wrongquestionTimeEnd
      }
    }
    if (
      !payload.questionYytypeId &&
      !payload.wrongquestionTimeStart &&
      !payload.wrongquestionTimeEnd
    ) {
      params = {
        pageSize: 10,
        currentPage: state.currentPage,
        textbookChapterId: state.currentTextbookChapterId,
        section: rootGetters.section,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        teacherId: rootGetters.teacherId,
        textbookId: rootGetters.textbookId,
        studentInfoId: payload.studentInfoId
      }
    }
    if (
      !payload.questionYytypeId &&
      payload.wrongquestionTimeStart &&
      payload.wrongquestionTimeEnd
    ) {
      params = {
        pageSize: 10,
        currentPage: state.currentPage,
        textbookChapterId: state.currentTextbookChapterId,
        section: rootGetters.section,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        teacherId: rootGetters.teacherId,
        textbookId: rootGetters.textbookId,

        studentInfoId: payload.studentInfoId,
        wrongquestionTimeStart: payload.wrongquestionTimeStart,
        wrongquestionTimeEnd: payload.wrongquestionTimeEnd
      }
    }
    return http
      .get('/api/wrongquestion/getList', {
        params: params
      })
      .then(({ data }) => {
        if (data.infos && data.infos.length === 10) {
          commit('LOADMORE', true)
        } else {
          commit('LOADMORE', false)
        }
        let currentPage = state.currentPage + 1
        commit('UPDATECURRENTPAGE', currentPage)
        if (payload.loadMore) {
          commit('QUESTIONLISTMORE', data.infos)
        } else {
          commit('QUESTIONLIST', data.infos)
        }
      })
  },
  //题型
  getQuestionYYType({ commit, rootGetters }) {
    return http
      .get('/api/question/getQuestionYYType', {
        params: {
          section: rootGetters.section,
          subjectAbbreviation: rootGetters.subjectAbbreviation
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('QUESTIONTYPE', data.infos)
        }
      })
  },
  //试题收藏
  addCollection() {
    return http.post('/api/collection/teacher/addCollection')
  },
  delCollection() {
    return http.post('/api/collection/teacher/delCollection')
  },
  // 试题详情（题组使用）
  homeworkDetail({ commit, rootGetters }, payload) {
    return http
      .post('/api/teacher/homework/homeworkDetail', {
        section: rootGetters.section,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        questionInfoId: payload.questionInfoId,
        questionTypeCode: payload.questionTypeCode
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          if (data.infos && data.infos.length === 10) {
            commit('LOADMORE', true)
          } else {
            commit('LOADMORE', false)
          }
          if (payload) {
            commit('HOMEWORKLISTMORE', data.infos)
          } else {
            commit('HOMEWORKLIST', data.infos)
          }
          let currentPage = state.currentPage + 1
          commit('UPDATECURRENTPAGE', currentPage)
          commit('CHILDQUESTIONINFOLIST', data.infos.childQuestionInfoList)
        }
      })
  }
}
const mutations = {
  UPDATEGRADECLASSID(state, payload) {
    state.gradeClassId = payload
  },
  UPDATEQUESTIONLIST(state, payload) {
    state.questionList = payload
  },
  UPDATESORT(state, payload) {
    state.sortColumn = payload.sortColumn
    state.sortRule = payload.sortRule
  },
  TEXTBOOKCHAPTER(state, payload) {
    state.textbookChapter = payload
  },
  UPDATECHAPTERCODE(state, payload) {
    state.currentTextbookChapterCode = payload
  },
  UPDATECHAPTERID(state, payload) {
    state.currentTextbookChapterId = payload
  },
  UPDATECURRENTPAGE(state, payload) {
    state.currentPage = payload
  },
  QUESTIONLIST(state, payload) {
    state.questionList = payload
  },
  QUESTIONLISTMORE(state, payload) {
    state.questionList = [...state.questionList, ...payload]
  },
  QUESTIONTYPE(state, payload) {
    state.questionTypeList = payload
  },
  ISALLSEND(state, payload) {
    state.isAllSend = payload
  },
  CHILDQUESTIONINFOLIST(state, payload) {
    state.childQuestionInfoList = payload
  },
  LOADMORE(state, payload) {
    state.loadmore = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
