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


       <v-navigation-drawer  v-model="slideNavRight" clipped persistent  height="100%" right>
               <v-text-field
              label="ค้นหาชื่อผู้ใช้ที่นี่"
              single-line
              append-icon="search"
              light
              hide-details
              full-width
             ></v-text-field>
                 <v-list two-line>
                           <template>
                             <v-list-tile avatar>
                               <v-list-tile-avatar>
                                 <img src="https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png"></v-list-tile-avatar>
                               </v-list-tile-avatar>
                               <v-list-tile-content>
                                 <v-list-tile-title >Brunch this weekend?</v-list-tile-title>
                                 <v-list-tile-sub-title><span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?</v-list-tile-sub-title>
                               </v-list-tile-content>
                               <v-list-tile-action>
                                  <v-list-tile-action-text>15 นาที</v-list-tile-action-text>
                                </v-list-tile-action>
                             </v-list-tile>
                               <v-divider :inset ="true"></v-divider>
                           </template>
                         </v-list>

             </v-navigation-drawer>

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

  
       <v-toolbar-items>
         <v-toolbar-side-icon light @click.native.stop="slideNavRight = !slideNavRight"></v-toolbar-side-icon>

       </v-toolbar-items>

  </v-toolbar>


    <div class="mainn flex parent">
    <div class = "sectionn">
      <template>
          <v-list subheader>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png"></v-list-tile-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title><span class='grey--text text--darken-2'>สวัสดีครับผม</span> </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
</v-list>
      </template>


    </div>
    <v-card>
    <v-text-field
   label="พิมพ์ข้อความ"
   single-line
   light
   hide-details
   full-width
  ></v-text-field>
  </v-card>
</div>







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

  data() {
    return {
      slideNavRight: true,

    }
  },
  mounted() {
    //do something after mounting vue instance
    if(JSON.parse(localStorage.getItem("isLogin")) == false){
    this.$store.commit('islogin',false)
    this.$router.push('/')
    }else{
      this.$store.commit('islogin',true)
      this.$router.push('/message')
      this.$store.commit('setPage',"Message")
  }
  }
}
</script>
<style>
.mainn{
width: 100%;
height: 600px;
max-height: 800px;
display: flex;
flex-flow: column nowrap;
}

.sectionn{
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

.textareaa{
width: 100%;
max-width: 100%;
}

</style>
