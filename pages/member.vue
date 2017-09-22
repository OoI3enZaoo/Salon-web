<template>
<div>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-layout row wrap>
                <v-flex xs11 sm11 lg9>
                        <v-text-field
                            label="ค้นหารายชื่อที่นี่"
                            class="input-group--focused ma-2"
                            prepend-icon="search"
                            v-model="searchModel"
                            single-line
                        >
                        </v-text-field>
                </v-flex>
          </v-layout>
          <v-list subheader >
            <v-subheader>ผู้ใช้ที่สมัครคอร์สทั้งหมด</v-subheader>
              <v-list-tile avatar v-for="(data,index) in memberAfterSearch" :key="index" @click="">
                <v-list-tile-avatar>
                  <img v-bind:src="data.image" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title> {{data.fname}} {{data.lname}}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-layout row>
                    <v-flex xs6>
                      <v-btn icon v-tooltip:top="{html : 'สนทนา'}">
                      <v-icon>chat_bubble</v-icon>
                    </v-btn>
                    </v-flex>
                    <v-flex xs6>
                    <nuxt-link :to="'/users/'+ data.user_id" tag="span" style="cursor:pointer" v-tooltip:top="{html : 'รายละเอียด'}"><v-icon>info</v-icon></nuxt-link>
                    </v-flex>
                  </v-layout>
                </v-list-tile-action>
              </v-list-tile>
          </v-list>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
export default {
  async asyncData({ store }) {
    if (store.state.member.length == 0) {
      await store.dispatch('getMember')
    }
    store.commit('setPage', 'รายชื่อสมาชิก')
  },
  mounted () {
    this.memberAfterSearch = this.member
    console.log('member: ' + JSON.stringify(this.$store.state.member))
  },
  computed: {
    member () {
      return this.$store.state.member
    }
  },
  data() {
    return {
      searchModel: '',
      memberAfterSearch: []
    }
  },
  watch: {
    searchModel: function (val) {
      this.search(val)
    },
    memberAfterSearch: function (val) {
      if (val.length == 0) {
        this.memberAfterSearch = this.member
      }
    }
  },
  methods: {
    search (val) {
      let vmData = []
      if (val == '') {
        this.memberAfterSearch = this.member
      } else {
        console.log('val: ' + val)
        this.memberAfterSearch = this.member
        this.memberAfterSearch.map(res => {
          let fname = res.fname
          let lname = res.lname
          let checkFname = fname.search(val)
          let checkLname = lname.search(val)
          if (checkFname !== -1) {
            vmData.push(res)
          }
          if (checkLname !== -1) {
            vmData.push(res)
          }
        })
        this.memberAfterSearch = vmData
      }
    }
  }
}
</script>
