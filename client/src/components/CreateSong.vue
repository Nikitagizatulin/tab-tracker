<template>
    <v-layout>

        <v-flex xs4>
            <panel title="Song Metadata">
                <v-text-field
                        required
                        :rules="[required]"
                        label="Title*"
                        v-model="song.title"/>
                <v-text-field
                        required
                        :rules="[required]"
                        label="Artist*"
                        v-model="song.artist"/>
                <v-text-field
                        required
                        :rules="[required]"
                        label="Genre*"
                        v-model="song.genre"/>
                <v-text-field
                        required
                        :rules="[required]"
                        label="Album*"
                        v-model="song.album"/>
                <v-text-field
                        required
                        :rules="[required]"
                        label="AlbumImage*"
                        v-model="song.albumImage"/>
                <v-text-field
                        required
                        :rules="[required]"
                        label="YouTubeId*"
                        v-model="song.youTubeId"/>
            </panel>
        </v-flex>

        <v-flex xs8>
            <panel title="Song Structure"
                   class="ml-2">
                <v-text-field
                        required
                        :rules="[required]"
                        label="Lyrics*"
                        multi-line
                        v-model="song.lyrics"/>
                <v-text-field
                        required
                        :rules="[required]"
                        label="Tab*"
                        multi-line
                        v-model="song.tab"/>
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
import Panel from '@/components/Panel'
import SongService from '@/services/SongService'
export default {
  components: {
    Panel
  },
  data () {
    return {
      required (value) {
        return !!value || 'Required.'
      },
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
      }
    }
  }
}
</script>
<style scoped>

</style>
