<template>
    <v-layout row>
        <v-flex xs6>
            <songs-bookmarks />
            <recently-viewed-songs class="mt-2" />
        </v-flex>
        <v-flex xs6 class="ml-2">
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

export default {
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
