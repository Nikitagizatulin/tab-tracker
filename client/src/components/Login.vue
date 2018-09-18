<template>
    <v-layout row>
        <v-flex xs6 offset-xs3>
            <panel title="Login">
                    <form name="tab-tracker-form"
                          autocomplete="off">
                        <v-text-field
                                label="Email address"
                                v-model="email"
                                required
                                :rules="[required]"
                                autocomplete="username"
                        ></v-text-field>
                        <br>
                        <v-text-field
                                label="Password"
                                v-model="password"
                                required
                                :rules="[required]"
                                type="password"
                                autocomplete="new-password"
                        ></v-text-field>
                    </form>
                    <br>
                    <div v-html="error"
                         class="danger-alert">

                    </div>
                    <v-btn dark
                           class="cyan"
                           type="button"
                           @click.prevent="login">
                        Login
                    </v-btn>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import AutenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      required (value) {
        return !!value || 'Required.'
      },
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
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        this.error = err.response.data.error || 'Something went wrong! Please reload the page.'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
