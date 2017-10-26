import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
export default () => {
  return new Vuex.Store({
    state: {
      background: require('../static/background.jpg'),
      islogin : false,
      adminData: {},
      firstname : 'สมชาย',
      lastname : 'น มงคล',
      page : '',
      member: [],
      lastPurchase: [],
      courseLastPurchase: [],
      historyPurchase: [],
      course: [],
      lesson: [],
      admin: [],
      chart: [],
      loadChart: true,
      bar: {
        title: {
            text: 'รายได้รวมใน 1 ปี '
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
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
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
      },
      sumPurchase: [],
      lastChat: [],
      messageChat: [],
      userCourse: []
    },
    plugins: [
      createPersistedState({
        paths: ['islogin', 'number', 'adminData']
      })
    ],
    getters,
    mutations,
    actions
  })
}
