export default {
  islogin :(state,status) => state.islogin = status,
  setPage : (state,page) => state.page = page,
  setMember: (state, data) => state.member = data,
  setLastPurchase: (state, data) => state.lastPurchase = data,
  addLastPurchase: (state, data) => state.lastPurchase.push(data),
  addHistoryPurchase: (state, data) => state.historyPurchase.push(data),
  addCourse: (state, data) => state.course.unshift(...data),
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
  addUserCourse: (state, data) => state.userCourse.push(...data),
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
  addFavoriteAmountLesson: (state, lesson_id) => stat.lesson.map(l => l.lesson_id == lesson_id ? l.love += 1 : ''),
  addRecommend: (state, data) => state.recommend.push(data),
  setRecommend: (state, data) => state.recommend.map(r => r.user_id == data.user_id ? r.status = data : ''),
  addLessonVideo: (state, data) => state.lesson.map(l => l.lesson_id == data.lesson_id ? l.video.push(data) : ''),
  addCourseFor: (state, data) => state.courseFor.push(...data),
  addCourseInclude: (state, data) => state.courseInclude.push(...data),
  addCourseReceive: (state, data) => state.courseReceive.push(...data),
  removeCourseInclude: (state, id) => state.courseInclude.map((l,i) => l.ci_id == id ? state.courseInclude.splice(i,1) : ''),
  removeCourseReceive: (state, id) => state.courseReceive.map((l,i) => l.cr_id == id ? state.courseReceive.splice(i,1) : ''),
  removeCourseFor: (state, id) => state.courseFor.map((l,i) => l.cf_id == id ? state.courseFor.splice(i,1) : ''),
  removeVideoLesson: (state, payload) => {
    const data = {
      lesson_id: payload.lesson_id,
      video_id: payload.video_id
    }
    state.lesson.map((l, li) => l.lesson_id == data.lesson_id ? l.video.map((v, vi) => v.video_id == data.video_id ? state.lesson[li].video.splice(vi, 1) : '' ) : '' )
  },
  addUserRecommend: (state, data) => {
    state.recommendUser.find(ru => ru.user_id == data.user_id) == undefined ? state.recommendUser.push(...data) : ''
    console.log('state.recommendUser',state.recommendUser)
  },
  addLessonPicture: (state, data) => {
    state.lesson.map((l, i) => l.lesson_id == data.lesson_id ? l.picture == undefined ? [l.picture = [], l.picture.push(data)] : l.picture.push(data) : '')
    console.log(state.lesson)
  },
  removePictureLesson: (state, payload) => {
    const data = {
      lesson_id: payload.lesson_id,
      picture_id: payload.picture_id
    }
    console.log('beforeRemove', state.lesson)
    state.lesson.map((l, li) => l.lesson_id == data.lesson_id ? l.picture.map((v, vi) => v.picture_id == data.picture_id ? state.lesson[li].picture.splice(vi, 1) : '' ) : '' )
    console.log('afterRemove', state.lesson)
  }
}
