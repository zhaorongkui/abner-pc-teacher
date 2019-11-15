import http from '../../api/index'
const state = {
  currentTime: null,
  classList: [],
  classListById: [],
  readWorkList: [],
  readQuestionList: [],
  readWorkListById: [],
  // readAddListById: JSON.parse(localStorage.getItem('readWorkListByIds'))
  //   ? JSON.parse(localStorage.getItem('readWorkListByIds'))
  //   : [],
  gradeClassId: null,
  homeworkStartTime: null,
  homeworkList: [],
  homeworkType: '1,2,3,4,5,6',
  isHp: null,
  currentPage: 1,
  loadmore: true,
  workbookPageQuestionnumList: JSON.parse(
    localStorage.getItem('workbookPageQuestionnumList')
  )
    ? JSON.parse(localStorage.getItem('workbookPageQuestionnumList'))
    : [],
  workbookPageQuestionnumLists: [],
  abilityDimensinFiltration: JSON.parse(
    localStorage.getItem('abilityDimensinFiltration')
  )
    ? JSON.parse(localStorage.getItem('abilityDimensinFiltration'))
    : [],
  abilityDimensinFiltrations: []
}
const getters = {
  readWorkList: state => state.readWorkList,
  readWorkListById: state => state.readWorkListById
}

// actions
const actions = {
  //列表页单题刷新
  homeworkListUptateOne({ commit, state }, payload) {
    //let listOne = localforage.getItem('workListItem')
    //这里是请求单个刷新的参数
    return http
      .get('/api/teacher/homework/one', {
        params: {
          homeworkClassId: localStorage.getItem('homeworkClassIdOne')
        }
      })
      .then(({ data }) => {
        var arr = state.homeworkList
        state.homeworkList.forEach((item, index) => {
          if (item.homeworkClassId == data.infos.homeworkClassId) {
            arr.splice(index, 1, data.infos)
          }
        })
        commit('HOMEWORKLISTONE', arr)
      })
  },
  homeworkList({ commit, state, rootGetters }, payload) {
    return http
      .get('/api/teacher/homework/list', {
        params: {
          currentPage: state.currentPage,
          pageSize: 10,
          gradeClassId: state.gradeClassId,
          homeworkStartTime: state.homeworkStartTime,
          homeworkType: state.homeworkType,
          isHp: state.isHp,
          teacherId: rootGetters.teacherId
        }
      })
      .then(({ data }) => {
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

        commit('CURRENTTIME', data.currentTime)
        let currentPage = state.currentPage + 1
        commit('UPDATECURRENTPAGE', currentPage)
      })
  }
}

// mutations
const mutations = {
  TEST(state, payload) {
    state.workbookPageQuestionnumList = payload
    localStorage.setItem('workbookPageQuestionnumList', JSON.stringify(payload))
  },
  TESTS(state, payload) {
    state.workbookPageQuestionnumLists = payload
    localStorage.setItem(
      'workbookPageQuestionnumLists',
      JSON.stringify(payload)
    )
  },
  ABILIT(state, payload) {
    state.abilityDimensinFiltration = payload
    localStorage.setItem('abilityDimensinFiltration', JSON.stringify(payload))
  },
  ABILITS(state, payload) {
    state.abilityDimensinFiltrations = payload
  },
  SET_READ_QUESTION_LIST(state, QuestionList) {
    state.readQuestionList = QuestionList
  },
  SET_CLASS_LIST(state, classList) {
    state.classList = classList
  },
  SET_CLASS_LIST_BY_ID(state, classListById) {
    state.classListById = classListById
  },
  SET_TECHER_QUESTION_COLLECTONID(state, { collectonId, findId }) {
    let readWorkList = JSON.parse(JSON.stringify(state.readWorkList))
    let readQuestionList = JSON.parse(JSON.stringify(state.readQuestionList))
    for (let i = 0; i < readWorkList.length; i++) {
      if (readWorkList[i].questionId === findId) {
        readWorkList[i].teacherQuestionCollectonId = collectonId
        state.readWorkList = readWorkList
        localStorage.setItem('readWorkList', JSON.stringify(readWorkList))
        break
      }
    }
    for (let i = 0; i < readQuestionList.length; i++) {
      if (readQuestionList[i].questionId === findId) {
        readQuestionList[i].teacherQuestionCollectonId = collectonId
        state.readQuestionList = readQuestionList
        break
      }
    }
  },
  SETREADWORKLIST(state, workList) {
    state.readWorkList = workList
    localStorage.setItem('readWorkList', JSON.stringify(workList))
  },
  SETREADWORKLISTBYID(state, workListById) {
    state.readWorkListById = workListById
    localStorage.setItem('readWorkListById', JSON.stringify(workListById))
  },

  UPDATEGRADECLASSID(state, payload) {
    state.gradeClassId = payload
  },
  HOMEWORKLIST(state, payload) {
    state.homeworkList = payload
  },
  HOMEWORKLISTONE(state, payload) {
    state.homeworkList = payload
  },
  HOMEWORKLISTMORE(state, payload) {
    state.homeworkList = [...state.homeworkList, ...payload]
  },
  CURRENTTIME(state, payload) {
    state.currentTime = payload
  },
  UPDATEHOMEWORKTYPE(state, payload) {
    state.homeworkType = payload
  },
  UPDATEISHPTYPE(state, payload) {
    state.isHp = payload
  },
  UPDATESTARTTIME(state, payload) {
    state.homeworkStartTime = payload
  },
  UPDATECURRENTPAGE(state, payload) {
    state.currentPage = payload
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
