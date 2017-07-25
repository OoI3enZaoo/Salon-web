<template>
<div>

  <v-container>
    <v-layout row wrap>
      <v-flex sm10 xs12>
        <v-select label="ค้นหาคอร์สที่สนใจ" v-bind:items="states" v-model="e7" multiple chips persistent-hint></v-select>
      </v-flex>
      <v-flex sm2 xs12>
        <v-btn icon class ="pink white--text"><v-icon >add</v-icon></v-btn><span>เพิ่มคอร์สใหม่</span>      
      </v-flex>


    </v-layout>





    <v-layout row wrap>
      <v-flex xs12 sm6>
        <h2 class="display-1">  คอร์สเจ้าของร้านทำผม</h2>
      </v-flex>
      <v-flex xs12 sm6>
        <div class="text-xs-right">
          <v-btn icon primary class="white--text display:inline">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn icon info class="white--text display:inline">
            <v-icon>mode_edit</v-icon>
          </v-btn>
          <v-btn icon error class="white--text display:inline">
            <v-icon>delete</v-icon>
          </v-btn>

        </div>
      </v-flex>
    </v-layout>

    <blockquote>Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant
      invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</blockquote>

    <div class="text-xs-right">
      <p style="display:inline">
        <v-icon>attach_money</v-icon> 2500</p>&nbsp;
      <p style="display:inline">
        <v-icon>shopping_cart</v-icon>50</p> &nbsp;
      <p style="display:inline">
        <v-icon>home</v-icon> 25</p>&nbsp;
    </div>

    <br>
    <v-divider></v-divider>
    <br>
    <v-layout row wrap>
      <template v-for="item in testCouses">
      <v-flex xs12 sm3>
        <nuxt-link tag ="span" type="span" :to="'/manage/hello/sawasdee_kub'" style ="cursor:pointer;" >
        <v-card class ="elevation-1">
          <img :src="item.img" width="100%" height="145">
          <v-card-title>
            <h6 class="grey.darken--text">{{item.title}}</h6>
          </v-card-title>
        </v-card>
        <br>
      </nuxt-link>
      </v-flex>
      </template>
    </v-layout>
    <br>
    <div class="text-xs-center">
      <v-pagination v-bind:length.number="4" v-model="page" circle></v-pagination>
    </div>








    <br>
    <v-divider></v-divider>
    <br>

    <v-layout row wrap>
      <v-flex xs6>
        <h2 class="display-1">  คอร์สเจ้าของร้านทำผม</h2>
      </v-flex>
      <v-flex xs6>
        <div class="text-xs-right">
          <v-btn icon primary class="white--text display:inline">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn icon info class="white--text display:inline">
            <v-icon>mode_edit</v-icon>
          </v-btn>
          <v-btn icon error class="white--text display:inline">
            <v-icon>delete</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <blockquote>Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant
      invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</blockquote>
    <div class="text-xs-right">
      <p style="display:inline">
        <v-icon>attach_money</v-icon> 2500</p>&nbsp;
      <p style="display:inline">
        <v-icon>shopping_cart</v-icon>50</p> &nbsp;
      <p style="display:inline">
        <v-icon>home</v-icon> 25</p>&nbsp;
    </div>

    <br>
    <v-divider></v-divider>
    <br>
    <v-layout row wrap>
      <template v-for="item in testCouses">
      <v-flex xs12 sm3>
        <nuxt-link tag ="span" type="span"  :to="'/manage/hello/sawasdee_kub'" style ="cursor:pointer;" >
        <v-card class ="elevation-1" >
          <img :src="item.img" width="100%" height="145">
          <v-card-title>
            <h6 class="grey.darken--text" >{{item.title}}</h6>
          </v-card-title>
        </v-card>
        </nuxt-link>
        <br>
      </v-flex>
      </template>
    </v-layout>
    <br>
    <div class="text-xs-center">
      <v-pagination v-bind:length.number="4" v-model="page" circle></v-pagination>
    </div>



  </v-container>
</div>
</template>
<script>
export default {
  //middleware : 'authenticated',
  data() {
    return {
      testCouses: [{
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        }
      ],
      e7: ['คอร์สเจ้าของร้านเสริมสวย', 'คอร์สร้านตัดผม', 'คอร์สช่างเสริมสวย', 'คอร์สผู้สนใจช่างเสริมสวย'],
      states: [
        'คอร์สเจ้าของร้านเสริมสวย', 'คอร์สร้านตัดผม', 'คอร์สช่างเสริมสวย', 'คอร์สผู้สนใจช่างเสริมสวย'
      ]


    }
  },
  beforeMount() {

    //do something after mounting vue instance
    if (JSON.parse(localStorage.getItem("isLogin")) == false) {
      this.$store.commit('islogin', false)
      this.$router.push('/')
    } else {
      this.$store.commit('islogin', true)
      this.$router.push('/manage')
      this.$store.commit('setPage', "Manage")
    }
  }
}
</script>
