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
  sumPurchase: []
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
  addAdminData: (state, data) => state.adminData = data
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
        console.log('login true')
        commit('addAdminData', result[0])
        commit('islogin', true)
      } else {
        console.log('login false')
      }
    })
  }
}
