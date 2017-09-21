<template>
<div>
  admin >>>  {{$store.state.admin}}
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <boxPrice icon="attach_money" text="รายได้วันนีั" price="200" bgColor="light-green" ></boxPrice>
      <boxPrice icon="attach_money" text="รายได้อาทิตย์ที่ผ่านมา" price="1520" bgColor="deep-orange" ></boxPrice>
      <boxPrice icon="attach_money" text="รายได้เดือนที่ผ่านมา" price="6430" bgColor="amber" ></boxPrice>
      <boxPrice icon="attach_money" text="รายได้รวมทั้งหมด" price="43355" bgColor="purple" ></boxPrice>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-text>
            <lineGraph></lineGraph>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row wrap>
      <v-flex xs12 sm12 md5>
        <v-card>
          <v-card-title>
            <pieChart></pieChart>
          </v-card-title>
        </v-card>
        <br>
      </v-flex>
      <v-flex xs12 sm12 md7>

        <v-card>
          <v-list subheader>
            <v-subheader>คอร์สที่ถูกซื้อล่าสุด</v-subheader>
            <v-list-tile avatar v-for="(data,index) in lastPurchase" :key="index">
              <v-list-tile-avatar>
                <img v-bind:src="data.image" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{data.fname}} {{data.lname}}</v-list-tile-title>
                <v-list-tile-sub-title><span class='grey--text text--darken-2'>ซื้อคอร์ส {{data.title}} เมื่อ {{data.tstamp}}</span></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-layout row>
                  <v-flex xs6>
                    <v-btn icon v-tooltip:top="{html : 'สนทนา'}">
                    <v-icon>chat_bubble</v-icon>
                  </v-btn>
                  </v-flex>
                  <v-flex xs6>

                  <nuxt-link :to="'/users/' + data.user_id" tag="span" style="cursor:pointer" v-tooltip:top="{html : 'รายละเอียด'}"><v-icon>info</v-icon></nuxt-link>


                  </v-flex>
                </v-layout>


              </v-list-tile-action>
            </v-list-tile>
          </v-list>

        </v-card>

      </v-flex>
    </v-layout>


  </v-container>
</div>
</template>
<script>

import boxPrice from '../components/boxPrice.vue'
import pieChart from '../components/chart/pieChart.vue'
import lineGraph from '../components/chart/lineGraph.vue'
export default {
  fetch ({store}) {
   store.commit('setPage', "แผงควบคุม")
 },
 async asyncData ({ store }) {
   if (store.state.lastPurchase.length == 0) {
     await store.dispatch('lastPurchase')
   }
   if (store.state.historyPurchase.length == 0) {
     await store.dispatch('getHistoryPurchase')
   }
 },
 methods: {
   meta () {
       return {
         title: 'Vuetify',
         description: 'A Vue JS Framework',
         keywords: 'vue, vuetify'
       }
     }
 },
  components: {
    'pieChart': pieChart,
    'lineGraph': lineGraph,
    boxPrice
  },
  data() {
    return {
      message: "message"
    }
  },
  computed: {
    lastPurchase () {
      return this.$store.state.lastPurchase
    }
  },
  mounted() {

  }
}
</script>
