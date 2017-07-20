<template>
  <div>

      <h2>manage</h2>

  </div>
</template>
<script>


export default {

  name: "",
  data: () => ({

  }),
  mounted() {
      //do something after mounting vue instance
      this.$store.commit('setToolbar',"Manage")
        if(JSON.parse(localStorage.getItem("isLogin")) == false){
        this.$store.commit('setLogin',false)
        this.$router.push('/')
        }else{
        this.$store.commit('setLogin',true)
          this.$router.push('/manage')
      }
    }
}
</script>
