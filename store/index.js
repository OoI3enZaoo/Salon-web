import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
export const state = () => ({
  islogin : false,
  firstname : 'สมชาย',
  lastname : 'น มงคล',
  page : '',
  number : 1,
  courseData : [],
  lessonsData : [],
  currentCourse : {},
  currentLesson : {},
  courseList : [],
  checkAddData: [false,''],
  member: [],
  lastPurchase: [],
  historyPurchase: [],
  course: [],
  lesson: [],
  admin: []
})
export const plugins = [
  createPersistedState({
    paths: ['islogin', 'number']
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
  setNumber :(state,number) => state.number += number,
  setLesson :(state,data) => state.lessonsData = data,
  setCourse : (state,data) => state.courseData = data,
  addLesson : (state,data) => state.lessonsData.push(data),
  setCurrentLesson : (state,data) =>state.currentLesson = state.lessonsData.filter(res => data == res.key),
  //removeLesson : (state,data) =>  state.loadLesson.filter((data,i) => data.key == item ? this.loadLesson.splice(i,1) : '');
  editLesson :(state,data) => state.lessonsData.filter(res => data.key == res.key ? res = data : ''),
  editCourse : (state,data) =>state.courseData.filter(res => data.key === res.key ? res = data : ''),
  addCourse : (state,data) => state.courseData.push(data),
  addCourseList : (state,data)=> state.courseList.push(data),
  setCourseList : (state,data)=> state.courseList = data,
  checkAddData: (state,data) => state.checkAddData = data,
  setMember: (state, data) => state.member = data,
  addMember: (state, data) => state.member.push(data),
  setLastPurchase: (state, data) => state.lastPurchase = data,
  addLastPurchase: (state, data) => state.lastPurchase.push(data),
  addHistoryPurchase: (state, data) => state.historyPurchase.push(data),
  setCourse2: (state, data) => state.course = data,
  setLesson2: (state, data) => state.lesson = data,
  UpdateStoreLesson: (state, data) => state.lesson.filter(res => data.lesson_id == res.lesson_id ? [res.title = data.title,res.description = data.description, res.cover = data.cover] : ''),
  setadmin: (state, data) => state.admin.push(data)
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
  removeLesson({commit,state},id){
    axios.delete('https://salon-b177d.firebaseio.com/lessons/' + id + '/.json')
    .then((res)=>{
      console.log("deleted data of firebase: " + JSON.stringify(res));
        let a = state.lessonsData.filter(data => data.key !==id);
        commit('setLesson',a)
    })
     //console.log('id: ' + id + " state num: " + state.number);
    //state.lessonsData.filter((data,i) => data.courseId == id ? console.log("found") : console.log("not found"));
  },
  addLesson({commit},data){
    console.log("data: " + data);
    axios.post('https://salon-b177d.firebaseio.com/lessons.json',data)
    .then((res)=>{
      let key2 = res.data.name;
        console.log("posted to firebase");
        data.key = key2;
        console.log("datatata : " + JSON.stringify(data));
        commit('addLesson',data)
    })
    .catch((error) =>{
      console.log("error to post data to firebase");
    })
  },
  editLesson({commit},{params,data}){
    console.log("params: " + params);
    console.log("data: " + JSON.stringify(data));
    axios.put('https://salon-b177d.firebaseio.com/lessons/' + params + '.json',data)
    .then((res)=>{
      let result = res.data;
      result.key = params
      console.log("res2: " + JSON.stringify(result));
        commit('editLesson',result)
    })
  },
  setCourse({commit},{key,data}){
    console.log("key: " + key);
    console.log("data: " + JSON.stringify(data));
    axios.put('https://salon-b177d.firebaseio.com/courses/' +  key+'.json',data)
    .then(res=>{
        let result = res;
        result.key = key
        result.edit = false
        console.log("res: " + JSON.stringify(res));
        commit('editCourse',result)
    })
  },
  addCourse({commit,state},data){
    console.log("data: " + JSON.stringify(data));
      data.author = state.firstname + ' ' + state.lastname
      data.edit = false;
      axios.post('https://salon-b177d.firebaseio.com/courses.json',data)
      .then((res)=>{
          let key2 = res.data.name;
          console.log("posted to firebase");
          data.key = key2;
          console.log("datatata : " + JSON.stringify(data));
          commit('addCourse',data)
          commit('checkAddData',[true,data])
          axios.patch('https://salon-b177d.firebaseio.com/courses/' + key2 + '.json',{key: key2})
          .then(res2 =>{
          })

          //commit('addCourseList',this.course.name)
      })
      .catch((error) =>{
        console.log("error to post data to firebase");
      })
  },
    removeCourse({commit,state},{id,name}){
    console.log("id: " + id);
    console.log("name: " + name);
    axios.delete('https://salon-b177d.firebaseio.com/courses/' + id + '/.json')
    .then((res)=>{
      console.log("deleted data of firebase: " + JSON.stringify(res));
          let a = state.courseData.filter(data => data.key !==id);
          commit('setCourse',a)
          let b = state.courseList.filter(data => data !== name);
          commit('setCourseList',b)

      console.log("a.name: " + a);
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
      await axios.get('http://localhost:4000/api/getchartlength')
      .then(res => {
        let result = res.data
        console.log('result: ' + result.length)
        result.forEach(each => {
          axios.get('http://localhost:4000/api/getchart/' + each.course_id)
          .then(res2 => {
            let result2 = res2.data
            console.log('result2: ' + JSON.stringify(result2[0]))
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
  }
}
