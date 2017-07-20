<template>
  <div>

      <h2>{{message}}  {{$store.state.toolbar}}</h2>
  </div>
</template>
<script>
export default {

  name: "",

  data (){
    return {
      message : "message"
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.$store.commit('setToolbar',"Home")
      if(JSON.parse(localStorage.getItem("isLogin")) == false){
      console.log("falseeee");
      this.$store.commit('setLogin',false)
      this.$router.push('/')


    }else{
      console.log("trueeee");
      this.$store.commit('setLogin',true)
        this.$router.push('/home')

    }
    console.log(localStorage.getItem("isLogin"));
  }
}
</script>
