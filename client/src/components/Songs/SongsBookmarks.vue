<template>
    <panel title="Bookmarks">
        <v-data-table
                :headers="headers"
                :items="bookmarks"
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
import BookmarkService from '../../services/BookmarkService'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('authStore')

export default {
  data () {
    return {
      pagination: {
        sortBy: null
      },
      bookmarks: [],
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
    ...mapGetters(['isUserLoggedIn'])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarkService.index()).data
    }
  }
}
</script>
<style>

</style>
