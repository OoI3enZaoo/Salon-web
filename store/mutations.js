export default {
  islogin :(state,status) => state.islogin = status,
  setPage : (state,page) => state.page = page,
  setMember: (state, data) => state.member = data,
  setLastPurchase: (state, data) => state.lastPurchase = data,
  addLastPurchase: (state, data) => state.lastPurchase.push(data),
  addHistoryPurchase: (state, data) => state.historyPurchase.push(data),
  addCourse: (state, data) => state.course.unshift(...data),
  addLesson: (state, data) => state.lesson.unshift(...data),
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
  addChat: (state, data) => state.lastChat.push(data),
  unshiftChat: (state, data) => {
    console.log('val: ' + JSON.stringify(data));
    let newData = data
    state.lastChat.map((f,i) => data.user_id == f.user_id ? state.lastChat.splice(i,1) : '')
    newData.text = 'คุณ: ' + data.adminText
    state.lastChat.unshift(newData)
  },
  unshiftChatUser: (state, data) => {
    state.lastChat.map((f,i) => data.user_id == f.user_id ? state.lastChat.splice(i,1) : '')
    state.lastChat.unshift(data)
  },
  addMessageChat: (state, data) => {
    console.log('addMessageChat: ' + JSON.stringify(data))
    state.messageChat.push(...data)
  },
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
  },
  UpdateLesson: (state, payload) => state.lesson.map(l => {
    if (l.lesson_id == payload.lesson_id) {
      l.title  = payload.title
      l.description = payload.description
      l.cover = payload.cover
    }
  }),
  DeleteLesson: (state, lesson_id) => state.lesson.map((l,i) => {
    if (l.lesson_id == lesson_id) {
      state.lesson.splice(i,1)
    }
  }),
  UpdateCourse: (state, payload) => state.course.map(l => {
    if (l.course_id == payload.course_id) {
      l.title  = payload.title
      l.description = payload.description
      l.cover = payload.cover
      l.price = payload.price
      l.youtube = payload.youtube
    }
  }),
  AddCourseLastPurchase: (state, data) => state.courseLastPurchase.push(...data),
  DeleteCourse: (state, course_id) =>  state.course.map((c,i) => c.course_id == course_id ? state.course.splice(i,1) : ''),
  addViewAmountLesson: (state, lesson_id) => stat.lesson.map(l => l.lesson_id == lesson_id ? l.view += 1 : ''),
  addFavoriteAmountLesson: (state, lesson_id) => stat.lesson.map(l => l.lesson_id == lesson_id ? l.love += 1 : '')
}
