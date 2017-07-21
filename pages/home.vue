<template>
  <div>
      <v-container fluid>
      <v-layout row  >
          <v-flex xs3>
              <v-card height = "100px" class ="green white--text">
                <v-card-text>

                  <!-- <v-layout row>
                        <v-flex xs3>
                            <div class="pa-2 pl-5">
                                <v-icon x-large dark >home</v-icon>
                            </div>
                        </v-flex>
                        <v-flex xs2>
                            <div class="pa-2 pl-5">
                                <h4 class ="white--text">565</h4><br>
                            </div>
                        </v-flex>
                          <p class ="pa-3 pt-5">สมาชิกทั้งหมด</p>

                  </v-layout> -->
    </v-card-text>
              </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card height = "100px" class ="red white--text">

            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card height = "100px" class ="grey white--text">

            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card height = "100px" class ="deep-purple white--text">

            </v-card>
          </v-flex>
      </v-layout>
<br>
      <v-layout row>
          <v-flex xs8>
              <v-card height = "300px">

              </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card height = "300px">

            </v-card>
          </v-flex>

      </v-layout>
      <br>
      <v-layout row>
          <v-flex xs12>
              <v-card height = "200px">

              </v-card>
          </v-flex>


      </v-layout>
</v-container>
  </div>
</template>
<script>
export default {

  name: "",

  data (){
    return {
      message : "message"
    }
  },
  mounted() {
    //do something after mounting vue instance

      if(JSON.parse(localStorage.getItem("isLogin")) == false){
      console.log("falseeee");
      this.$store.commit('setLogin',false)
      this.$router.push('/')


    }else{
      console.log("trueeee");
      this.$store.commit('setLogin',true)
        this.$router.push('/home')
        this.$store.commit('setPage',"Home")

    }
    console.log(localStorage.getItem("isLogin"));
  }
}
</script>
