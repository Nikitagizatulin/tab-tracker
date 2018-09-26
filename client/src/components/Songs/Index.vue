<template>
    <v-layout row wrap>
        <v-flex xs12 md6 v-if="isUserLoggedIn">
            <songs-bookmarks />
            <recently-viewed-songs class="mt-2" />
        </v-flex>
        <v-flex xs12 :class="rightPanel">
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
      return this.isUserLoggedIn ? 'md6' : 'md12'
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
