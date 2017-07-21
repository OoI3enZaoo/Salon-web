export const state = {
  isLogin : false,
  page : ''
}
export const mutations = {
  setLogin : (state,status) => state.isLogin = status,
  setPage : (state,page) => state.page = page
}
export const getters = {
  isLogin : (state) => state.isLogin,
  page : (state) => state.page
}
export const actions = {
   //setPage : ({commit},page) => commit('setPage',page)
}
