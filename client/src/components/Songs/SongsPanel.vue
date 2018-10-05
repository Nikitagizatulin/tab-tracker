<template>
    <panel title="Songs">
        <v-btn
                v-if="isUserLoggedIn"
                slot="action"
                :to="{name: 'song-create'}"
                fab
                class="teal accens-2"
                light
                medium
                absolute
                dark
                right
                middle  >
            <v-icon>add</v-icon>
        </v-btn>
        <div    class="song"
                v-for="song in songs"
                :key="song.id">

            <v-layout>
                <v-flex xs6>
                    <div class="song-title">
                        {{song.title}}
                    </div>
                    <div class="song-artist">
                        {{song.artist}}
                    </div>
                    <div class="song-ganre">
                        {{song.genre}}
                    </div>
                    <v-btn
                            dark
                            class="teal"
                            :to="{  name:'song',
                                    params: {
                                        songId: song.id
                                        }
                                     }">
                        View
                    </v-btn>
                </v-flex>
                <v-flex xs6>
                    <img :src="song.albumImage"
                         alt="album-image"
                         class="album-image" />
                </v-flex>
            </v-layout>

        </div>
    </panel>
</template>
<script>
import SongService from '@/services/SongService'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      songs: null
    }
  },
  computed: {
    ...mapGetters(['isUserLoggedIn'])
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongService.index(value)).data
      }
    }
  }
}
</script>
<style scoped>
    .song{
        padding: 20px;
        height: 330px;
        overflow: hidden;
    }
    .song-title{
        font-size:30px;
    }
    .song-artist{
        font-size:24px;
    }
    .song-ganre{
        font-size:18px;
    }
    .album-image{
        width: 70%;
        margin: 0 auto;
    }
</style>
