<template>
    <div class="echarts">
      <IEcharts :option="option"></IEcharts>
    </div>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/full.vue';
export default {
  components: {
    IEcharts
  },
  data () {
    return {
        afterSlice: [],
        oldData: [],
        option : {
          title : {
              text: 'จำนวนคอร์สที่ขายไปทั้งหมด',
              subtext: 'กราฟวงกลม',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: this.$store.state.historyPurchase
          },
          series : [
          {
                  name: 'จำนวนคนซื้อคอร์ส',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data: this.$store.state.historyPurchase,
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
          }]
        }
      }
    }
  }
</script>
<style scoped>
  .echarts {
    width: 100%;
    height: 417px;
  }
</style>
