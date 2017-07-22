<template>
<div>
  <v-app id="example-3">

    <div v-if="this.isLogin">
      <v-navigation-drawer v-model="slideNavLeft" clipped persistent absolute height="100%">
        <v-card>
          <v-card-media class="white--text" src="http://images.all-free-download.com/images/graphiclarge/nostalgic_blue_background_06_hd_pictures_169782.jpg">
            <v-layout row>
              <v-flex xs2>
                <img src="https://www.thinkbusinessplan.com/img/user-icon.png" alt="ผู้ใช้" class="ma-4">
              </v-flex>
              <v-flex xs7>
                <br>
                <span class="ml-4">นายสมชาย น มงคล</span><br>
                <span class="ml-4">ผู้ดูแล</span>
              </v-flex>
            </v-layout>
          </v-card-media>
        </v-card>
        <v-list class="show-sm-only">
          <v-list-tile v-for="(item,i) in menuItem" :key="i" nuxt :to="item.link ">

            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{item.title}}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-navigation-drawer  v-model="slideNavRight" clipped persistent absolute height="100%" right>
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



      <v-toolbar class="primary">
        <v-toolbar-side-icon dark @click.native.stop="slideNavLeft = !slideNavLeft" ></v-toolbar-side-icon>
        <v-toolbar-title>
          <div v-text="this.page" class="white--text text-xs-center">d</div>
        </v-toolbar-title>
        <v-toolbar-items>
          <!-- <v-btn flat @click.native="slideNavRight = !slideNavRight">RightNav</v-btn>       -->
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-toolbar-side-icon dark @click.native.stop="slideNavRight = !slideNavRight"></v-toolbar-side-icon>

        </v-toolbar-items>
      </v-toolbar>



      <main>

          <nuxt />

      </main>
    </div>

    <div v-else>
      <main>
        <v-container>
          <nuxt />
        </v-container>
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
      slideNavRight: false,
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
  computed: {
    ...mapGetters([
      'isLogin', 'page'
    ])
  },

}
</script>
