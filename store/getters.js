export default {
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
  },
  courseFromId (state) {
    return courseId => state.course.filter(item => {
      return courseId == item.course_id
    })
  },
  lessonFromId (state) {
    return lessonId => state.lesson.filter(item => {
      return lessonId == item.lesson_id
    })
  },
  lessonFromCourseId (state) {
    return courseId => state.lesson.filter(item => {
      return courseId == item.course_id
    })
  },
  courseLastPurchase (state) {
    return courseId => state.courseLastPurchase.filter(item => {
      return courseId == item.course_id
    })
  },
  getCurrentChat (state) {
    return userId => state.messageChat.filter(item => {
      return userId == item.user_id
    })
  },
  getCourseFor (state) {
    return course_id => state.courseFor.filter(item => {
      return course_id == item.course_id
    })
  },
  getCourseInclude (state) {
    return course_id => state.courseInclude.filter(item => {
      return course_id == item.course_id
    })
  },
  getCourseReceive (state) {
    return course_id => state.courseReceive.filter(item => {
      return course_id == item.course_id
    })
  }
}
