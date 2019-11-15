import http from '../../api/index'
const state = {
  questionListInfo: null,
  questionInfo: [],
  studentInfoId: null,
  homeworkQuestionId: null,
  reviewVoice: null,
  reviewVoiceSrc: null,
  studentName: null,
  picIndex: 1,
  imgUrl: {}
}
const actions = {
  getQuestionList({ commit }, payload) {
    return http
      .get('/api/teacher/homework/question/list', {
        params: {
          homeworkId: payload.homeworkId,
          questionType: payload.questionType,
          studentInfoId: payload.studentInfoId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('QUESTIONINFOLIST', data.infos)
        }
        return data
      })
  },
  questionInfo({ commit, rootGetters }) {
    commit('UPDATEREVIEWVOICESRC', null)
    commit('UPDATEREVIEWVOICE', null)
    commit('IMGURL', {})
    commit('PICINDEX', 1)
    // commit('QUESTIONINFO', [])
    return http
      .get('/api/teacher/homework/question/info', {
        params: {
          teacherId: rootGetters.teacherId,
          homeworkQuestionId: state.homeworkQuestionId,
          studentInfoId: state.studentInfoId
        }
      })
      .then(({ data }) => {
        if (data.flag === 1) {
          commit('QUESTIONINFO', data.infos)

          let voice =
            (data.infos.reviewList &&
              data.infos.reviewList.filter(item => item.reviewUserType === 2)[0]
                .reviewVoiceStr) ||
            null

          commit('UPDATEREVIEWVOICESRC', voice)
        }
        return data
      })
  },
  teacherReview({ rootGetters }, payload) {
    let resultJsonArray = [
      {
        answerContent: payload.answerContent,
        ifLast: payload.ifLast,
        isTrue: payload.isTrue,
        reviewFile: payload.reviewFile,
        reviewResult: payload.reviewResult,
        reviewVoice: payload.reviewVoice,
        studentAnswerId: payload.studentAnswerId,
        studentAnswerReviewId: payload.studentAnswerReviewId
      }
    ]

    let requestParam = {
      homeworkId: payload.homeworkId,
      ifDone: payload.ifDone,
      reviewUserId: rootGetters.teacherId,
      reviewUserName: rootGetters.teacherName,
      studentInfoId: payload.studentInfoId,
      resultJsonArray: resultJsonArray
    }
    return http.post('/api/teacher/homework/review', {
      requestParam: JSON.stringify(requestParam)
    })
  },
  teacherAllReview({ rootGetters }, payload) {
    let requestParam = {
      reviewUserId: rootGetters.teacherId,
      reviewUserName: rootGetters.teacherName,
      homeworkId: payload.homeworkId,
      studentInfoId: payload.studentInfoId,
      ifDone: payload.ifDone,
      resultJsonArray: payload.resultJsonArray
    }
    return http.post('/api/teacher/homework/review', {
      requestParam: JSON.stringify(requestParam)
    })
  }
}
const mutations = {
  QUESTIONINFOLIST(state, payload) {
    state.questionListInfo = payload
  },
  QUESTIONINFO(state, payload) {
    state.questionInfo = payload
  },
  STUDENTINFOID(state, payload) {
    state.studentInfoId = payload
  },
  UPDATEHOMEWORKQUESTIONID(state, payload) {
    state.homeworkQuestionId = payload
  },
  UPDATEREVIEWVOICE(state, payload) {
    state.reviewVoice = payload
  },
  UPDATEREVIEWVOICESRC(state, payload) {
    state.reviewVoiceSrc = payload
  },
  STUDENTNAME(state, payload) {
    state.studentName = payload
  },
  PICINDEX(state, payload) {
    state.picIndex = payload
  },
  IMGURL(state, payload) {
    state.imgUrl = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
