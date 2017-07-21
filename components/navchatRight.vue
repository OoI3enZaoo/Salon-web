<template>

    <v-navigation-drawer   v-model="slideNavRight" clipped persistent absolute height="100%" right>
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
                          <v-list-tile>
                            <v-list-tile-avatar>
                              <img src="https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png"></v-list-tile-avatar>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title >Brunch this weekend?</v-list-tile-title>
                              <v-list-tile-sub-title><span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                            <v-divider :inset ="true"></v-divider>
                        </template>
                      </v-list>

          </v-navigation-drawer>


</template>
<script>
export default {
  name: "",
  data: () => ({
    slideNavRight : false
  }),
  methods: {
    closeNav() {
      this.slideNavRight = false;
      this.$emit("closeNav")
    }
  }
}
</script>
