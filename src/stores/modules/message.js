import http from '@/api'
const state = {
  receivedListCount: 0,
  receivedList: [],
  publishedListCount: 0,
  publishedList: [],
  tabType: 'all',
  currentPage: 1,
  loadmore: true
}

// actions
const actions = {
  //老师收到消息总数
  getListCount({ commit, rootState }) {
    return http
      .get('/api/notice/teacher/getListCount', {
        params: {
          teacherId: rootState.userInfo.teacherId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('RECEIVEDLISTCOUNT', data.infos)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  //获取老师消息列表
  getList({ state, commit, rootState }, payload) {
    return http
      .get('/api/notice/teacher/getList', {
        params: {
          teacherId: rootState.userInfo.teacherId,
          pageSize: 10,
          currentPage: state.currentPage,
          noticeType: state.tabType === 'appeal' ? '9' : null
        }
      })
      .then(({ data }) => {
        if (data.infos && data.infos.length === 10) {
          commit('LOADMORE', true)
        } else {
          commit('LOADMORE', false)
        }
        if (data.flag === 1) {
          if (payload) {
            commit('RECEIVEDLISTMORE', data.infos)
          } else {
            commit('RECEIVEDLIST', data.infos)
          }
          let currentPage = state.currentPage + 1
          commit('UPDATEPAGEING', currentPage)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  //老师发送消息总数
  sendListCount({ commit, rootState }) {
    return http
      .get('/api/notice/teacher/sendListCount', {
        params: {
          teacherId: rootState.userInfo.teacherId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('PUBLISHEDLISTCOUNT', data.infos)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  //获取老师发送消息列表
  sendList({ commit, rootState }, payload) {
    return http
      .get('/api/notice/teacher/sendList', {
        params: {
          teacherId: rootState.userInfo.teacherId,
          pageSize: 10,
          currentPage: state.currentPage
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          if (data.infos && data.infos.length === 10) {
            commit('LOADMORE', true)
          } else {
            commit('LOADMORE', false)
          }
          if (payload) {
            commit('PUBLISHEDLISTMORE', data.infos)
          } else {
            commit('PUBLISHEDLIST', data.infos)
          }
          let currentPage = state.currentPage + 1
          commit('UPDATEPAGEING', currentPage)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },

  //阅读消息/全部置为已读
  read({ commit, dispatch, rootState }, payload = {}) {
    return http
      .post('/api/notice/teacher/read', {
        teacherId: rootState.userInfo.teacherId,
        noticeId: payload.noticeId
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('UPDATEPAGEING', 1)
          dispatch('getListCount')
          if (payload.all == 'all') {
            dispatch('getList')
          }

          dispatch('getNotReadCount', null, { root: true })
          dispatch('notReadCountAppeal', null, { root: true })
        }
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  RECEIVEDLISTCOUNT(state, payload) {
    state.receivedListCount = payload
  },
  RECEIVEDLIST(state, payload) {
    state.receivedList = payload
  },
  RECEIVEDLISTMORE(state, payload) {
    state.receivedList = [...state.receivedList, ...payload]
  },
  PUBLISHEDLISTCOUNT(state, payload) {
    state.publishedListCount = payload
  },
  PUBLISHEDLIST(state, payload) {
    state.publishedList = payload
  },
  PUBLISHEDLISTMORE(state, payload) {
    state.publishedList = [...state.publishedList, ...payload]
  },
  UPDATEPAGEING(state, payload) {
    state.currentPage = payload
  },
  TABTYPE(state, payload = 'all') {
    state.tabType = payload
  },
  LOADMORE(state, payload) {
    state.loadmore = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
