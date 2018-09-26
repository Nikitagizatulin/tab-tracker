<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <song-metadata :song="song"/>
            </v-flex>
            <v-flex xs12 md6>
                <you-tube :youtubeId="song.youTubeId"/>
            </v-flex>
        </v-layout>

        <v-layout class="mt-3" row wrap>
            <v-flex xs12 md6>
                <tab :song="song"/>
            </v-flex>
            <v-flex xs12 md6>
                <lyric :song="song"/>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SongMetadata from './SongMetadata'
import Tab from './Tab'
import Lyric from './Lyric'
import SongService from '@/services/SongService'
import SongHistoryService from '../../services/SongHistoryService'

const YouTube = () => import('./YouTube')

export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongService.show(songId)).data
    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId
      })
    }
  },
  computed: {
    ...mapGetters(['isUserLoggedIn'])
  },
  components: {
    SongMetadata,
    YouTube,
    Lyric,
    Tab
  }
}
</script>
<style scoped>
</style>
