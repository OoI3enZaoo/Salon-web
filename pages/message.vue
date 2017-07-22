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
  <chat></chat>







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
import chat from '../components/chat.vue'
export default {
  components: {
    chat
  },
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
