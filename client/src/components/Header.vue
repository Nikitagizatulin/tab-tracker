<template>
    <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4"
                         @click="navigateTo({name:'home'})">
            <span class="pointer">TabTracker</span>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn flat
                   dark
                   @click="navigateTo({name: 'songs'})">
                Browse
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn v-if="!isUserLoggedIn"
                   flat
                   dark
                   @click="navigateTo({name:'login'})">
                Login
            </v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
            <v-btn v-if="!isUserLoggedIn"
                   flat
                   dark
                   @click="navigateTo({name:'register'})">
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
    navigateTo (route) {
      this.$router.push(route)
    },
    logOut () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style>
    .pointer{
        cursor: pointer;
    }
</style>
