<template>
<div>
  <!-- <v-tabs-bar slot="activators" class="elevation-5 accent" dense standalone fixed-footer>
      <span class="white--text">นายนานา (เจ้าของร้านทำผม)
        <v-icon medium style="cursor:pointer">info_outline</v-icon>


        <v-icon medium style="cursor:pointer">notifications_off</v-icon>


        <v-icon medium style="cursor:pointer" class ="pr-5">delete</v-icon>
      </span>
      </v-tabs-bar>

       -->
  <v-toolbar class="white" dense standalone fixed-footer>
    <v-toolbar-title>

      <v-layout row>
        <v-flex xs3>
          <img src="https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png" width="30" height="30" class="mt-3">

        </v-flex>
        <v-flex xs12 class ="mt-3">

        <p class="grey--text" >นายนานา (เจ้าของร้านทำผม)</p>
        </v-flex>

      </v-layout>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-icon medium style="cursor:pointer">info_outline</v-icon>
      <v-icon medium style="cursor:pointer">notifications_off</v-icon>
      <v-icon medium style="cursor:pointer">delete</v-icon>
    </v-toolbar-items>
  </v-toolbar>


    <mainn class="flex parent">
    <sectionn>
      <template>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png"></v-list-tile-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title><span class='grey--text text--darken-2'>สวัสดีครับผม</span> </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

      </template>



    </sectionn>
    <v-card>
    <v-text-field
   label="พิมพ์ข้อความ"
   single-line
   light
   hide-details
   full-width
  ></v-text-field>
  </v-card>
  </mainn>







  <!-- <v-card >

    <v-text-field
   label="พิมพ์ข้อความ"
   single-line

   light
   hide-details
   full-width
  ></v-text-field>
  </v-card> -->



</div>
</template>
<script>
export default {

  name: "",
  data() {
    return {
      slideNavRight: true,
      menuItem: [{
          title: "แผงควบคุม",
          icon: "dashboard",
          link: "/home"
        },
        {
          title: "การติดต่อสื่อสาร",
          icon: "message",
          link: "/message"
        },
        {
          title: "รายชื่อสมาชิก",
          icon: "list",
          link: "/member"
        },
        {
          title: "การจัดการ",
          icon: "insert_invitation",
          link: "/manage"
        },
        {
          title: "ลงชื่อออก",
          icon: "insert_invitation",
          link: "/logout"
        }
      ]
    }
  },
  mounted() {
    //do something after mounting vue instance

    if (JSON.parse(localStorage.getItem("isLogin")) == false) {
      this.$store.commit('setLogin', false)
      this.$router.push('/')
    } else {
      this.$store.commit('setLogin', true)
      this.$router.push('/message')
      this.$store.commit('setPage', "Message")
    }
  }
}
</script>
<style>
mainn{
width: 100%;
height: 600px;
max-height: 800px;
display: flex;
flex-flow: column nowrap;
}

sectionn{
width: 100%;
overflow-y: scroll;
flex: 1 auto;
height: 100%;
}

.inputt{
width: 100%;
flex: 0 0 auto;
background-color: green;
}

textareaa{
width: 100%;
max-width: 100%;
}

</style>
