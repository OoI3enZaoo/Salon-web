<template>
<div>
    <h2>ลงชื่อออก....</h2>
</div>
</template>
<script>
export default {
  fetch({store}){
    store.commit('setPage','')
    store.commit('islogin',false)
  },
    beforeCreate() {
    this.$router.push('/')
  }
}
</script>
