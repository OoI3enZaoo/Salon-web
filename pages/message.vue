<template>
<div>

       <v-navigation-drawer  v-model="slideNavRight"  persistent  height="100%" right>
               <v-text-field
              label="ค้นหาชื่อผู้ใช้ที่นี่"
              single-line
              append-icon="search"
              light
              hide-details
              full-width
             ></v-text-field>
                 <v-list two-line>
                           <template v-for="data in userChat" >
                             <v-list-tile avatar @click.native="setChat(data)">
                               <v-list-tile-avatar>
                                 <img :src="data.image"></v-list-tile-avatar>
                               </v-list-tile-avatar>
                               <v-list-tile-content>
                                 <v-list-tile-title >{{data.name}}</v-list-tile-title>
                                 <v-list-tile-sub-title>{{data.message}}</v-list-tile-sub-title>
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
          <img :src="currentChat.image" width="30" height="30" class="mt-3">
        </v-flex>
        <v-flex xs12 class ="mt-3">
        <p class="grey--text" >&nbsp;&nbsp; {{currentChat.name}}</p>
        </v-flex>

      </v-layout>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-icon medium style="cursor:pointer">info_outline</v-icon>
      <v-icon medium style="cursor:pointer">notifications_off</v-icon>
      <v-icon medium style="cursor:pointer">delete</v-icon>
    </v-toolbar-items>


       <v-toolbar-items>
         <v-toolbar-side-icon light @click.native.stop="slideNavRight = !slideNavRight"></v-toolbar-side-icon>

       </v-toolbar-items>

  </v-toolbar>


<template v-if="currentChat">
    <div id="mycontainer" style="height:80vh; background-color:white; overflow:scroll; overflow-x:hidden;" >
            <v-list two-line subheader v-for="(chat,index) in chatMessage" :key="index">
                  <template v-if="currentChat.room == chat.room">
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="chat.image">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{chat.name}} &nbsp;&nbsp; <span class="grey--text">{{chat.tstamp}}</span> </v-list-tile-title>
                            <v-list-tile-sub-title>{{chat.message}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                  </template>
            </v-list>
    </div>
  <v-card>
  <v-text-field
  label="พิมพ์ข้อความ"
  single-line
  light
  hide-details
  full-width
  @keyup.enter.native="sendMessage($event.target.value)"

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
export default {
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  fetch ({store}) {
   store.commit('setPage', "การติดต่อสื่อสาร")
  },
  data() {
    return {
      slideNavRight: true,
      userChat: [
        {"room":"fdgsdfdsf","message":"สวัสดีครับ","tstamp":"16/08/2017 17:15:00","image":"https://www.shareicon.net/download/2016/05/29/772558_user_512x512.png","name":"Ben","type":"user"},
        {"room":"-KrZTk-lCaBVZI2FH1d7","message":"แอดมินครับ","tstamp":"16/08/2017 17:15:00","image":"https://www.shareicon.net/download/2016/05/29/772558_user_512x512.png","name":"Max","type":"user"},
        {"room":"bebeb","message":"มีอะไรจะปรึกษา","tstamp":"16/08/2017 17:15:00","image":"https://www.shareicon.net/download/2016/05/29/772558_user_512x512.png","name":"Loft","type":"user"},
        {"room":"sdfsdfdsf","message":"สอบถามหน่อย","tstamp":"16/08/2017 17:15:00","image":"https://www.shareicon.net/download/2016/05/29/772558_user_512x512.png","name":"Au","type":"user"},
        {"room":"asdsese","message":"ครับ","tstamp":"16/08/2017 17:15:00","image":"https://www.shareicon.net/download/2016/05/29/772558_user_512x512.png","name":"Peet","type":"user"}
      ],
      currentChat: false,
      chatMessage: []
    }
  },
  components: {
    chat
  },
  mounted() {
    //do something after mounting vue instance
    this.$options.sockets.admin = (data) => {
      console.log("data: " + JSON.stringify(data))
      let check = 0
      for (let i =0; i< this.userChat.length; i++) {
        if(this.userChat[i].room == data.room) {
          console.log('user.room: ' + this.userChat[i].room + ' data.room: ' + data.room);
          console.log('true: inde: ' + i);
           this.userChat.splice(i,1)
           this.userChat.unshift(data)
          check = 1
          break;
        }
        else {
          console.log('false')
        }
      }
      if(check == 0){
        this.userChat.unshift(data)
      }
      this.chatMessage.push(data)
      setInterval(() => {
        this.scrollToEnd()
      }, 1)
    }
  },
  methods: {
    setChat (val) {
      console.log('test: ' + val);
      this.currentChat = val
    },
    sendMessage (val) {
      console.log('val: ' +val + ' currentChat: ' + this.currentChat.room)
        let data = {room: this.currentChat.room, message:val, tstamp: '16/08/2017 17:15:00', image: "https://upload.wikimedia.org/wikipedia/commons/9/96/User_icon-cp.png", "name": "Admin", "type": "admin"}
        console.log("data: " + JSON.stringify(data))
        this.chatMessage.push(data)
        this.$socket.emit('toUser',data)
    },
    scrollToEnd () {
      var container = this.$el.querySelector('#mycontainer')
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>
<style>




</style>
