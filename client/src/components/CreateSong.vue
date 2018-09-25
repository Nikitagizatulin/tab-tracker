<template>
    <v-layout>

        <v-flex xs4>
            <panel title="Song Metadata">
                <v-text-field
                        required
                        :rules="[
                        required,
                        maxLength255
                        ]"
                        label="Title*"
                        v-model="song.title"/>
                <v-text-field
                        required
                        :rules="[
                        required,
                        maxLength255
                        ]"
                        label="Artist*"
                        v-model="song.artist"/>
                <v-text-field
                        required
                        :rules="[
                        required,
                        maxLength255
                        ]"
                        label="Genre*"
                        v-model="song.genre"/>
                <v-text-field
                        required
                        :rules="[
                        required,
                        maxLength255
                        ]"
                        label="Album*"
                        v-model="song.album"/>
                <v-text-field
                        required
                        :rules="[
                        required,
                        maxLength255
                        ]"
                        label="AlbumImage*"
                        v-model="song.albumImage"/>
                <v-text-field
                        required
                        :rules="[
                        required,
                        maxLength255
                        ]"
                        label="YouTubeId*"
                        v-model="song.youTubeId"/>
            </panel>
        </v-flex>

        <v-flex xs8>
            <panel title="Song Structure"
                   class="ml-2">
                <v-textarea
                        :rules="[
                        required,
                        maxLength1000
                        ]"
                        label="Lyrics*"
                        v-model="song.lyrics"
                ></v-textarea>
                <v-textarea
                        :rules="[
                        required,
                        maxLength1000
                        ]"
                        label="Tab*"
                        v-model="song.tab"
                ></v-textarea>
            </panel>
            <div class="danger-alert"
                  v-if="error">
                {{error}}
            </div>
            <v-btn
                    dark
                    class="cyan"
                    @click="create">
                Create Song
            </v-btn>
        </v-flex>

    </v-layout>
</template>
<script>
import SongService from '@/services/SongService'
export default {
  data () {
    return {
      required: value => !!value || 'Required.',
      maxLength255: v => (v && v.length <= 255) || 'Maximum length for this filed is 255 characters',
      maxLength1000: v => (v && v.length <= 5000) || 'Maximum length for this filed is 5000 characters',
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youTubeId: null,
        lyrics: null,
        tab: null
      },
      error: null
    }
  },
  methods: {
    async create () {
      this.error = null
      // check every value on song object and !!reduction to a logical type
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await SongService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
        this.error = 'Something went wrong, please reload the page and try again!'
      }
    }
  }
}
</script>
<style scoped>

</style>
