import axios from 'axios'
export default function ({store,isServer,req}){
    if (isServer && !req) return
      if(store.getters.courseData == '' ){
        console.log("load data from firebase");
            // this.$store.dispatch('setCourse')
            // this.$store.dispatch('setLesson')
            axios.get('https://salon-b177d.firebaseio.com/courses.json')
            .then(res=>{
              let result = res.data;
              let arrayData = [];
                for(let key in result){
                  result[key].key = key
                  result[key].edit = false
                  store.commit('addCourseList',result[key].name)
                  arrayData.push(result[key])
                }
                store.commit('setCourse',arrayData)
                })


                axios.get('https://salon-b177d.firebaseio.com/lessons.json')
                .then((res)=>{
                    let result = res.data;
                    let arrayData = [];
                    for(let key in result){
                      result[key].key = key
                      arrayData.push(result[key])
                    }
                    store.commit('setLesson',arrayData)
                    arrayData = []
                  //  console.log("lessons[key]: " + JSON.stringify(arrayData));

                  })

          }else{
            console.log("load data from store");
          //  this.editLes = this.courseData
          }

}
