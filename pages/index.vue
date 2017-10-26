<template >
<v-app style=" background-image:url('http://www.indietarot.com/wp-content/uploads/2014/07/indie-tarot-website-background2.jpg');  background-repeat: no-repeat;  background-size: cover; ">

  <v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div id="center">
      <v-card>

        <v-card-media src = "https://www.sketchappsources.com/resources/source-images-plus2/material-design-icon-patterns-2.png" height="150px" class="primary lighten-4--text">
          <v-card-text>
            <div class="text-xs-center" >
              <h6  class="white--text" style="margin-top: 60px;">ระบบจัดการ Salon & Academy</h6>
            </div>
          </v-card-text>
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


</div>
    </v-flex>
  </v-layout>

</v-container>
</v-app>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      defaultImage : ''
    }
  },
  methods: {
    Login () {
      if(this.user.password != '' || this.user.username != '') {
          axios.get('http://localhost:4000/api/checklogin/' + this.user.username + '/' + this.user.password)
          .then(res => {
            let result = res.data
            console.log(result);
            if (Object.keys(result).length == 1) {
              this.$store.commit('addAdminData', result[0])
              this.$store.commit('islogin', true)
              this.$router.push('/home')
            }
          })
          this.user.username = ''
          this.user.password = ''
        } else {
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
