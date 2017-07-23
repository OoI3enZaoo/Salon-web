import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const getUserFromLocalStorage = () => {
  const json = localStorage.getItem("isLogin")
  return json
}
