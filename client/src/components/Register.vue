<template>
    <v-layout row>
        <v-flex xs6 offset-xs3>
            <panel title="Register">
                <form name="tab-tracker-form"
                      autocomplete="off">
                    <v-text-field
                            label="Email address"
                            required
                            :rules="[required]"
                            v-model="email"
                            autocomplete="username"
                    ></v-text-field>
                    <br>
                    <v-text-field
                            label="Password"
                            required
                            :rules="[required]"
                            v-model="password"
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
                       @click.prevent="register">
                    Register
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
    async register () {
      try {
        const response = await AutenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        this.error = this.error = err.response.data.error || 'Something went wrong! Please reload the page.'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
