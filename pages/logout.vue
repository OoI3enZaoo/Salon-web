<template>
<div>
    <h2>logout2</h2>

</div>
</template>
<script>
export default {
  fetch({store}){
  //  store.commit('islogin',false)

  },
  mounted() {
    //do something after mounting vue instance
    this.$store.commit('setPage','')
     this.$store.commit('islogin',false)
     localStorage.setItem('isLogin',false)
    this.$router.push('/')


  }
}
</script>
