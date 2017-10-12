<template>
  <div>
    <v-container grid-list-lg>
      <v-layout wrap row>
        <v-flex xs12>
            <v-card>
              <v-card-text>
                <v-layout>
                  <v-flex xs2>
                    <v-avatar size="80px">
                      <img :src="course.avatar" alt="avatar" >
                    </v-avatar>
                  </v-flex>
                  <v-flex xs8>
                    <p class="headline">{{course.title}}</p>
                    <p>คอร์สโดย {{course.fname}} {{course.lname}}</p>
                    <p>ราคาที่ขาย {{course.price}}</p>
                  </v-flex>
                  <v-flex text-xs-right>
                    <v-btn icon dark color="primary"><v-icon>edit</v-icon></v-btn>
                  </v-flex>
                </v-layout>
                <iframe width="650" height="400" :src="course.youtube"> </iframe>
              </v-card-text>

              <v-card-text>
                <p class="headline info--text">เนื้อหารายละเอียด</p>
                <p v-html="course.description"></p>
                <v-layout><v-flex text-xs-right>
                  <v-btn dark color="primary">บันทึก</v-btn>
                </v-flex></v-layout>
              </v-card-text>
            </v-card>

        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>
<script>
export default {
  props: ['course']
}
</script>
