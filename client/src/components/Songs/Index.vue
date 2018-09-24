<template>
    <v-layout row>
        <v-flex xs6 v-if="isUserLoggedIn">
            <songs-bookmarks />
            <recently-viewed-songs class="mt-2" />
        </v-flex>
        <v-flex :class="rightPanel" class="ml-2">
            <songs-search-panel />
            <songs-panel class="mt-2"/>
        </v-flex>
    </v-layout>
</template>
<script>
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isUserLoggedIn']),
    rightPanel () {
      return this.isUserLoggedIn ? 'xs6' : 'xs12'
    }
  },
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  }
}
</script>
<style scoped>
</style>
