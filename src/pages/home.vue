<template>
  <div>
      <mynav>

            <h2>{{message}}</h2>
      </mynav>
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
  data (){
    return {
      message : "dfdf"
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.setToolbar("Home")
  }
}
</script>
