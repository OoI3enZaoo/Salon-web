import axios from 'axios'
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
  checkAddData: [false,'']
})

export const getters  =  {
  islogin : (state) => state.islogin,
  page : (state) => state.page,
  number :(state) => state.number,
  courseData : (state) => state.courseData,
  lessonsData : (state) => state.lessonsData,
  currentLesson : (state) => state.currentLesson,
  courseList : (state) => state.courseList,
  checkAddData: (state) => state.checkAddData
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
  checkAddData: (state,data) => state.checkAddData = data
}
export const actions = {
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
  }
}
