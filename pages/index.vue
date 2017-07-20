<template>
<v-app>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media height="150px" class="primary lighten-4--text">
          <h4 style="text-align:center; margin-top: 60px;" class="white--text">ยินดีต้อนรับสู่ระบบจัดการ Salon & Academy สำหรับผู้ดูแล</h4>
        </v-card-media>
        <v-card-title primary-title>
          <v-flex xs12 sm12>
            <v-text-field name="input-1" label="Email" id="testing" v-model="user.username"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field name="input-1" label="Password" id="testing" v-model="user.password" @keyup.enter.native="Login"></v-text-field>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-btn primary style="width: 3000px" @click.native="Login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-app>
</template>
<script>
export default {
  // middleware :  'authenticated2',
  data: () => ({
    user: {
      username: '',
      password: ''
    }
  }),
  mounted(){
    // const isLogin = localStorage.getItem("isLogin")
    // this.$store.commit('setLogin',isLogin)
    // console.log("localStorage: " + isLogin);
    // console.log("isLogin: " + this.$store.getters.isLogin);
    // if(isLogin == true){
    //     this.$router.push('/home')
    //   }else{
    //       this.$router.push('/')
    //   }

    if(JSON.parse(localStorage.getItem("isLogin")) == false){
      this.$store.commit('setLogin',false)
      this.$router.push('/')
      console.log("INDEX.vue>> false");
    }
    else{
      this.$store.commit('setLogin',true)
        this.$router.push('/home')
        console.log("INDEX.vue>> TRUE");
    }


  },
  methods: {
    Login() {
      if (this.user.username != '' && this.user.password != '') {
        this.axios.get('https://salon-b177d.firebaseio.com/adminUser.json')
          .then((response) => {
            let status = false
            let res = response.data
            for (let data in res) {
              console.log("data: " + JSON.stringify(res[data]));
              if (this.user.username == res[data].username && this.user.password == res[data].password) {
                status = true;
                console.log("status = true");
                break;
              }
            }
            if (status == true) {
              this.$store.commit('setLogin',true)
              localStorage.setItem('isLogin',true)
              console.log("localStorage: " + localStorage.getItem("isLogin"));
              this.$router.push('/home')
            } else {
              this.$swal({
                type: 'error',
                title: '<span class="title">เกิดข้อผิดพลาด!</span>',
                html: '<span class="text grey--text">ไม่มีผู้ใช้นี้ กรุณาลองใหม่อีกครั้งค่ะ</span>'
              })

            }
          })
      } else {
        this.$swal({
          type: 'error',
          title: '<span class="title">เกิดข้อผิดพลาด!</span>',
          html: '<span class="text grey--text">กรุณากรอกข้อมูลให้ครบถ้วนค่ะ</span>'
        })
      }
    }//login
  }
}
</script>
