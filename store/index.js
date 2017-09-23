import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export const state = () => ({
  islogin : false,
  adminData: {},
  firstname : 'สมชาย',
  lastname : 'น มงคล',
  page : '',
  member: [],
  lastPurchase: [],
  historyPurchase: [],
  course: [],
  lesson: [],
  admin: [],
  chart: [],
  loadChart: true,
  bar: {
    title: {
        text: 'รายได้รวมใน 1 ปี '
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
  },
  sumPurchase: [],
  chat: [],
  messageChat: [],
  userCourse: []
})
export const plugins = [
  createPersistedState({
    paths: ['islogin', 'number', 'adminData']
  }),
]
export const getters  =  {
  islogin : (state) => state.islogin,
  page : (state) => state.page,
  number :(state) => state.number,
  courseData : (state) => state.courseData,
  lessonsData : (state) => state.lessonsData,
  currentLesson : (state) => state.currentLesson,
  courseList : (state) => state.courseList,
  checkAddData: (state) => state.checkAddData,
  getMember: (state) => state.member,
  getUserFromId: (state) => {
    return userId =>  state.member.filter(item=>{
      return userId == item.user_id
    })
  },
  getLessonFromId: (state) => {
    return userId =>  state.lesson.filter(item=>{
      return userId == item.lesson_id
    })
  },
  getAdminFromId: (state) => {
    return adminId => state.admin.filter(item => {
      return adminId == item.admin_id
    })
  },
  getMessageChat: (state) => {
    return userId => state.messageChat.filter(item =>{
      return userId == item.user_id
    })
  },
  getUserCourseFromId: (state, userId) => {
    return userId => state.userCourse.filter(item => {
      return userId == item[0].user_id
    })
  }
}
export const mutations  =  {
  islogin :(state,status) => state.islogin = status,
  setPage : (state,page) => state.page = page,
  setMember: (state, data) => state.member = data,
  setLastPurchase: (state, data) => state.lastPurchase = data,
  addLastPurchase: (state, data) => state.lastPurchase.push(data),
  addHistoryPurchase: (state, data) => state.historyPurchase.push(data),
  setCourse2: (state, data) => state.course = data,
  setLesson2: (state, data) => state.lesson = data,
  UpdateStoreLesson: (state, data) => state.lesson.filter(res => data.lesson_id == res.lesson_id ? [res.title = data.title,res.description = data.description, res.cover = data.cover] : ''),
  setadmin: (state, data) => state.admin.push(data),
  addChart: (state, data) => state.chart.push(data),
  setChartsData: (state, data) => {
    state.bar.legend.data = data.courseItem2
    state.bar.xAxis.data = data.month2
    state.bar.series = data.chartData2
  },
  setLoadChart: (state, data) => state.loadChart = data,
  addSumPurchase: (state, data) => state.sumPurchase.push(data),
  addAdminData: (state, data) => state.adminData = data,
  addChat: (state, data) => state.chat.push(data),
  unshiftChat: (state, data) => {
    console.log('val: ' + data.text);
    for (let i = 0; i< state.chat.length; i++) {
      if (data.user_id == state.chat[i].user_id) {
        state.chat.splice(i,1)
      }
    }
    let newData = data
    newData.text = 'คุณ: ' + data.adminText
    state.chat.unshift(newData)
  },
  addMessageChat1: (state, data) => {
    let a = state.messageChat[0]
    let b = data
    let c = a.concat(b)
    state.messageChat = [c]
  },
  addMessageChat: (state, data) => state.messageChat.push(data),
  addNewChat: (state, data) => {
    // console.log('data: ' + JSON.stringify(data))
    // for (let i = 0; i < state.chat.length; i ++) {
    //   console.log('gogogo : state.chat[i].user_id: ' + state.chat[i].user_id + " data.user_id: " + data.user_id)
    //   if (state.chat[i].user_id == data.user_id) {
    //       console.log('true')
    //       state.chat.unshift(state.chat[i])
    //       state.chat.splice(i, 1)
    //       console.log('state.chat: ' + JSON.stringify(state.chat))
    //       break
    //   } else {
    //
    //   }
    // }
  },
  addUserCourse: (state, data) => state.userCourse.push(data),
  addUserCourse2: (state, data) => {
    let a = state.userCourse[0]
    let b = data
    let c = a.concat(b)
    state.userCourse = [c]
  },
  changeEditCourse: (state, courseId) => {
    console.log('courseId: ' + courseId)
    state.course.map(res => res.course_id == courseId ? res.isEdit = !res.isEdit : '' )
  },
  updateCourse: (state, payload) => {
    payload.description = payload.afterEdit
    delete payload.afterEdit
    state.course.map(res => res.course_id == payload.course_id ? [res = payload,res.isEdit = !res.isEdit] : '')
  }
}
export const actions = {
  async nuxtServerInit({commit}){

  },
  async getMember ({state, commit}) {
    await axios.get('http://localhost:4000/api/getuser/')
    .then (res => {
      let result = res.data
      commit('setMember', result)
    })
  },
  async lastPurchase ({commit}) {
    await axios.get('http://localhost:4000/api/getcourselist/7')
    .then(res=> {
      let result = res.data
      commit('setLastPurchase', result)
    })
  },
  async getHistoryPurchase ({commit}) {
    console.log('getHistoryPurchase')
      await axios.get('http://localhost:4000/api/getcourselength')
      .then(res => {
        let result = res.data
        console.log('result: ' + result.length)
        result.forEach(each => {
          axios.get('http://localhost:4000/api/getchart/' + each.course_id)
          .then(res2 => {
            let result2 = res2.data
            commit('addHistoryPurchase', result2[0])

        })
      })
    })
  },
  async pullCourse ({commit}) {
    await axios.get('http://localhost:4000/api/getcourse')
    .then(res => {
      let result = res.data
      result.map(res => res.isEdit = false)
      commit('setCourse2', result)
    })
  },
  async pullLesson ({commit}) {
    await axios.get('http://localhost:4000/api/getlesson')
    .then(res => {
      let result = res.data
      commit('setLesson2', result)
    })
  },
  UpdateLesson ({state, commit}, payload) {
    const data = {
      lesson_id: payload.lesson_id,
      title: payload.title,
      description: payload.description,
      cover: payload.cover
    }
    commit('UpdateStoreLesson', data)
    axios.post('http://localhost:4000/api/updatelesson', data)
  },
  pullAdmin ({commit}) {
    axios.get('http://localhost:4000/api/getadmin')
    .then (res => {
      let result = res.data
      commit('setadmin', result[0])
    })
  },
  async getlinechart ({commit, dispatch}) {
    let date = Vue.moment().format()
    await axios.get('http://localhost:4000/api/getcourselength')
    .then(res => {
      let result = res.data
      let count = 0
      result.forEach((each,index,array) => {
        axios.get('http://localhost:4000/api/yearsales/' + date + '/' + each.course_id)
        .then (res2 => {
          let result2 = res2.data
          axios.get('http://localhost:4000/api/getcoursename/' + each.course_id)
          .then (res3 => {
            let result3 = res3.data
            result2[0].title = result3[0].title
            commit('addChart', result2[0])
            count ++
            if(count == array.length) {
              dispatch('pullchartdata')
            }
          })
        })
      })
    })
  },
  async pullchartdata ({commit, state}) {
    let month = [];
    let courseItem = [];
    let chartData = [];
    await state.chart.forEach(res=> {
      let strData = Object.values(res)
      let courseName = strData[strData.length - 1]
      let newData = []
      strData.map(each => each == courseName ? '' : newData.push(each))
        const data = {
          name: courseName,
          type: 'line',
          data: newData
        }
        courseItem.push(courseName)
        if (month.length == 0) {
          month = Object.keys(res)
        }
        chartData.push(data)
    })
    await month.pop()
    const mData = {
      month2: month,
      courseItem2:courseItem,
      chartData2:chartData
    }
    commit('setChartsData', mData)
    commit('setLoadChart', false)
  },
  async pullSumPurchase ({ commit }) {
    await axios.get('http://localhost:4000/api/getlastpurchase/7')
    .then (res => {
      commit('addSumPurchase', res.data[0].sum)
    })
    await axios.get('http://localhost:4000/api/getlastpurchase/30')
    .then (res => {
      commit('addSumPurchase', res.data[0].sum)
    })
    await axios.get('http://localhost:4000/api/getlastpurchase/180')
    .then (res => {
      commit('addSumPurchase', res.data[0].sum)
    })
    await axios.get('http://localhost:4000/api/getlastpurchase/')
    .then (res => {
      commit('addSumPurchase', res.data[0].sum)
    })
  },
  checkLogin ({commit, dispatch}, payload) {
    axios.get('http://localhost:4000/api/checklogin/' + payload.username + '/' + payload.password)
    .then(res => {
      let result = res.data
      if (Object.keys(result).length == 1) {
        commit('addAdminData', result[0])
        commit('islogin', true)
      } else {
      }
    })
  },
  async pullLastChat ({commit}) {
    axios.get('http://localhost:4000/api/getlastchat/')
    .then (res => {
      let result = res.data
      result.map(each => {
        axios.get('http://localhost:4000/api/getlastchat/' + each.user_id)
        .then (res2 => {
          let result2 = res2.data
          if (result2[0].type == 'admin') {
            result2[0].text = 'คุณ: ' + result2[0].text
          }
          commit('addChat', result2[0])
        })
      })
    })
  },
  insertChat ({state, commit}, payload) {
    const data = {
      admin_id: payload.admin_id,
      user_id: payload.user_id,
      text: payload.message,
      tstamp: Vue.moment().format('YYYY-MM-DD HH:mm:ss'),
      type: payload.type
    }
    // console.log('state.messageChat: ' + JSON.stringify(state.messageChat[0].push(data)))
    commit('addMessageChat1', data)
    axios.post('http://localhost:4000/api/postchat', data)
    .then (res => {
      console.log('result: ' + JSON.stringify(res))
    })
  },
  async getChat ({commit, state}, userId) {
    let isCheck = false
    if (state.messageChat.length != 0) {
      for (let i = 0; i< state.messageChat[0].length; i++) {
        console.log('user_id: ' + state.messageChat[0][i].user_id + ' userId: ' + userId)
        if (state.messageChat[0][i].user_id == userId) {
          isCheck = true
          console.log('true')
          break;
        } else {
          console.log('false')
          isCheck = false
        }
        if(i == state.messageChat[0].length - 1 && isCheck === false) {
          console.log('get again')
          axios.get('http://localhost:4000/api/getchat/' + userId)
          .then (res => {
            let result = res.data
            let reverse = result.reverse()
            commit('addMessageChat1', reverse)
          })
          break;
        }
      }
    } else {
      await axios.get('http://localhost:4000/api/getchat/' + userId)
      .then (res => {
        let result = res.data
        let reverse = result.reverse()
        commit('addMessageChat', reverse)
      })
    }
  },
  addNewChat ({commit, getters}, userId) {
    let data = getters.getUserFromId(userId)
    commit('addNewChat', data[0])
  },
  getUserCourse ({commit, state}, userId) {
    if (state.userCourse.length == 0) {
      axios.get('http://localhost:4000/api/usercourse/' + userId)
      .then (res => {
        let result = res.data
        commit('addUserCourse', result)
      })
    } else {
      for (let i = 0; i < state.userCourse[0].length; i++) {
        let isCheck = false
        if (state.userCourse[0][i].user_id == userId) {
          isCheck = true
          console.log('true')
          break
        } else {
          isCheck = false
          console.log('false')
        }
        if (i == state.userCourse[0].length - 1 && isCheck == false) {
          axios.get('http://localhost:4000/api/usercourse/' + userId)
          .then (res => {
            let result = res.data
            commit('addUserCourse2', result)
          })
        }
      }
    }
  },
  UpdateCourse ({commit}, payload) {
    commit('updateCourse', payload)
    axios.post('http://localhost:4000/api/updatecourse/', payload)
    .then (res => {
      console.log('result: ' + JSON.stringify(res))
    })
  }
}
