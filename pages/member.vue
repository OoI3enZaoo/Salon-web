<template>
  <div>

      <h2>member</h2>

  </div>
</template>
<script>

export default {

  name: "",

  data: () => ({

  }),
  mounted() {
      //do something after mounting vue instance
        this.$store.commit('setToolbar',"Member")
          if(JSON.parse(localStorage.getItem("isLogin")) == false){
          this.$store.commit('setLogin',false)
          this.$router.push('/')
        }else{
          this.$store.commit('setLogin',true)
            this.$router.push('/member')
        }
    }
}
</script>
