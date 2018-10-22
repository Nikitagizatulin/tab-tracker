<template>
    <v-form ref="form" v-model="valid" lazy-validation>

        <v-layout row wrap>

            <v-flex xs12 md4>
                <panel title="Song Metadata">
                    <v-text-field
                            required
                            :rules="[
                        required,
                        maxLength255
                        ]"
                            label="Title*"
                            v-model.trim="song.title"/>
                    <v-text-field
                            required
                            :rules="[
                        required,
                        maxLength255
                        ]"
                            label="Artist*"
                            v-model.trim="song.artist"/>
                    <v-text-field
                            required
                            :rules="[
                        required,
                        maxLength255
                        ]"
                            label="Genre*"
                            v-model.trim="song.genre"/>
                    <v-text-field
                            :rules="[
                        maxLength255
                        ]"
                            label="Album"
                            v-model.trim="song.album"/>
                    <v-text-field
                            :rules="[
                        maxLength255
                        ]"
                            label="AlbumImage"
                            v-model.trim="song.albumImage"/>
                    <v-text-field
                            :rules="[
                        maxLength255
                        ]"
                            label="YouTubeId"
                            v-model.trim="song.youTubeId"/>
                </panel>
            </v-flex>

            <v-flex xs12 md8>
                <panel title="Song Structure">
                    <v-textarea
                            :rules="[
                        maxLength5000
                        ]"
                            label="Lyrics"
                            v-model.trim="song.lyrics"
                    ></v-textarea>
                    <v-textarea
                            :rules="[
                        maxLength5000
                        ]"
                            label="Tab"
                            v-model.trim="song.tab"
                    ></v-textarea>
                </panel>
                <v-alert
                        outline
                        transition="scale-transition"
                        :value="!valid || error"
                        type="error"

                >
                    {{error || 'Please fill in all the required fields.' | capitalize}}
                </v-alert>
                <v-btn
                        :disabled="!valid"
                        :dark="valid"
                        class="teal"
                        @click.prevent="create">
                    Create Song
                </v-btn>
            </v-flex>

        </v-layout>
    </v-form>
</template>
<script>
import SongService from '@/services/SongService'
export default {
  data () {
    return {
      required: value => !!value || 'Required.',
      maxLength255: v => !v || (!!v && v.trim().length <= 255) || 'Maximum length for this filed is 255 characters',
      maxLength5000: v => !v || (!!v && v.trim().length <= 5000) || 'Maximum length for this filed is 5000 characters',
      song: {
        title: '',
        artist: '',
        genre: '',
        album: '',
        albumImage: '',
        youTubeId: '',
        lyrics: '',
        tab: ''
      },
      error: null,
      valid: true
    }
  },
  methods: {
    async create () {
      if (this.$refs.form.validate()) {
        this.error = null
        try {
          await SongService.post(this.song)
          this.$router.push({
            name: 'songs'
          })
        } catch (err) {
          this.error = err.response ? err.response.data.error : 'Something went wrong, please reload the page and try again!'
        }
      }
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
<style scoped>

</style>
