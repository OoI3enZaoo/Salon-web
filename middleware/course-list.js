import axios from 'axios'
export default function ({store,isServer,req}){
    if (isServer && !req) return
    if(store.getters.courseList ==''){
      axios.get('https://salon-b177d.firebaseio.com/courses.json')
      .then(res=>{
        let result = res.data
        for(let mName in result){
            store.commit('addCourseList',result[mName].name)
            console.log("result[mName].name: " + result[mName].name);
            console.log("store.state.courseLIst: " + store.getters.courseList);
        }
      })
    }
}
