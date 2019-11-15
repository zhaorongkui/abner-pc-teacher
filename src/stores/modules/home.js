import http from '../../api/index'
import { message as Message } from 'ant-design-vue'
import { formatDate } from '../../filters/index'
const state = {
  chapterListData: {},
  pageHomeworkInfo: [],
  calendarData: {},
  noPublishGrade: [],
  taskList: [],
  taskCurrentTime: 0,
  finishTrueRateList: [],
  isShowRule: false,
  teacherWarnValue: {
    submitRateWarn: 60,
    trueRateWarn: 60
  }
}

// actions
const actions = {
  // 教学进度
  pageHomeworkChapter({ commit, rootGetters }) {
    return http
      .post('/teacherApi/index/pageHomeworkChapter', {
        gradeClassIds: rootGetters.gradeClassIds,
        subjectAbbreviation: rootGetters.subjectAbbreviation,
        teacherId: rootGetters.teacherId,
        textbookId: rootGetters.textbookId
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('PAGEHOMEWORKCHAPTER', data.infos)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  getPageHomeworkInfo({ commit }, payload) {
    return http
      .post('/teacherApi/index/pageHomeworkInfo', payload)
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('PAGEHOMEWORKINFO', data.infos)
        }
      })
  },
  // 周历
  timeLine({ commit, dispatch, state, rootGetters }) {
    return http
      .post('/api/teacher/homework/timeLine', {
        teacherId: rootGetters.teacherId,
        schoolId: rootGetters.schoolId
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('CALENDARDATA', data)
          let list = state.calendarData.infos.tasks || []
          let currentTime = formatDate(
            state.calendarData.currentTime,
            'yyyy-MM-dd'
          )
          let currentTaskId
          list.forEach(item => {
            if (item.taskTime === currentTime) {
              currentTaskId = item.taskId
            }
          })
          dispatch('firstPage', currentTaskId)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 未发布任务班级
  getNoPublishGrade({ commit, rootGetters }) {
    return http
      .post('/api/teacher/homework/noPublishGrade', {
        teacherId: rootGetters.teacherId
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('NOPUBLISHGRADE', data.infos)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 任务卡片
  firstPage({ commit, rootGetters }, payload) {
    return http
      .post('/api/teacher/homework/firstPage', {
        teacherId: rootGetters.teacherId,
        taskId: payload
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('TASKLIST', data.infos || [])
          commit('TASKCURRENTTIME', data.currentTime)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  // 趋势分析
  finishTrueRatePoint({ commit, rootGetters }) {
    return http
      .post('/teacherApi/index/finishTrueRatePoint', {
        teacherId: rootGetters.teacherId,
        textbookId: rootGetters.textbookId,
        gradeClassIds: rootGetters.gradeClassIds
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('FINISHTRUERATELIST', data.infos || [])
        }
        return data
      })
      .catch(error => {
        console.log(error)
      })
  },
  toggleIsShowRule({ commit }) {
    commit('TOGGLEISSHOWRULE')
  },
  // 获取首页预警值
  teacherWarnSet({ commit, rootGetters }) {
    return http
      .get('/teacherApi/warn/teacherWarnSet', {
        params: { teacherId: rootGetters.teacherId }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('TEACHERWARN', data.infos || {})
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  //设置预警值
  saveTeacherWarnSet({ commit, dispatch }, payload) {
    return http
      .post('/teacherApi/warn/saveTeacherWarnSet', payload)
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('TEACHERWARN', data.infos || {})
          dispatch('toggleIsShowRule')
          dispatch('pageHomeworkChapter')
          dispatch('teacherWarnSet')
          Message.success('设置成功')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  PAGEHOMEWORKCHAPTER(state, payload) {
    state.chapterListData = payload
  },
  PAGEHOMEWORKINFO(state, payload) {
    state.pageHomeworkInfo = payload
  },
  CALENDARDATA(state, payload) {
    state.calendarData = payload
  },
  NOPUBLISHGRADE(state, payload) {
    state.noPublishGrade = payload
  },
  TASKLIST(state, payload) {
    state.taskList = payload
  },
  TASKCURRENTTIME(state, payload) {
    state.taskCurrentTime = payload
  },
  FINISHTRUERATELIST(state, payload) {
    state.finishTrueRateList = payload
  },
  TEACHERWARN(state, payload) {
    state.teacherWarnValue = { ...state.teacherWarnValue, ...payload }
  },
  TOGGLEISSHOWRULE(state) {
    state.isShowRule = !state.isShowRule
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
