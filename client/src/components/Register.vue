<template>
    <v-layout row>
        <v-flex xs6 offset-xs3>
            <panel title="Register">
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
                       @click.prevent="register">
                    Register
                </v-btn>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import AutenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
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
        const response = await AutenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (err) {
        this.error = this.error = err.response.data.error || 'Something went wrong! Please reload the page.'
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .error{
        color: red;
    }
</style>
