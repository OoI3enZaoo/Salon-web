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

</script>
