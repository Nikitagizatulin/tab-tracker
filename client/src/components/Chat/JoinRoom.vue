<template>
    <v-layout row wrap>
        <v-flex xs6 offset-xs3>
            <panel title="Join Room : ">
                <v-chip v-if="room"
                        label
                        color="orange accent-4"
                        text-color="white"
                        slot="action">
                    <v-icon left>label</v-icon>
                    <b class="subheading">{{room.room_name}}</b>
                </v-chip>
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
                            v-model.trim="chat.nickname"
                            label="Enter Nickname"
                            required
                    ></v-text-field>
                    <v-btn  dark
                            class="teal"
                            @click.prevent="onSubmit">
                        Join
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
  name: 'join-room',
  data () {
    return {
      chat: {},
      error: null,
      room: null
    }
  },
  methods: {
    async onSubmit (evt) {
      this.chat.RoomId = this.$route.params.id
      this.chat.message = this.chat.nickname + ' join the room'
      try {
        let chat = (await ChatService.createChat(this.chat)).data
        console.log('chat object', chat)
        this.$router.push({
          name: 'chat-room',
          params: { id: this.$route.params.id, nickname: chat.nickname }
        })
      } catch (e) {
        this.error = e.message
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  async mounted () {
    this.room = (await ChatService.showRoom(this.$route.params.id)).data
  }
}
</script>
