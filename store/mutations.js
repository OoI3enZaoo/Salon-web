export default {
  islogin :(state,status) => state.islogin = status,
  setPage : (state,page) => state.page = page,
  setMember: (state, data) => state.member = data,
  setLastPurchase: (state, data) => state.lastPurchase = data,
  addLastPurchase: (state, data) => state.lastPurchase.push(data),
  addHistoryPurchase: (state, data) => state.historyPurchase.push(data),
  addCourse: (state, data) => state.course.push(...data),
  addLesson: (state, data) => state.lesson.push(...data),
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
