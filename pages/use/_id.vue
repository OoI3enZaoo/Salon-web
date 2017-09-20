<template>
  <div>
    <h2>hekki</h2>
    {{user}}
    <v-text-field
    type="number"
    v-model="myNumber"
    >

    </v-text-field>
    Number >> {{myNumber}}
    <br>
    <nuxt-link :to="'/use/'+myNumber">
      <v-btn>dfd</v-btn>
    </nuxt-link>

  </div>
</template>
<script>

export default {
  async asyncData ({params, error, payload}) {
    if (payload) return { user: payload }
    else return { user: 'not found'}
  },
  data () {
    return {
      myNumber: 5
    }
  }
}
</script>
