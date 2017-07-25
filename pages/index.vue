<template>
<v-app>
  <v-layout>

    <v-flex xs12 sm6 offset-sm3>


      <v-card>

        <v-card-media height="150px" class="primary lighten-4--text">
          <h6 style="text-align:center; margin-top: 60px;" class="white--text">ยินดีต้อนรับสู่ระบบจัดการ Salon & Academy สำหรับผู้ดูแล</h6>
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
          <v-btn primary style="width: 3000px" @click.native="Login">Login</v-btn>
        </v-card-actions>
      </v-card>

      <img :src="defaultImage" style="width: 300px;height: 300px">
          <VueImageUploadCroppie :defaultImage.sync="defaultImage" :height="300" :width="300"></VueImageUploadCroppie>


    </v-flex>
  </v-layout>

</v-app>
</template>
<script>


import {db} from '../util/firebase'

if (typeof window !== 'undefined') {
  const swal = require('sweetalert2');
}

import VueImageUploadCroppie from 'vue-image-upload-croppie'


let adminRef = db.ref('admin')

let series = db.ref('courses')
series.on('value',(snapshot) =>{
    snapshot.forEach((res)=>{
      let data = res.val();

      console.log("sold: " + Object.keys(data.sold).length);

    })
})
console.log("series: " + series);
adminRef.on('value', (snapshot)=>{
  console.log("child_added: " + JSON.stringify(snapshot.val()));
})
export default {
  firebase :{
    adminRef
  },
  components: {
    VueImageUploadCroppie
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
