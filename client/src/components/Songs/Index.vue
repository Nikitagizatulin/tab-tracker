<template>
    <v-layout row>
        <v-flex xs6 offset-xs3>
            <songs-search-panel />
            <songs-panel class="mt-2"/>
        </v-flex>
    </v-layout>
</template>
<script>
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'

export default {
  components: {
    SongsPanel,
    SongsSearchPanel
  }
}
</script>
<style scoped>
</style>
