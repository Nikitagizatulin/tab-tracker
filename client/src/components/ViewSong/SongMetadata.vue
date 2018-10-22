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
                        v-if="isUserLoggedIn && userId===song.UserId"
                        dark
                        class="teal"
                        :to="toEdit">
                    Edit
                </v-btn>

                <v-btn
                        v-if="isUserLoggedIn"
                        :dark="!disabled"
                        :disabled="disabled"
                        class="teal"
                        @click="actionBookmark">
                    {{ bookmark ? 'Unset As Bookmark' : 'Set As Bookmark' }}
                </v-btn>

            </v-flex>
            <v-flex xs6>
                <img :src="song.albumImage || '/static/mucis-default.png'"
                     alt="album-image"
                     class="album-image"/>
                <br>
                {{song.album}}
            </v-flex>
        </v-layout>
    </panel>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import BookmarkService from '@/services/BookmarkService'
import _ from 'lodash'
const { mapGetters } = createNamespacedHelpers('authStore')
export default {
  data () {
    return {
      bookmark: null,
      songId: null,
      disabled: false
    }
  },
  props: ['song'],
  computed: {
    ...mapGetters(['isUserLoggedIn', 'userId']),
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
    actionBookmark: _.throttle(function () {
      this.disabled = true
      this.bookmark ? this.unsetBookmark() : this.setBookmark()
    }, 500),
    async setBookmark () {
      try {
        let result = (await BookmarkService.post({
          songId: this.songId
        })).data
        setTimeout(() => {
          this.bookmark = result
          this.disabled = false
        }, 500)
      } catch (err) {
        console.log(err)
      }
    },
    async unsetBookmark () {
      try {
        await BookmarkService.delete(this.bookmark.id)
        setTimeout(() => {
          this.bookmark = null
          this.disabled = false
        }, 500)
      } catch (err) {
        console.log(err)
      }
      // this.disabled = false
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
