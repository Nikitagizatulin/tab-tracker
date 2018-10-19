<template>
    <panel title="Recently Viewed Songs">
        <v-data-table
                :headers="headers"
                :items="histories"
                :pagination.sync="pagination">
            <template slot="items"
                      slot-scope="props">
                <td>{{ props.item.createdAt | dateToJs }}</td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.artist }}</td>
            </template>
        </v-data-table>
    </panel>
</template>
<script>
import { mapGetters } from 'vuex'
import SongHistoryService from '../../services/SongHistoryService'
export default {
  data () {
    return {
      pagination: {
        sortBy: null
      },
      histories: [],
      headers: [
        {
          align: 'center',
          text: 'Time',
          value: 'createdAt'
        },
        {
          align: 'center',
          text: 'Title',
          value: 'title'
        },
        {
          align: 'center',
          text: 'Artist',
          value: 'artist'
        }
      ]
    }
  },
  filters: {
    dateToJs (sqlDate) {
      return new Date(sqlDate).toString().slice(0, 24)
    }
  },
  computed: {
    ...mapGetters(['isUserLoggedIn'])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.histories = (await SongHistoryService.index()).data
    }
  }
}
</script>
<style>

</style>
