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
                        v-if="isUserLoggedIn"
                        dark
                        class="cyan"
                        :to="toEdit">
                    Edit
                </v-btn>

                <v-btn
                        v-if="isUserLoggedIn && !bookmark"
                        dark
                        class="cyan"
                        @click="setBookmark">
                    Set As Bookmark
                </v-btn>

                <v-btn
                        v-if="isUserLoggedIn && bookmark"
                        dark
                        class="cyan"
                        @click="unsetBookmark">
                    Unset As Bookmark
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
import { mapGetters } from 'vuex'
import BookmarkService from '@/services/BookmarkService'

export default {
  data () {
    return {
      bookmark: null,
      songId: null
    }
  },
  props: ['song'],
  computed: {
    ...mapGetters(['isUserLoggedIn']),
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
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        this.songId = this.$route.params.songId
        const bookmark = (await BookmarkService.index({
          songId: this.songId
        })).data
        if (bookmark.length) {
          this.bookmark = bookmark[0]
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setBookmark () {
      try {
        this.bookmark = (await BookmarkService.post({
          songId: this.songId
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetBookmark () {
      try {
        await BookmarkService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
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
