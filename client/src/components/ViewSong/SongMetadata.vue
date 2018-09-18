<template>
    <panel title="Song Metadata">
        <v-layout>
            <v-flex xs6>
                <div class="song-title">
                    {{song.title}}
                </div>
                <div class="song-artist">
                    {{song.artist}}
                </div>
                <div class="song-genre">
                    {{song.genre}}
                </div>
                <v-btn
                        dark
                        class="cyan"
                        :to="toEdit">
                    Edit
                </v-btn>
            </v-flex>
            <v-flex xs6>
                <img :src="song.albumImage"
                     alt="album-image"
                     class="album-image"/>
                <br>
                {{song.album}}
            </v-flex>
        </v-layout>
    </panel>
</template>
<script>
export default {
  props: ['song'],
  computed: {
    toEdit () {
      return {
        name: 'song-edit',
        params () {
          return {
            songId: this.song.id
          }
        }
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
