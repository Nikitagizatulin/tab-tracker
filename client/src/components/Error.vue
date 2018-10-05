<template>
    <v-responsive>
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">The page was not found</h3>

                    <span class="subheading">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</span>

                    <v-divider class="my-3"></v-divider>

                    <div class="title mb-3">Please try the following:</div>
                    <v-card>
                        <v-list>
                            <v-list-tile v-for="(index, list) of lists"
                                         :key="index">
                                <v-list-tile-action>
                                    <v-icon color="teal">check</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="lists[list]"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>

                    <v-btn
                            class="mx-0"
                            color="teal"
                            large
                            dark
                            @click.prevent="back">
                        Back
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-responsive>
</template>
<script>
export default {
  data () {
    return {
      lists: [
        'Make sure that the Web site address displayed in the address that bar of your browser is spell and formatted correctly.',
        'If you reached this page by clicking a link, contact the Web site administrator to alert them that the link is incorrectly formatted.',
        'Click the back button to try another link.'
      ]
    }
  },
  methods: {
    back () {
      return window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
<style>
</style>
