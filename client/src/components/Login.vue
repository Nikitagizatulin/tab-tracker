<template>
    <v-layout row>
        <v-flex xs6 offset-xs3>
            <div class="white elevation-2">
                <v-toolbar flat dense class="cyan" dark>
                    <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <div class="pl-4 pr-4 pt-2 pb-2">
                    <form name="tab-tracker-form"
                          autocomplete="off">
                        <v-text-field
                                label="Email address"
                                v-model="email"
                                autocomplete="username"
                        ></v-text-field>
                        <br>
                        <v-text-field
                                label="Password"
                                v-model="password"
                                type="password"
                                autocomplete="new-password"
                        ></v-text-field>
                    </form>
                    <br>
                    <div v-html="error"
                         class="error">

                    </div>
                    <v-btn dark
                           class="cyan"
                           type="button"
                           @click.prevent="login">
                        Login
                    </v-btn>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import AutenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AutenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (err) {
        console.log(err)
        this.error = err
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .error{
        color: red;
    }
</style>
