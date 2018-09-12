<template>
    <v-layout row>
        <v-flex xs6 offset-xs3>
            <div class="white elevation-2">
                <v-toolbar flat dense class="cyan" dark>
                    <v-toolbar-title>Register</v-toolbar-title>
                </v-toolbar>
                <div class="pl-4 pr-4 pt-2 pb-2">
                    <v-text-field
                            label="Email address"
                            v-model="email"
                            name="email"
                    ></v-text-field>
                    <br>
                    <v-text-field
                            label="Password"
                            v-model="password"
                            name="email"
                    ></v-text-field>
                    <br>
                    <div v-html="error"
                         class="error">

                    </div>
                    <v-btn dark
                           class="cyan"
                           type="button"
                           @click.prevent="register">
                        Register
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
    async register () {
      try {
        await AutenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (err) {
        this.error = err.response.data.error
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
