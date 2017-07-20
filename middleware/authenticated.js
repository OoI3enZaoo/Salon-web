export default function ({ store, redirect }) {
  if (store.getters.isLogin == false) {
    return redirect('/')
  }else{
  //  return redirect('/home')
  }
}
