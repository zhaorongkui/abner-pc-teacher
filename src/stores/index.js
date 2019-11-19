import Vue from 'vue'
import router from './../router'
import Vuex from 'vuex'
import http from '../api/index'
import localforage from 'localforage'
import { message as Message } from 'ant-design-vue'

import home from './modules/home'
import message from './modules/message'
import resource from './modules/resource'
import publish from './modules/publish'
import question from './modules/wrong-question'
import work from './modules/work'
import marking from './modules/marking'

Vue.use(Vuex)
const state = {
  objs: {},
  compositionFlag: true,
  userInfo:
    JSON.parse(localStorage.getItem('userInfo')) != null
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {},
  appealCount: 0,
  notReadCount: 0
}
const getters = {
  token(state) {
    return state.userInfo.token
  },
  grade(state) {
    if (state.userInfo.classes && state.userInfo.classes.length) {
      return state.userInfo.classes[0].grade
    } else {
      return ''
    }
  },
  schoolId(state) {
    return state.userInfo.schoolId
  },
  section(state) {
    return state.userInfo.section
  },
  teacherId(state) {
    return state.userInfo.teacherId
  },
  teacherName(state) {
    return state.userInfo.teacherName
  },
  subjectId() {
    return state.userInfo.subjectId
  },
  subjectName() {
    return state.userInfo.subjectName
  },
  subjectAbbreviation(state) {
    return state.userInfo.subjectAbbreviation
  },
  textbookId(state) {
    return state.userInfo.textbookId
  },
  textbookName(state) {
    return state.userInfo.textbookName
  },
  gradeClassIds(state) {
    return (
      state.userInfo.classes &&
      state.userInfo.classes.map(item => item.gradeClassid).join(',')
    )
  },
  gradeClassList(state) {
    if (
      state.userInfo &&
      state.userInfo.classes &&
      state.userInfo.classes.length
    ) {
      return state.userInfo.classes
    } else {
      return []
    }
  }
}
// actions
const actions = {
  Login({ commit }, user) {
    return http
      .post('/teacherApi/login/loginIn', user)
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('GETUSERINFO', data.infos)
          localStorage.setItem('userInfo', JSON.stringify(data.infos))
          localStorage.setItem('loginFlag', 1)
          localforage.setItem('userInfo', data.infos).then(() => {
            router.push('/home')
          })
        } else {
          if (data.status === 'auth_not_modified') {
            router.push(
              '/user-set?tel=' + user.userName + '&teacherId=' + data.info
            )
          }
          Message.error(data.message)
        }
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  },

  LogOut({ commit, getters }) {
    return http
      .get('/teacherApi/login/loginOut', {
        params: {
          token: getters.token
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('GETUSERINFO', {})
          localforage.getItem('checked').then(checked => {
            localforage.getItem('loginInfo').then(loginInfo => {
              localforage.clear()
              localforage.setItem('checked', checked)
              localforage.setItem('loginInfo', loginInfo)
              router.push('/login')
            })
          })
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  //重批申请未读数
  notReadCountAppeal({ commit, rootState }) {
    return http
      .get('/api/notice/teacher/notReadCountAppeal', {
        params: {
          teacherId: rootState.userInfo.teacherId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('APPEALCOUNT', data.infos)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  //消息未读数量
  getNotReadCount({ commit, rootState }) {
    return http
      .get('/api/notice/teacher/notReadCount', {
        params: {
          teacherId: rootState.userInfo.teacherId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('NOTREADCOUNT', data.infos)
        }
      })
  }
}

// mutations
const mutations = {
  OBJS(state, payload) {
    state.objs = payload
  },
  GETUSERINFO(state, payload) {
    state.userInfo = payload
  },
  UPDATEUSERINFO(state, payload) {
    state.userInfo = { ...state.userInfo, ...payload }
  },
  APPEALCOUNT(state, payload) {
    state.appealCount = payload
  },
  NOTREADCOUNT(state, payload) {
    state.notReadCount = payload
  },
  COMPOTIONFLAG(state, payload) {
    state.compositionFlag = payload
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    home,
    message,
    resource,
    publish,
    question,
    work,
    marking
  }
})
