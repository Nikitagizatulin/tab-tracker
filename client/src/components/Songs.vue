<template>
    <v-layout row>
        <v-flex xs6 offset-xs3>
            <panel title="Songs">
                <v-btn
                        slot="action"
                        @click="navigateTo({name: 'song-create'})"
                        fab
                        class="cyan accens-2"
                        light
                        medium
                        absolute
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
                                    class="cyan"
                                    @click="navigateTo({
                                    name:'song',
                                    params: {
                                        songId: song.id
                                        }
                                     })">
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
        </v-flex>
    </v-layout>
</template>
<script>
import Panel from '@/components/Panel'
import SongService from '@/services/SongService'
export default {
  data () {
    return {
      songs: null
    }
  },
  components: {
    Panel
  },
  async mounted () {
    this.songs = (await SongService.index()).data
    console.log(this.songs)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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
