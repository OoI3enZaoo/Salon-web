<template>
    <v-flex xs6 sm3>
      <v-card :class="bgColor">
        <v-card-text>
          <div class="text-xs-center">
            <p class="white--text headline" style="display:inline; padding-right:4px;">฿</p>
            <h5 class="white--text" style="display:inline;"><b>{{price}}</b></h5><br>
          </div>
          <div class="text-xs-center">
            <p class="white--text" style="display:inline;">{{text}}</p>
          </div>
        </v-card-text>
      </v-card>
      <br>
    </v-flex>
</template>
<script>
export default {
  props: ['icon','text','price','bgColor']
}
</script>
