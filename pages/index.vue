<template >
<v-app style=" background-image:url('https://www.clipartsgram.com/image/1845233953-website-backgrounds-e280ab289855821e280ac-e280abe280ac.jpg');  background-repeat: no-repeat;  background-size: cover; ">

  <v-container >
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div id="center">
      <v-card>

        <v-card-media src = "https://www.sketchappsources.com/resources/source-images-plus2/material-design-icon-patterns-2.png" height="150px" class="primary lighten-4--text">
          <h6 style="text-align:center; margin-top: 60px;" class="white--text">ระบบจัดการ Salon & Academy</h6>
        </v-card-media>
        <v-card-title primary-title>
          <v-flex xs12 sm12>
            <v-text-field name="input-1" label="Email" id="testing" v-model="user.username"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field type ="password" name="input-1" label="Password" id="testing" v-model="user.password" @keyup.enter.native="Login"></v-text-field>
          </v-flex>
        </v-card-title>

        <v-card-actions>
<v-spacer></v-spacer>
          <v-btn primary  @click.native="Login">Login</v-btn>
        </v-card-actions>
      </v-card>

<vue-toastr ref="toastr"></vue-toastr>

</div>
    </v-flex>
  </v-layout>

</v-container>
</v-app>
</template>
<script>


import {db} from '../util/firebase'






let adminRef = db.ref('admin')

export default {
  firebase :{
    adminRef
  },



  data: () => ({
    user: {
      username: '',
      password: ''
    },
    defaultImage : ''
  }),
  watch :{

    // ref.on('child_added', function(childSnapshot, prevChildKey) {
    //
    // });
  },
  mounted(){

      // console.log("cookie: "+document.cookie)
      // console.log("Islogin: " +this.$store.getters.islogin);
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
      this.$store.commit('islogin',false)
      this.$router.push('/')
      console.log("INDEX.vue>> false");
    }
    else{
      this.$store.commit('islogin',true)
        this.$router.push('/home')
        console.log("INDEX.vue>> TRUE");
    }
  },
  methods: {
    Login(){
      console.log("Login2");

      if(this.user.password != '' || this.user.username != ''){

        adminRef.on('value' , (snapshot) => {
          snapshot.forEach((data)=>{
              let res = data.val()
              console.log("username: " + res.username + " password: " + res.password);
              if(this.user.username == res.username && this.user.password == res.password){
                console.log("true");
                  this.$store.commit('islogin',true)
                  localStorage.setItem('isLogin',true)
                  console.log("localStorage: " + localStorage.getItem("isLogin"));
                  this.$router.push('/home')
                return true
              }else{
                console.log("not found");
                this.$refs.toastr.e("ERRROR MESSAGE");
              }

          })

          })
        }else{
          console.log("enter");
        }
    }


  }
}
</script>
<style >
#center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
