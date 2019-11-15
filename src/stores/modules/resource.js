import http from '../../api/index'
import { message as Message } from 'ant-design-vue'
const state = {
  //资源章节数
  resourceChapterList: [],
  // 选中资源章节数的code
  currentTextbookChapterCode: null,
  //资源列表
  resourceList: [],
  //资源类型
  resourceType: 0,
  //资源列表总数
  count: 0,
  // 当前页
  currentPage: 1,
  // 课本章节树
  textbookChapter: [],
  // 选中的课本章节code
  currentTreeCode: undefined
}
const getters = {
  textbookChapterName(state) {
    let result
    state.textbookChapter.forEach(item => {
      if (item.textbookChapterId === Number(state.currentTreeCode)) {
        result = item.textbookChapterName
      }
    })
    return result
  }
}
const actions = {
  //资源章节树（只展示两级有资源）
  getTextbookResourceChapter({ commit, rootGetters }) {
    http
      .get('/api/textbook/getTextbookResourceChapter', {
        params: {
          schoolId: rootGetters.schoolId,
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('RESOURCECHAPTER', data.infos)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  //获取资源列表
  queryResourceList({ commit, rootGetters, state }) {
    return http
      .get('/teacherApi/resource/queryResourceList', {
        params: {
          schoolId: rootGetters.schoolId,
          teacherId: rootGetters.teacherId,
          textbookId: rootGetters.textbookId,
          textbookChapterCode: state.currentTextbookChapterCode,
          resourceType: (state.resourceType && state.resourceType) || null,
          pageSize: 9,
          currentPage: state.currentPage
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('COUNT', data.infos.count)
          commit('GETRESOURCELIST', (data.infos.list && data.infos.list) || [])
        }
      })
      .catch(function(error) {
        console.log(error)
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
  // 编辑
  update({ dispatch }, payload) {
    return http
      .post('/teacherApi/resource/update', {
        resourceInfoId: payload.resourceInfoId,
        resourceName: payload.resourceName,
        textbookChapterId: payload.textbookChapterId,
        textbookChapterName: payload.textbookChapterName
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          dispatch('queryResourceList')
        }
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  // 分享
  share({ dispatch, rootGetters }, payload) {
    return http
      .post('/api/resource/teacher/share', {
        gradeClassids: payload.gradeClassids,
        teacherId: rootGetters.teacherId,
        resourceInfoId: payload.resourceInfoId
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          dispatch('queryResourceList')
        }
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  // 删除
  delete({ dispatch }, payload) {
    return http
      .post('/teacherApi/resource/delete', {
        resourceInfoIds: payload
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          Message.success('删除成功').then(() => {
            dispatch('queryResourceList')
          })
        }
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}
const mutations = {
  RESOURCECHAPTER(state, payload) {
    state.resourceChapterList = payload
  },
  GETRESOURCELIST(state, payload) {
    state.resourceList = payload
  },
  UPDATECHAPTERCODE(state, payload) {
    state.currentTextbookChapterCode = payload
  },
  UPDATERESOURCETYPE(state, payload) {
    state.resourceType = payload
  },
  TEXTBOOKCHAPTER(state, payload) {
    state.textbookChapter = payload
  },
  CURRENTPAGE(state, payload) {
    state.currentPage = payload
  },
  COUNT(state, payload) {
    state.count = payload
  },
  CURRENTTREECODE(state, payload) {
    state.currentTreeCode = payload
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
