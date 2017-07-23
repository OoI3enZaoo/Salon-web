
export default function ({store,redirect,isServer,req}){
  if (isServer && !req) return
  if(!store.getters.islogin){
      return redirect('/')
  }
}
