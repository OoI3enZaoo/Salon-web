<template>
<v-app id="example-3">
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media height="150px" class="light-blue lighten-4--text">
          <h4 style="text-align:center; margin-top: 60px;" class="white--text">ยินดีต้อนรับสู่ระบบจัดการ Salon & Academy สำหรับผู้ดูแล</h4>
        </v-card-media>
        <v-card-title primary-title>
          <v-flex xs12 sm12>
            <v-text-field name="input-1" label="Email" id="testing"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field name="input-1" label="Password" id="testing"></v-text-field>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-btn class="light-blue white--text" style="width: 3000px" router to="/home">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-app>
</template>
<script>
export default {

  data: () => ({

  })
}
</script>
