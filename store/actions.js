import axios from 'axios'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  async getMember ({state, commit}) {
    await axios.get('http://172.104.189.169:4000/api/getuser/')
    .then (res => {
      let result = res.data
      commit('setMember', result)
    })
  },
  async lastPurchase ({commit}) {
    await axios.get('http://172.104.189.169:4000/api/getcoursepurchase/7')
    .then(res=> {
      let result = res.data
      commit('setLastPurchase', result)
    })
  },
  async getHistoryPurchase ({commit}) {
    console.log('getHistoryPurchase')
      await axios.get('http://172.104.189.169:4000/api/getcourselength')
      .then(res => {
        let result = res.data
        console.log('result: ' + result.length)
        result.forEach(each => {
          axios.get('http://172.104.189.169:4000/api/getchart/' + each.course_id)
          .then(res2 => {
            let result2 = res2.data
            commit('addHistoryPurchase', result2[0])

        })
      })
    })
  },
   pullCourse ({commit, state, dispatch}) {
    if (state.course.length == 0) {
      axios.get('http://172.104.189.169:4000/api/getcourse/')
      .then(res => {
        let result = res.data
        commit('addCourse', result)
        result.map(r => {
          dispatch('courseDetail', r.course_id)
        })
      })
    }
  },
  pullCourseFromCourseId ({commit, state, dispatch}, course_id) {
    let isCheck = false
    state.course.find(c => c.course_id == course_id ? isCheck = true : '')
    if (isCheck == false) {
      axios.get('http://172.104.189.169:4000/api/get_course_from_id/' + course_id)
      .then(res => {
        let result = res.data
        commit('addCourse', result)
      })
      dispatch('courseDetail', course_id)
    }
 },
 courseDetail ({commit}, course_id) {
   axios.get('http://172.104.189.169:4000/api/get_course_for/' + course_id)
   .then(res => {
     let result = res.data
     commit('addCourseFor', result)
   })

   axios.get('http://172.104.189.169:4000/api/get_course_include/' + course_id)
   .then(res => {
     let result = res.data
     commit('addCourseInclude', result)
   })

   axios.get('http://172.104.189.169:4000/api/get_course_receive/' + course_id)
   .then(res => {
     let result = res.data
     commit('addCourseReceive', result)
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
    axios.post('http://172.104.189.169:4000/api/updatelesson', data)
  },
  pullAdmin ({commit}) {
    axios.get('http://172.104.189.169:4000/api/getadmin')
    .then (res => {
      let result = res.data
      commit('setadmin', result[0])
    })
  },
  async getlinechart ({commit, dispatch}) {
    let date = Vue.moment().format()
    await axios.get('http://172.104.189.169:4000/api/getcourselength')
    .then(res => {
      let result = res.data
      let count = 0
      result.forEach((each,index,array) => {
        axios.get('http://172.104.189.169:4000/api/yearsales/' + date + '/' + each.course_id)
        .then (res2 => {
          let result2 = res2.data
          axios.get('http://172.104.189.169:4000/api/getcoursename/' + each.course_id)
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
    await axios.get('http://172.104.189.169:4000/api/getlastpurchase/7')
    .then (res => {
      commit('addSumPurchase', res.data[0].sum)
    })
    await axios.get('http://172.104.189.169:4000/api/getlastpurchase/30')
    .then (res => {
      commit('addSumPurchase', res.data[0].sum)
    })
    await axios.get('http://172.104.189.169:4000/api/getlastpurchase/180')
    .then (res => {
      commit('addSumPurchase', res.data[0].sum)
    })
    await axios.get('http://172.104.189.169:4000/api/getlastpurchase/')
    .then (res => {
      commit('addSumPurchase', res.data[0].sum)
    })
  },
  async pullLastChat ({commit}) {
    console.log('pullLastChat')
    axios.get('http://172.104.189.169:4000/api/getlastchat/')
    .then (res => {
      let result = res.data
      result.map(each => {
        axios.get('http://172.104.189.169:4000/api/getlastchat/' + each.user_id)
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
      text: payload.text,
      tstamp: Vue.moment().format('YYYY-MM-DD HH:mm:ss'),
      type: payload.type
    }
    commit('addMessageChat', [data])
    axios.post('http://172.104.189.169:4000/api/postchat', data)
    .then (res => {
      console.log('result: ' + JSON.stringify(res))
    })
  },
  async getChat ({commit, state}, userId) {
    let isCheck = false
    state.messageChat.find(f => f.user_id == userId ? isCheck = true : '')
    if (isCheck == false) {
      axios.get('http://172.104.189.169:4000/api/getchat/' + userId)
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
      axios.get('http://172.104.189.169:4000/api/usercourse/' + userId)
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
          axios.get('http://172.104.189.169:4000/api/usercourse/' + userId)
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
    axios.post('http://172.104.189.169:4000/api/updatecourse/', payload)
    .then (res => {
      console.log('result: ' + JSON.stringify(res))
    })
  },
  InsertCourse ({commit}, payload) {
    axios.post('http://172.104.189.169:4000/api/insertcourse/', payload)
    .then (res => {
      console.log('result: ' + JSON.stringify(res))
    })
  },
  UpdateLesson ({commit}, payload) {
    console.log('UpdateLesson: ' + JSON.stringify(payload))
    axios.post('http://172.104.189.169:4000/api/updatelesson/', payload)
    .then (res => {
    })
  },
  InsertLesson ({commit, state},payload) {
    console.log('payload: ' + JSON.stringify(payload))
    axios.post('http://172.104.189.169:4000/api/insertlesson', payload)
    .then (res => {
      payload.lesson_id = res.data.lesson_id,
      payload.fname = state.adminData.fname,
      payload.lname = state.adminData.lname,
      payload.avatar = state.adminData.avatar
      commit('addLesson', [payload])
      // console.log(payload)
    })
  },
  UpdateCourse ({commit}, payload) {
    axios.post('http://172.104.189.169:4000/api/updatecourse', payload)
    console.log('UpdateCourse: ' + JSON.stringify(payload))
  },
  pullUserPurchase ({commit, state}, courseId) {
    let isCheck = false
    state.courseLastPurchase.find(f => f.course_id == courseId ? isCheck = true : '')
    if (isCheck == false) {
      axios.get('http://172.104.189.169:4000/api/userpurchase_by_course_id/' + courseId)
      .then(res => {
        let result = res.data
        commit('AddCourseLastPurchase', result)
      })
    }
  },
  async pullLesson ({commit, state}, courseId) {
    console.log('courseId: ' + courseId)
    let isCheck = false
    state.lesson.find(f => f.course_id == courseId ? isCheck = true : '')
    if (isCheck == false) {
      console.log('load lesson from api')
      let lesson
      await axios.get('http://172.104.189.169:4000/api/getlesson/' + courseId)
      .then(res => {
        lesson = res.data
      })
      lesson.map(l => {
        axios.get('http://172.104.189.169:4000/api/getvideo/' + l.lesson_id)
        .then (res => {
          console.log('lesson_id: ' + l.lesson_id)
          l.video = res.data
          // console.log(l)

          commit('addLesson', [l])
        })
      })
    }
  },
  AddNewVideo ({commit, state}, payload) {
    console.log('AddNewVideo');
    let filesData = payload.data
    delete payload["data"]
    let {lesson_id, title, tstamp} = payload
    axios.post('http://172.104.189.169:4000/api/insertvideo', {lesson_id, title, tstamp})
    .then (res => {
      let result = res.data
      payload.file_id = result.file_id
      axios.post('http://172.104.189.169:4400/api/videoupload/' + result.file_id, filesData)
      .then((res) => {
        console.log('successMsg: ' + res.data.video)
        payload.video = res.data.video
        console.log(payload)
        let videoData = {
          file_id: payload.file_id,
          lesson_id: payload.lesson_id,
          title: payload.title,
          tstamp: payload.tstamp,
          video: payload.video
        }
        // let {file_id, lesson_id, title, tstamp, video} = payload
        commit('addvideo', videoData)
      })
      .catch((error) => {
        console.log('error');
      })
    })
  },
  editLesson ({commit, state}, payload) {
    console.log('editLesson')
    axios.post('http://172.104.189.169:4400/api/editlesson/' + payload.lesson_id + '/' + payload.title , payload.data)
    .then((res) => {
      console.log('success editlesson')
      state.lesson.map(l => l.lesson_id == payload.lesson_id ? [l.video = res.data.video,l.title = payload.title] : '')
    })
    .catch((error) => {
      console.log('error');
    })
  },
  editTitleLesson ({commit, state}, payload) {
    console.log('editTitleLesson')
    axios.post('http://172.104.189.169:4400/api/edittitlelesson/' , payload)
    .then((res) => {
      console.log('success editTitleLesson')
      state.lesson.map(l => l.lesson_id == payload.lesson_id ? l.title = payload.title : '')
    })
    .catch((error) => {
      console.log('error');
    })
  },
  deleteLesson ({commit, state}, payload) {
    const data = {
      lesson_id: payload
    }
    state.lesson.map((l,i) => l.lesson_id == payload.lesson_id ? state.lesson.splice(i, 1) : '')
    axios.post('http://172.104.189.169:4000/api/deletelesson', data.lesson_id)
  },
  AddNewCourse ({commit, state}, payload) {
    console.log('AddNewCourse: ' + JSON.stringify(payload))
    let filesData = payload.data
    delete payload["data"]
    axios.post('http://172.104.189.169:4000/api/insertcourse', payload)
    .then (res => {
      let result = res.data
      console.log('result: ' + JSON.stringify(result))
      payload.course_id = result.course_id
      payload.fname = state.adminData.fname
      payload.lname = state.adminData.lname
      payload.avatar = state.adminData.avatar
      payload.view = 0
      payload.video = null
      commit('addCourse', [payload])
      axios.post('http://172.104.189.169:4400/api/courseupload/' + result.course_id, filesData)
      .then((res) => {
        console.log('successMsg: ')
        state.course.map(c => c.course_id == payload.course_id ? c.video = res.data.video : '')
      })
      .catch((error) => {
        console.log('error');
      })
    })
  },
  DeleteCourse ({commit}, payload) {
    commit('DeleteCourse', payload.course_id)
    axios.post('http://172.104.189.169:4000/api/deletecourse', payload)
  },
  pullRecommend ({commit, state}) {
    if (state.recommend.length == 0) {
      axios.get('http://172.104.189.169:4000/api/getrecommend')
      .then (res => {
        let result = res.data
        commit('addRecommend', result)
      })
    }
  },
  setRecommend ({commit}, payload) {
    axios.post('http://172.104.189.169:4000/api/setrecommend', payload)
    commit('setRecommend', payload)
  },
  addCourseFor ({commit}, payload) {
    axios.post('http://172.104.189.169:4000/api/add_course_for', payload)
    .then (res => {
      let data = {
        cf_id: res.data.cf_id,
        course_id: payload.course_id,
        for_des: payload.des
      }
      commit('addCourseFor', [data])
    })
  },
  addCourseReceive ({commit}, payload) {
    axios.post('http://172.104.189.169:4000/api/add_course_receive', payload)
    .then (res => {
      let data = {
        cr_id: res.data.cr_id,
        course_id: payload.course_id,
        receive_des: payload.des
      }
      commit('addCourseReceive', [data])
    })
  },
  addCourseInclude ({commit}, payload) {
    axios.post('http://172.104.189.169:4000/api/add_course_include', payload)
    .then (res => {
      let data = {
        ci_id: res.data.ci_id,
        course_id: payload.course_id,
        include_des: payload.des
      }
      commit('addCourseInclude', [data])
    })
  },
  removeCourseInclude ({commit}, id) {
    console.log('removeCourseInclude: ' + id)
    axios.post('http://172.104.189.169:4000/api/remove_course_include', {id: id})
    commit('removeCourseInclude', id);
  },
  removeCourseReceive ({commit}, id) {
    console.log('removeCourseReceive: ' + id)
    axios.post('http://172.104.189.169:4000/api/remove_course_receive', {id: id})
    commit('removeCourseReceive', id);
  },
  removeCourseFor ({commit}, id) {
    console.log('removeCourseFor: ' + id)
    axios.post('http://172.104.189.169:4000/api/remove_course_for', {id: id})
    commit('removeCourseFor', id);
  },
  removeVideoLesson ({commit}, payload) {
    const data = {
      lesson_id: payload.lesson_id,
      video_id: payload.video_id
    }
    axios.post('http://172.104.189.169:4000/api/remove_video', {video_id: video_id})
    .then (() => {
      commit('removeVideoLesson', data);
    })
  }
}
