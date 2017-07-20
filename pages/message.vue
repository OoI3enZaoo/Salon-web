<template>
  <div>

      <h2>message</h2>

  </div>
</template>
<script>
import {mapActions} from 'vuex'


export default {

  name: "",
  methods: {
      ...mapActions([
        'setToolbar'
      ])
    },
  data: () => ({

  }),
  mounted() {
      //do something after mounting vue instance
      this.setToolbar("Message")
        if(JSON.parse(localStorage.getItem("isLogin")) == false){
        this.$store.commit('setLogin',false)
        this.$router.push('/')
      }else{
        this.$store.commit('setLogin',true)
          this.$router.push('/message')
      }
    }
}
</script>

</script>
