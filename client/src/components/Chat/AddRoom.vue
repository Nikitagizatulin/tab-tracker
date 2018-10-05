<template>
    <v-layout row wrap>
        <v-flex xs6 offset-xs3>
            <panel title="Add Room">
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
                <v-form ref="form">
                    <v-text-field
                            id="room_name"
                            v-model.trim="room.room_name"
                            label="Enter Room Name"
                            required
                    ></v-text-field>
                    <v-btn  dark
                            class="teal"
                            @click.prevent="onSubmit">
                        create
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
            </panel>
            <div class="danger-alert"
                 v-if="error">
                {{error}}
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import ChatService from '@/services/ChatService'

export default {
  name: 'room-create',
  data: () => ({
    room: {},
    error: null
  }),
  methods: {
    async onSubmit () {
      try {
        await ChatService.addRoom(this.room)
        this.$router.push({
          name: 'rooms'
        })
      } catch (e) {
        this.error = e.message
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
