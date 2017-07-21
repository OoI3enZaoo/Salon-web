<template>
  <div>

<v-container>
  <h3>dhef</h3>
</v-container>
  </div>
</template>
<script>
export default {
  mounted() {
    //do something after mounting vue instance
    console.log("test: " + this.$route.params.id);
  }
}
</script>
