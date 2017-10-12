<template>
  <div>

          <v-parallax :src="src" :height="height">
            <template v-if="position == 'center'">
                <v-layout column align-center justify-center>
                  <slot></slot>
                </v-layout>
            </template>
            <template v-else>
                <v-layout >
                  <v-container>
                    <slot></slot>
                  </v-container>
                </v-layout>
            </template>
          </v-parallax>

  </div>
</template>
<script>
export default {
  props: ['src', 'position', 'height']
}
</script>
