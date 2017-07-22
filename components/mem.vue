<template>
  <v-card>
    <v-card-title>

      <!-- <v-select
             v-bind:items="states"
             v-model="search"
             label="ผู้ใช้ที่ซื้อคอร์สทั้งหมด"
             single-line
               multiple
             auto
             append-icon="map"
             hide-details
           ></v-select> -->

           <template v-for="(item,i) in checkboxItems">

           <v-checkbox v-model="search"  :value = "item" :label="item"> </v-checkbox>

          </template>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
          full-width



      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"




      >
      <template slot="items" scope="props">
        <td>
          <v-edit-dialog
            @open="props.item._name = props.item.name"
            @cancel="props.item.name = props.item._name || props.item.name"
            lazy
          >
          <img :src="profile"  height="40px" width="40px" style="width:50px;">&nbsp;&nbsp;&nbsp;{{ props.item.name }}

          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.sodium }}</td>
        <td class="text-xs-right">{{ props.item.calcium }}</td>

        <td class="text-xs-right">
          <v-layout row>
            <v-flex xs4>
              <v-btn icon><v-icon>chat_bubble</v-icon> </v-btn>
            </v-flex>
            <v-flex xs4>
            <nuxt-link :to="'/USERS/5'" tag="span" style="cursor:pointer">  <v-btn icon><v-icon>info</v-icon> </v-btn></nuxt-link>
            </v-flex>
          </v-layout>
        </td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>

    <!-- <div class="text-xs-center pt-2">
        <v-btn primary @click.native="toggleOrder">Toggle sort order</v-btn>
        <v-btn primary @click.native="nextSort">Sort next column</v-btn>
      </div> -->

  </v-card>
</template>
<script>
  export default {

    methods: {
      toggleOrder () {
        this.pagination.descending = !this.pagination.descending
      },
      nextSort () {
        let index = this.headers.findIndex(h => h.value === this.pagination.sortBy)
        index = (index + 1) % this.headers.length
        index = index === 0 ? index + 1 : index
        this.pagination.sortBy = this.headers[index].value
      }
    },
    data () {
      return {
        search: '',
        pagination: {},
        checkboxItems : ['เจ้าของร้านทำผม','ผู้ที่สนใจกิจการร้านทำผม','ผู้ช่วยช่าง','ช่างตัดผม','อีกอันนึง','มีอีกอันจำชื่อไม่ได้'],
         states: ['เจ้าของกิจการร้านทำผม','ผู้ที่สนใจกิจการร้านทำผม','ช่างตัดผม','ผู้ช่วยช่าง'],
         e2: [''],
         profile : 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Sodium (mg)', value: 'sodium' },
          { text: 'Calcium (%)', value: 'calcium' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
          },
          {
            value: false,
            name: 'ช่างตัดผม',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%'
          }
        ]
      }
    }
  }
</script>
