import axios from 'axios'
export const state = () => ({
  islogin : false,
  page : '',
  number : 1,
  courseData : [],
  lessonsData : [],
  currentCourse : {},
  currentLesson : {}
})

export const getters  =  {
  islogin : (state) => state.islogin,
  page : (state) => state.page,
  number :(state) => state.number,
  courseData : (state) => state.courseData,
  lessonsData : (state) => state.lessonsData,
  currentLesson : (state) => state.currentLesson
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
  user :(state) => console.log("hello world")
}
export const actions = {
  removeLesson({commit},id){
    axios.delete('https://salon-b177d.firebaseio.com/lessons/' + id + '/.json')
    .then((res)=>{
      console.log("deleted data of firebase: " + JSON.stringify(res));
        //commit('addLesson',res.data)
    })
     console.log('id: ' + id);
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

  }
}
