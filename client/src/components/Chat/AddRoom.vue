<template>
    <v-layout row wrap>
        <v-flex xs6 offset-xs3>
            <panel title="Add Room">
                <v-alert
                        outline
                        transition="scale-transition"
                        :value="error"
                        type="error"

                >
                    {{error | capitalize}}
                </v-alert>
                <v-btn flat
                       slot="action"
                       small
                       absolute
                       right
                       class="subheading"
                       color="white"
                       :to="{name: 'rooms'}">
                    <u>Room list</u>
                </v-btn>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            id="room_name"
                            v-model.trim="room"
                            label="Enter Room Name"
                            :rules="[chatName,length]"
                            required
                            @keyup.enter="onSubmit"
                    ></v-text-field>
                    <v-btn  class="teal"
                            :disabled="!valid"
                            :dark="valid"
                            @click.prevent="onSubmit">
                        create
                    </v-btn>
                    <v-btn @click.prevent="clear">clear</v-btn>
                </v-form>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import ChatService from '@/services/ChatService'

export default {
  name: 'room-create',
  data: () => ({
    chatName: v => !!v || 'Required',
    length: v => (v.trim().length >= 3 && v.trim().length <= 125) || 'Chat name must be min 3 length characters and max 125',
    room: '',
    error: null,
    valid: true
  }),
  methods: {
    async onSubmit () {
      if (this.$refs.form.validate()) {
        try {
          await ChatService.addRoom({room_name: this.room})
          this.$router.push({
            name: 'rooms'
          })
        } catch (e) {
          this.error = e.response ? e.response.data.error : e.message
        }
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
