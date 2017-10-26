<template>
<div>
       <v-navigation-drawer v-model="slideNavRight"  persistent  height="100%" right>
               <v-text-field
              label="ค้นหาชื่อผู้ใช้ที่นี่"
              single-line
              append-icon="search"
              light
              hide-details
              full-width
             ></v-text-field>
                 <v-list two-line>
                           <template v-for="data in lastChat" >
                             <v-list-tile avatar @click.native="setChat(data)" @click="">
                               <v-list-tile-avatar>
                                 <img :src="data.avatar"></v-list-tile-avatar>
                               </v-list-tile-avatar>
                               <v-list-tile-content>
                                 <v-list-tile-title >{{data.fname}} {{data.lname}}</v-list-tile-title>
                                 <v-list-tile-sub-title>{{data.text}}</v-list-tile-sub-title>
                               </v-list-tile-content>
                               <v-list-tile-action>
                                  <v-list-tile-action-text>{{data.tstamp}}ี</v-list-tile-action-text>
                                </v-list-tile-action>
                             </v-list-tile>
                               <v-divider :inset ="true"></v-divider>
                           </template>
                         </v-list>
             </v-navigation-drawer>

  <v-toolbar class="white" dense standalone fixed-footer v-if="currentChat">
    <v-toolbar-title>
      <v-layout row>
        <v-flex xs3>
          <img :src="currentChat.avatar" width="30" height="30" class="mt-3">
        </v-flex>
        <v-flex xs12 class ="mt-3">
        <p class="grey--text" >&nbsp;&nbsp; {{currentChat.fname}} {{currentChat.lname}}</p>
        </v-flex>

      </v-layout>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon nuxt :to ="'/users/' + currentChat.user_id"><v-icon medium style="cursor:pointer">info_outline</v-icon></v-btn>
      <v-icon medium style="cursor:pointer">delete</v-icon>
    </v-toolbar-items>


       <v-toolbar-items>
         <v-toolbar-side-icon light @click.native.stop="slideNavRight = !slideNavRight"></v-toolbar-side-icon>

       </v-toolbar-items>

  </v-toolbar>


<template v-if="currentChat">
    <div id="mycontainer" style="height:75vh; background-color:white; overflow:scroll; overflow-x:hidden;" >
            <v-list two-line subheader v-for="(chat,index) in $store.getters.getCurrentChat(currentChat.user_id)" :key="index">
              <template v-if="chat.type == 'user'">
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img :src="currentChat.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{currentChat.fname}} {{currentChat.lname}} &nbsp;&nbsp; <span class="grey--text">{{chat.tstamp}}</span> </v-list-tile-title>
                        <v-list-tile-sub-title>{{chat.text}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <template v-else>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img :src="$store.getters.getAdminFromId(chat.admin_id)[0].avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{$store.getters.getAdminFromId(chat.admin_id)[0].name}} &nbsp;&nbsp; <span class="grey--text">{{chat.tstamp}}</span> </v-list-tile-title>
                        <v-list-tile-sub-title>{{chat.text}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
            </v-list>
    </div>
  <v-card>
  <v-text-field
  label="พิมพ์ข้อความ"
  single-line
  hide-details
  full-width
  @keyup.enter.native="sendMessage($event.target.value)"
  style="border: 1px black solid "
  ></v-text-field>
  </v-card>
</template>
</div>
<!-- <div class="text-xs-center" v-else>
  <br>
  <h3>เลือกคุยกับใครสักคนสิ</h3>
</div> -->

</div>
</template>
<script>
import chat from '../components/chat'
import { mapGetters } from 'vuex'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  async asyncData ({store}) {
    if (store.state.lastChat.length == 0) {
      await store.dispatch('pullLastChat')
    }
  },
  fetch ({store}) {
   store.commit('setPage', "การติดต่อสื่อสาร")
  },
  data() {
    return {
      slideNavRight: true,
      userChat: [],
      currentChat: false,
      chatMessage: []
    }
  },
  components: {
    chat
  },

  methods: {
    async setChat (val) {
      console.log('test: ' + val);
      await this.$store.dispatch('getChat', val.user_id)
      this.currentChat = val
      console.log('val: ' + JSON.stringify(val))
      console.log('getMessageChat: ' + this.getMessageChat(val.user_id));
      this.onBottom()
    },
    sendMessage (val) {
        let data = {
          admin_id: this.$store.state.adminData.admin_id,
          user_id: this.currentChat.user_id,
          text: val,
          tstamp: Vue.moment().format('YYYY-MM-DD HH:mm:ss'),
          avatar: this.$store.state.adminData.avatar,
          fname: this.$store.state.adminData.fname,
          lname: this.$store.state.adminData.lname,
          type: "admin"
        }
        let newD = ''
        newD = this.currentChat
        // let newData = this.currentChat
        // newData.text = val
        this.currentChat.adminText = val
        this.$store.commit('unshiftChat', newD)
        this.$store.dispatch('insertChat', data)
        this.onBottom()
        this.$socket.emit('toUser',data)
    },
    onBottom () {
      console.log('onBottom')
      setTimeout(()=>{
        var container = this.$el.querySelector('#mycontainer')
        container.scrollTop = container.scrollHeight
      }, 70)
    }
  },
  computed: {
    lastChat () {
      return this.$store.state.lastChat
    }
  }
}
</script>
<style>




</style>
