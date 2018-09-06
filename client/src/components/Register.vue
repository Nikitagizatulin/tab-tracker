<template>
    <div>
        <h1>Register</h1>
        <input
                type="email"
                name="email"
                placeholder="email"
                v-model="email"/>
        <br>
        <input
                type="password"
                name="password"
                placeholder="password"
                v-model="password"/>
        <br>
        <button type="button"
                @click.prevent="register">
            Register
        </button>
    </div>
</template>

<script>
import AutenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AutenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response)
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
