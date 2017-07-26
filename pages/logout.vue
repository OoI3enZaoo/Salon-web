<template>
<div>
    <h2>ลงชื่อออก....</h2>

</div>
</template>
<script>
export default {
  fetch({store}){
  store.commit('setPage','')
  store.commit('islogin',false)
  },
  beforeCreate() {
    //do something after mounting vue instance

     localStorage.setItem('isLogin',false)
    this.$router.push('/')


  }
}
</script>
