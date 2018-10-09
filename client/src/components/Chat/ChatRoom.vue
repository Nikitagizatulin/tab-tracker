<template>
    <v-layout row wrap>
        <v-flex xs8 md6 offset-xs2 offset-md3>
            <panel title="Chat Room">
                <v-list two-line v-chat-scroll>
                    <template v-for="(item,index) in chats">
                        <v-list-tile
                                :key="index"
                                avatar
                        >
                            <v-list-tile-avatar>
                                <img src="../../assets/logo.png">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.nickname"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.message"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
                <v-text-field
                        v-model.trim="message"
                        :append-outer-icon="message ? 'send' : ''"
                        box
                        autofocus
                        color="teal"
                        counter="255"
                        clear-icon="clear"
                        clearable
                        label="Message"
                        type="text"
                        @keyup.enter.prevent="onSubmit"
                        @click:append-outer="onSubmit"
                        @click:clear="clearMessage"
                ></v-text-field>
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
import Vue from 'vue'
import * as io from 'socket.io-client'
import VueChatScroll from 'vue-chat-scroll'
import { mapGetters } from 'vuex'

Vue.use(VueChatScroll)

export default {
  name: 'chat-room',
  data () {
    return {
      chats: [],
      error: null,
      nickname: this.getUserEmail,
      message: '',
      socket: io('http://localhost:8081', {
        query: {
          nickname: this.$store.getters.getUserEmail,
          room: this.$route.params.id
        }
      })
    }
  },
  async mounted () {
    let connectErrorCount = 0
    this.socket.on('connect_error', () => {
      connectErrorCount++
      if (connectErrorCount >= 5) {
        this.error = 'Connect unstable. Please reload the page!'
      }
    })
    try {
      this.chats = (await ChatService.getMessages(this.$route.params.id)).data
      this.socket.on('new-message', function (data) {
        this.chats.push(data.message)
      }.bind(this))
    } catch (err) {
      this.error = err.response.data.error || 'Something went wrong! Please reload the page.'
    }
  },
  methods: {
    clearMessage () {
      this.message = ''
    },
    async onSubmit () {
      // send the message
      this.socket.emit('save-message', {
        room: this.$route.params.id,
        nickname: this.getUserEmail,
        message: this.message,
        created_date: new Date()
      })
      this.message = ''
    }
  },
  computed: {
    ...mapGetters(['getUserEmail'])
  }
}
</script>

<style>
</style>
