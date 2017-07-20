<template>

</template>
<script>
export default {
  mounted() {
    //do something after mounting vue instance
    localStorage.setItem('isLogin',false)
    this.$store.commit('setLogin',false)

      this.$router.push('/')
    console.log("Logout");

  }
}
</script>
