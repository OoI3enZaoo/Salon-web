export const setUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
}
export const getUserFromLocalStorage = () => {
  const islogin = localStorage.get
  return islogin ? islogin : false
}
