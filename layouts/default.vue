<template>
  <div>
  <v-app id="example-3">
    <v-navigation-drawer v-model ="slideNav" persistent absolute v-show="this.isLogin">
      <v-list class="show-sm-only">
        <v-list-tile v-for="(item,i) in menuItem" :key="i" router :to="item.link" >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class ="primary" v-show="this.isLogin">
      <v-toolbar-side-icon @click.native.stop="slideNav = !slideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <div v-text= "$store.state.toolbar" class ="white--text"></div>
      </v-toolbar-title>
      <v-toolbar-items>

      </v-toolbar-items>
    </v-toolbar>

        <main>
          <v-container>
              <nuxt />
          </v-container>
        </main>
  </v-app>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "example-3",
  data (){
    return {
        slideNav : true,
      menuItem : [
        {title : "แผงควบคุม" , icon : "dashboard" , link : "/home" },
          {title : "การติดต่อสื่อสาร" , icon : "message" , link : "/message" },
            {title : "รายชื่อสมาชิก" , icon : "list" , link : "/member" },
            {title : "การจัดการ" , icon : "insert_invitation" , link : "/manage" },
            {title : "ลงชื่อออก" , icon : "insert_invitation" , link : "/logout" }
            ]
          }
        },
        computed :{
          ...mapGetters([
            'isLogin'
          ])

        }
}
</script>
