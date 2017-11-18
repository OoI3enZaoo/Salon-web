<template>
  <div>
<v-container>
    <v-data-table
     v-bind:headers="headers"
     v-bind:items="recommend"
     v-bind:search="search"
     v-bind:pagination.sync="pagination"
     hide-actions
     class="elevation-1"
   >
     <template slot="headerCell" scope="props">
       <v-tooltip bottom>
         <span slot="activator">
           {{ props.header.text }}
         </span>
         <span>
           {{ props.header.text }}
         </span>
       </v-tooltip>
     </template>
     <template slot="items" scope="props">
       <td><img :src="props.item.avatar" height="30px" > </td>
       <td>{{ props.item.fname }}</td>
       <td>{{ props.item.lname }}</td>
       <td>{{props.item.account_number}}</td>
       <td>{{ props.item.tstamp }}</td>
       <td>
         <v-switch @click.native="changeStatus(props.item.user_id, props.item.status)" color="red" v-model="props.item.status" dark></v-switch>
       </td>
     </template>
   </v-data-table>
   <div class="text-xs-center pt-2">
     <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
   </div>
</v-container>
  </div>
</template>
<script>
export default {
  async asyncData ({store}) {
    store.dispatch('pullRecommend')
  },
  fetch ({store}) {
   store.commit('setPage', "รายชื่อผู้แนะนำ")
 },
  data () {
    return {
      pagination: {},
      headers: [
        { value: 'avatar', sortable: false, },
        { text: 'ชื่อจริง', value: 'fname', align: 'left' },
        { text: 'นามสกุล', value: 'lname', align: 'left'  },
        { text: 'เลขบัญชี', value: 'account_number', align: 'left'  },
        { text: 'เวลา', value: 'tstamp', align: 'left' },
        { text: 'สถานะ', value: 'status', align: 'left' }
      ],
      search: ''
    }
  },
  computed: {
    recommend () {
      return this.$store.state.recommend[0]
    },
    recommend2 () {
      return this.$store.state.recommend
    },
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.$store.state.recommend.length / this.pagination.rowsPerPage) : 0
    }
  },
  methods: {
    changeStatus (user_id, status) {
      console.log('hello: ' + user_id + ' status: ' + status)
      const data = {
        user_id: user_id,
        status: status
      }
      this.$store.dispatch('setRecommend', data)
    }
  }
}
</script>
