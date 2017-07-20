export const state = {
  toolbar: 'start',
  isLogin : false
}
export const mutations = {
  setToolbar : (state,name) => state.toolbar = name,
  setLogin : (state,status) => state.isLogin = status
}
export const getters = {
  isLogin : (state) => state.isLogin
}
export const actions = {
   setToolbar : ({commit},name) => commit('setToolbar',name)
}
