<template>
<div>
  <v-app id="example-3">
    <div v-if="$store.getters.islogin">
      <v-navigation-drawer v-model="slideNavLeft" app  persistent enable-resize-watcher floating>
        <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-avatar> <img src="http://images.all-free-download.com/images/graphiclarge/nostalgic_blue_background_06_hd_pictures_169782.jpg"></v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{$store.state.adminData.fname}} {{$store.state.adminData.lname}}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{$store.state.adminData.email}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
        <v-list class="show-sm-only pa-0" dense>
          <template v-for="(item,i) in menuItem"  >
              <v-divider v-if="item.divider"> </v-divider>
          <v-list-tile :key="i" nuxt :to="item.link">
            <v-list-tile-action>

              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{item.title}}
            </v-list-tile-content>
          </v-list-tile>



          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app class="primary">

        <v-toolbar-side-icon dark @click.native.stop="slideNavLeft = !slideNavLeft" ></v-toolbar-side-icon>

        <v-toolbar-title>
          <div v-text="$store.getters.page" class="white--text text-xs-center"></div>
        </v-toolbar-title>
        <v-toolbar-items>
          <!-- <v-btn flat @click.native="slideNavRight = !slideNavRight">RightNav</v-btn>       -->
        </v-toolbar-items>
      </v-toolbar>

      <main>
        <v-content>
        <nuxt />
        </v-content>
      </main>
    </div>

    <div v-else>
      <main>
          <nuxt />
      </main>
    </div>

  </v-app>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {

  name: "example-3",

  data() {
    return {
      slideNavLeft: true,

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
          icon: "fa-sign-out",
          link: "/logout",
          divider : 'true'
        }
      ]
    }
  }

}
</script>
<style>

</style>
