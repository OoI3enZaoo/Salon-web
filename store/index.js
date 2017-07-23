
export const state = () => ({
  islogin : false,
  page : '',
  number : 1
})

export const getters  =  {
  islogin : (state) => state.islogin,
  page : (state) => state.page,
  number :(state) => state.number
}
export const mutations  =  {
  islogin :(state,status) => state.islogin = status,
  setPage : (state,page) => state.page = page,
  setNumber :(state,number) => state.number += number
}



