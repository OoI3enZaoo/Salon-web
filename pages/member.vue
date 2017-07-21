<template>
<div>
  <v-tabs dark v-model="active">
    <v-tabs-bar slot="activators" class="primary">
      <v-tabs-item v-for="(tab,i) in tabs" :key="i" :href="'#' + tab.name" ripple>
        {{tab.name}}
      </v-tabs-item>
      <v-tabs-slider class="yellow"></v-tabs-slider>
    </v-tabs-bar>

  </v-tabs>

  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
        <v-card>


          <v-list subheader>
            <v-subheader>ผู้ใช้ที่สมัครคอร์สทั้งหมด</v-subheader>
            <v-list-tile avatar v-for="item in items" v-bind:key="item.title">
              <v-list-tile-avatar>
                <img v-bind:src="item.avatar" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title><span class='grey--text text--darken-2'>Ali Connors</span></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-layout row>
                  <v-flex xs6>
                    <v-icon>chat_bubble</v-icon>
                  </v-flex>
                  <v-flex xs6>
                    <info></info>
                  </v-flex>
                </v-layout>


              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
import info from '../components/info.vue'
export default {
  components: {
    info
  },
  data() {
    return {
      tabs: [
        {name : "ผู้ที่สนใจคอร์สทั้งหมด"},
        {name : "เจ้าของร้านทำผม"},
        {name : "ช่างตัดผม"},
        {name : "ผู้ช่วยช่าง"},
        {name : "ผู้ที่สนใจกิจการร้านทำผม"}
      ],
      active: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      items: [{
          active: true,
          title: 'Jason Oner',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
        {
          active: true,
          title: 'Ranee Carlson',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
        {
          title: 'Cindy Baker',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
        {
          title: 'Ali Connors',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
      ],
      items2: [{
        title: 'Travis Howard',
        avatar: '/static/doc-images/lists/5.jpg'
      }, ]
    }
  },
  methods: {

  }
}
</script>
