<template>
<div>
    <h2>logout</h2>

</div>
</template>
<script>
export default {
  mounted() {
    //do something after mounting vue instance
     localStorage.setItem('isLogin',false)
      this.$store.commit('setLogin',false)

       this.$store.commit('setPage',"")
    //
       this.$router.push('/')
    console.log("Logout");

  }
}
</script>
