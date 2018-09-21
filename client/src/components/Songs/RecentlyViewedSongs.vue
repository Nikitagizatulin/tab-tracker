<template>
    <panel title="Recently Viewed Songs">
        <v-data-table
                :headers="headers"
                :items="histories"
                :pagination.sync="pagination">
            <template slot="items"
                      slot-scope="props">
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
        sortBy: 'date',
        descending: true
      },
      histories: [],
      headers: [
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
  computed: {
    ...mapGetters(['isUserLoggedIn', 'userId'])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.histories = (await SongHistoryService.index({
        userId: this.userId
      })).data
    }
  }
}
</script>
<style>

</style>
