<template>
    <v-layout row>
        <v-flex xs10 md6 offset-xs1 offset-md3>
            <panel title="Register">
                <form name="tab-tracker-form"
                      autocomplete="off">
                    <v-text-field
                            label="Email address"
                            required
                            :rules="emailRequired"
                            v-model="email"
                            autocomplete="username"
                    ></v-text-field>
                    <v-text-field
                            label="Password"
                            required
                            :rules="passwordRequired"
                            v-model="password"
                            type="password"
                            autocomplete="new-password"
                    ></v-text-field>
                    <v-text-field
                            label="Password Confirm"
                            required
                            :rules="passwordConfirmRequired"
                            v-model="passwordConfirm"
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
  name: 'register',
  data () {
    return {
      emailRequired: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRequired: [
        v => !!v || 'Password is required',
        v => v.length > 8 || 'Password must be more than 8 characters'
      ],
      passwordConfirmRequired: [
        v => !!v || 'Password confirm is required',
        v => (v === this.password) || 'Password not match'
      ],
      email: '',
      password: '',
      passwordConfirm: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AutenticationService.register({
          email: this.email,
          password: this.password,
          confirmPassword: this.passwordConfirm
        })
        this.$store.dispatch('authStore/setToken', response.data.token)
        this.$store.dispatch('authStore/setUser', response.data.user)
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
