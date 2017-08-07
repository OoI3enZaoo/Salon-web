<template>
<div >
  <div id="chartdiv">

  </div>

{{name}}
</div>


</template>
<script>
import axios from 'axios'
  let purchase = [];
export default {

async asyncData({store}){

    // const {data} = await axios.get('https://salon-b177d.firebaseio.com/courses.json')
    // const {data} = await axios.get('https://salon-b177d.firebaseio.com/purchase.json')

    // .then(res=>{
      // return data
      // let result = res.data
      //     for(let key in result){
      //       console.log("result: " + JSON.stringify(result[key].name));
      //       name.push(result[key].name)
      //     }
    // })
    // await axios.get('https://salon-b177d.firebaseio.com/purchase.json')
    // .then(res=>{
    //     console.log("name: " + name);
    // })


},

  data (){
    return {

      }
    },
    created() {

        axios.get('https://salon-b177d.firebaseio.com/courses.json')
        .then(res=>{
          let result = res.data
              for(let key in result){
                console.log("result: " + JSON.stringify(result[key].name));
                let mName = result[key].name
                axios.get('https://salon-b177d.firebaseio.com/purchase.json')
                .then(res2 =>{
                  let result2 = res2.data
                  let count = 0;
                    for(let key2 in result2){
                      if(result2[key2].courseId == key){
                          count++
                      }
                    }
                    purchase.push({name : mName , sold: count})
                })

              }
        })
          // for(let key2 in data2){
          //   console.log("key2: " + data2[key2].courseId);
          // }
        //console.log("data1: " + JSON.stringify(data));
        //console.log("data2: " + data2);
    },
  mounted() {
      console.log("purchase:  " + JSON.stringify(purchase));
    //do something after mounting vue instance
    AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "theme": "light",
    "dataProvider": [ {
      "title": "เจ้าของร้านเสริมสวย",
      "value": 4852
    }, {
      "title": "ช่างทำผม",
      "value": 9899
    } , {
      "title": "ผู้ช่วยช่าง",
      "value": 9899
    }
    , {
      "title": "ผู้สนใจกิจการช่างทำผม",
      "value": 9899
    } , {
      "title": "อีกอันจำไม่ได้อะลืม",
      "value": 9899
    } , {
      "title": "อีกอันจำไม่ได้อะลืม",
      "value": 9899
    } ],
    "titleField": "title",
    "valueField": "value",
    "labelRadius": 5,

    "radius": "42%",
    "innerRadius": "60%",
    "labelText": "[[title]]",
    "titles": [{
   "text": "จำนวนคอร์สที่ขายได้ทั่งหมด"
 }],
    "export": {
      "enabled": true
    }
  } )
  }
}
</script>
<style>
#chartdiv {
	width		: 100%;
	height		: 500px;
	font-size	: 11px;
}
</style>
