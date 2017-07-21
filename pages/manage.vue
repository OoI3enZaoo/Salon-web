<template>
  <div>



  </div>
</template>
<script>


export default {

  name: "",

  mounted() {
      //do something after mounting vue instance
        if(JSON.parse(localStorage.getItem("isLogin")) == false){
        this.$store.commit('setLogin',false)
        this.$router.push('/')
        }else{
        this.$store.commit('setLogin',true)
          this.$router.push('/manage')
          this.$store.commit('setPage',"Manage")
      }
    }
}
</script>
