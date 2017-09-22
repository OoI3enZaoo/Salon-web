<template>
  <div>

      <div v-if="$store.state.loadChart" class="text-xs-center">
        <v-progress-circular indeterminate v-bind:size="50" class="primary--text"></v-progress-circular>
      </div>
    <template v-else>
      <div class="echarts">
        <IEcharts :option="$store.state.bar" @ready="onReady" @click="onClick"></IEcharts>
      </div>
    </template>

</div>
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  export default {
    components: {
      IEcharts
    },
    methods: {
      onReady(instance) {
        console.log(instance)
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
