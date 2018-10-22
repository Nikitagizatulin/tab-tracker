<template>
    <v-layout row>
        <v-flex xs10 md6 offset-xs1 offset-md3>
            <panel title="Login">
                <form name="tab-tracker-form"
                      autocomplete="off"
                      @keyup.enter="login">
                    <v-text-field
                            label="Email address"
                            v-model="email"
                            required
                            :rules="emailRequired"
                            autocomplete="username"
                    ></v-text-field>
                    <v-text-field
                            label="Password"
                            v-model="password"
                            required
                            :rules="passwordRequired"
                            type="password"
                            autocomplete="new-password"
                    ></v-text-field>
                </form>
                <br>
                <div v-html="error"
                     class="danger-alert">
                </div>
                <v-btn dark
                       class="teal"
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
  name: 'login',
  data () {
    return {
      emailRequired: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRequired: [
        v => !!v || 'Password is required',
        v => v.trim().length > 8 || 'Password must be more than 8 characters'
      ],
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
        this.$store.dispatch('authStore/setToken', response.data.token)
        this.$store.dispatch('authStore/setUser', response.data.user)
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
