
import Vuex from 'vuex'
import createPersistedState  from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'

 const store = new Vuex.Store({
state : {
  islogin : false,
  page : '',
  number : 1
},

getters : {
  islogin : (state) => state.islogin,
  page : (state) => state.page,
  number :(state) => state.number
},
mutations : {
  islogin :(state,status) => state.islogin = status,
  setPage : (state,page) => state.page = page,
  setNumber :(state,number) => state.number += number
}
// ,
// plugins: [
//   createPersistedState({
//              paths: ['number','islogin'],
//              getState: (key) => Cookie.getJSON(key),
//              setState: (key, state) => Cookie.set(key, state, { expires: 30003003, secure: false })
//          })
// ]
})
export default store
