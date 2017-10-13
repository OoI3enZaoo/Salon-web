<template>
  <div>
    <v-container grid-list-lg>
      <template v-if="userPurchase.length == 0">
        <v-layout>
          <v-flex xs12 text-xs-center>
            <v-card height="400px">
              <v-card-text>
                <div>
                    <v-layout row wrap style="padding-top:80px;">
                      <v-flex xs12 md3 offset-md3 >
                          <img src="https://www.wpclipart.com/people/baby/baby_faces/baby_sad.png" height="150">
                      </v-flex>
                      <v-flex xs12 md5 text-md-left text-xs-center mt-4>
                        <h5>ยังไม่มีใครซื้อคอร์สของคุณเลยนะ</h5>
                        <h6 class="grey.lighten-4--text">ลองปรับแต่งเนื้อหาคอร์สให้น่าสนใจหรือปรับราคาลงดูไหมล่ะ</h6>
                      </v-flex>
                    </v-layout>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
      <template v-else>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-text>
                  <v-list subheader>
                    <v-subheader>จำนวนคนที่ซื้อคอร์ส {{userPurchase.length}} คน</v-subheader>
                    <v-list-tile avatar v-for="(data,index) in userPurchase" :key="index" @click="">
                      <v-list-tile-avatar>
                        <img v-bind:src="data.avatar" />
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{data.fname}} {{data.lname}}</v-list-tile-title>
                        <v-list-tile-sub-title><span class='grey--text text--darken-2'>ซื้อคอร์สเมื่อ {{data.tstamp | moment('from','now',true)}}</span></v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-layout row>
                          <v-flex xs6>
                            <v-btn icon v-tooltip:top="{html : 'สนทนา'}">
                            <v-icon>chat_bubble</v-icon>
                          </v-btn>
                          </v-flex>
                          <v-flex xs6>
                          <nuxt-link :to="'/users/' + data.user_id" tag="span" style="cursor:pointer" v-tooltip:top="{html : 'รายละเอียด'}"><v-icon>info</v-icon></nuxt-link>
                          </v-flex>
                        </v-layout>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-flex>
      </v-layout>
    </template>
</v-container>
  </div>
</template>
<script>
export default {
  props: ['course'],
  computed: {
    userPurchase () {
      return this.$store.getters.courseLastPurchase(this.course.course_id)
    }
  }
}
</script>
