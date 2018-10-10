<template>
    <v-layout row>
        <v-flex xs12 md6>
            <panel title="Profile">
                <v-avatar
                        :size="300"
                        color="black">
                    <img src="https://picsum.photos/510/300?random" alt="avatar">
                </v-avatar>
                <h2>{{getUserEmail}}</h2>
            </panel>
        </v-flex>
        <v-flex xs12 md6>
            <panel title="Edit Profile">
                <form>
                    <v-text-field
                            v-model="nickname"
                            :counter="10"
                            label="Name"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="email"
                            label="E-mail"
                            required
                    ></v-text-field>
                    <v-checkbox
                            v-model="checkbox"
                            value="1"
                            label="Option"
                            type="checkbox"
                            required
                    ></v-checkbox>

                    <v-btn @click="submit"
                           class="teal"
                           dark>submit</v-btn>
                    <v-btn @click="clear"
                           class="teal"
                           dark>clear</v-btn>
                </form>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      nickname: '',
      email: '',
      checkbox: '1'
    }
  },
  computed: {
    ...mapGetters(['getUserEmail'])
  },
  methods: {
    submit () {
      alert('Submit')
    },
    clear () {
      console.log(this.$v)
      alert('Clear')
    }
  }
}
</script>
<style scoped>
    .v-avatar img{
        border: 5px solid white;
        box-shadow: 0 0 0 2pt teal;
    }
</style>
