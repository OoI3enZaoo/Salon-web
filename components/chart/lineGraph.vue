<template>
  <div class="echarts">
    <IEcharts :option="bar" @ready="onReady" @click="onClick"></IEcharts>
  </div>
</template>
<script type="text/babel">

  import IEcharts from 'vue-echarts-v3/src/full.vue';
  export default {
    components: {
      IEcharts
    },
    data () {
      return {
      loading: true,
      bar : {
    title: {
        text: 'รายได้รวมใน 1 ปี '
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: this.$store.state.cData.courseItem2
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.$store.state.cData.month2
    },
    yAxis: {
        type: 'value'
    },
    series: this.$store.state.cData.chartData2
    }
    }
  },
    methods: {
      onReady(instance) {
        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log(arguments);
      }
    }
  };
</script>

<style scoped>
  .echarts {
    width: 100%;
    height: 400px;
  }
</style>
