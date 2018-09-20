<template>
    <v-layout row>
        <v-flex xs6>
            <songs-bookmarks />
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

export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks
  }
}
</script>
<style scoped>
</style>
