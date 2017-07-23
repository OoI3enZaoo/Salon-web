<template>
  <div>

<h2>Count {{$store.getters.number }}</h2>
    <v-btn @click.native ="$store.commit('setNumber',1)">+ </v-btn>
    <v-btn>- </v-btn>
  </div>
</template>
<script>


export default {
//middleware : 'authenticated',
  mounted() {
    console.log("islogin: " + this.$store.getters.islogin);
      console.log("cookie: "+document.cookie)
      //do something after mounting vue instance
        if(JSON.parse(localStorage.getItem("isLogin")) == false){
        this.$store.commit('islogin',false)
        this.$router.push('/')
        }else{
        this.$store.commit('islogin',true)
         this.$router.push('/manage')
          this.$store.commit('setPage',"Manage")
      }
    }
}
</script>
