<template>
    <v-toolbar fixed class="teal" dark>
        <v-toolbar-title class="mr-4">
            <router-link
                    class="pointer"
                    tag="span"
                    :to="{name:'songs'}">
                TabTracker
            </router-link>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn flat
                   dark
                   :to="{name: 'songs'}">
                Songs
            </v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
            <v-btn flat
                   dark
                   :to="{name: 'rooms'}">
                Rooms
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn v-if="!isUserLoggedIn"
                   flat
                   dark
                   :to="{name:'login'}">
                Login
            </v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
            <v-btn v-if="!isUserLoggedIn"
                   flat
                   dark
                   :to="{name:'register'}">
                Sign Up
            </v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
            <v-btn v-if="isUserLoggedIn"
                   flat
                   dark
                   @click="logOut">
                Log Out
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['isUserLoggedIn'])
  },
  methods: {
    logOut () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'songs' })
    }
  }
}
</script>
<style>
    .pointer{
        cursor: pointer;
    }
</style>
