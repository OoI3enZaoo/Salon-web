
export const state = () => ({
  islogin : false,
  page : '',
  number : 1,
  lesson : []
})

export const getters  =  {
  islogin : (state) => state.islogin,
  page : (state) => state.page,
  number :(state) => state.number,
  lesson : (state,keyC,keyL) => state.lesson.filter(data => data.keyCourse == state.keyC &&data.keyLesson == state.keyL ? data : 'undefined')
}
export const mutations  =  {
  islogin :(state,status) => state.islogin = status,
  setPage : (state,page) => state.page = page,
  setNumber :(state,number) => state.number += number,
  addLesson :(state,data) => state.lesson.push(data)
}
