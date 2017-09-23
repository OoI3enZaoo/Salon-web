export default function ({store,isServer,req,route,redirect}){
  if (isServer && !req) return
  console.log('islogin: ' + store.getters.islogin)

  if (store.getters.islogin == false) {
    if (route.path != '/') {
      redirect('/')
    }
  } else {
    if (route.path == '/') {
      redirect('/home')
    }
  }
  if (store.state.admin.length == 0) {
    store.dispatch('pullAdmin')
  }
  if (store.state.member.length == 0) {
    store.dispatch('getMember')
  }
}
