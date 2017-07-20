import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state :{
    toolbar : null
  },
  getters :{

  },
  mutations :{
      setToolbar : (state,name) => state.toolbar = name
  },
  actions :{
      setToolbar : ({commit},name) => commit('setToolbar',name)
  }
})
