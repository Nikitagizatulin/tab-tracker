<template>
    <panel title="Search">
        <v-text-field
                label="Search song by title, artist, album or genre"
                v-model="search" />
    </panel>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function () {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    // immediate it's mean what callback started after watcher start watching
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>
<style scoped>

</style>
