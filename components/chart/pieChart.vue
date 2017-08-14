<template>
  <div class="echarts">
    <IEcharts :option="option"></IEcharts>
  </div>


</template>
<script type="text/babel">
import axios from 'axios'
  let purchase = [];
  import IEcharts from 'vue-echarts-v3/src/full.vue';

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
components: {
      IEcharts
    },
  data (){
    return {
      option : {
  title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
  },
  series : [
      {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
}
      }
    }
  }
    // created() {
    //     axios.get('https://salon-b177d.firebaseio.com/courses.json')
    //     .then(res=>{
    //       let result = res.data
    //           for(let key in result){
    //             console.log("result: " + JSON.stringify(result[key].name));
    //             let mName = result[key].name
    //             axios.get('https://salon-b177d.firebaseio.com/purchase.json')
    //             .then(res2 =>{
    //               let result2 = res2.data
    //               let count = 0;
    //                 for(let key2 in result2){
    //                   if(result2[key2].courseId == key){
    //                       count++
    //                   }
    //                 }
    //                 purchase.push({name : mName , sold: count})
    //             })
    //
    //           }
    //     })
    //       // for(let key2 in data2){
    //       //   console.log("key2: " + data2[key2].courseId);
    //       // }
    //     //console.log("data1: " + JSON.stringify(data));
    //     //console.log("data2: " + data2);
    // },

</script>
<style scoped>
  .echarts {
    width: 100%;
    height: 400px;
  }
</style>
