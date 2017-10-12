<template>
  <div>
    <v-container grid-list-lg>
      <div class="text-xs-right ">
        <v-btn color="primary">สร้างบทเรียน</v-btn>
      </div>
      <v-layout row wrap>
        <template v-for="data in lesson">
          <v-flex xs12 sm6 md4>
            <nuxt-link :to="'/manage/course/' + $route.params.course_id + '/' + data.lesson_id" tag="span" style="cursor:pointer;">
              <v-card>
                <v-card-media :src = "data.cover" height="200"></v-card-media>
                <v-card-title>{{data.title}}</v-card-title>
              </v-card>
            </nuxt-link>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    lesson () {
      return this.$store.getters.lessonFromCourseId(this.$route.params.course_id)
    }
  }
}
</script>
