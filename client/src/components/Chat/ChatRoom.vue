<template>
    <v-layout row wrap>
        <v-flex xs8 md6 offset-xs2 offset-md3>
            <panel title="Chat Room">
                <v-list two-line
                        v-chat-scroll
                        class="chat-body">
                    <template v-for="(item,index) in chats">
                        <v-list-tile
                                :key="index"
                                avatar>
                            <v-layout
                                    row
                                    :reverse="item.nickname === getUserEmail">
                                <v-list-tile-avatar>
                                    <img src="../../assets/logo.png">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title
                                            :class="item.nickname === getUserEmail ? 'text-xs-right' : ''">
                                        <v-layout
                                                row
                                                :reverse="item.nickname === getUserEmail">
                                            <span class="subheading">{{item.nickname}}</span>
                                            <span class="caption grey--text">{{ item.createdAt | dateToJs }}</span>
                                        </v-layout>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title
                                            v-html="item.message"
                                            :class="item.nickname === getUserEmail ? 'text-xs-right' : ''" />
                                </v-list-tile-content>
                            </v-layout>
                        </v-list-tile>
                        <v-divider inset :key="index + item.nickname" />
                    </template>
                </v-list>
                <v-text-field
                        is="v-textarea"
                        :hint="typingMessage"
                        persistent-hint
                        multi-line
                        no-resize
                        height="100"
                        v-model.trim="message"
                        :append-outer-icon="message ? 'send' : ''"
                        box
                        autofocus
                        color="teal"
                        maxlength="255"
                        counter="255"
                        clear-icon="clear"
                        clearable
                        label="Message"
                        type="text"
                        @keyup.enter.prevent="onSubmit"
                        @click:append-outer="onSubmit"
                        @click:clear="clearMessage" />
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
      message: '',
      socket: io('http://localhost:8081', {
        query: {
          nickname: this.$store.getters.getUserEmail,
          room: this.$route.params.id
        }
      }),
      typing: {},
      timeout: [] // array of
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
      this.socket.on('new-message', data => {
        this.chats.push(data.message)
      })
      this.socket.on('typing', data => {
        this.$set(this.typing, data.name, data.message)
        if (this.timeout[data.name]) {
          clearTimeout(this.timeout[data.name])
        }
        this.timeout[data.name] = setTimeout(() => {
          this.$delete(this.typing, data.name)
        }, 2000)
      })
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
        RoomId: this.$route.params.id,
        nickname: this.getUserEmail,
        message: this.message,
        createdAt: new Date()
      })
      this.message = ''
    }
  },
  computed: {
    ...mapGetters(['getUserEmail']),
    typingMessage () {
      return Object.values(this.typing).join(' , ')
    }
  },
  watch: {
    message () {
      this.socket.emit('typing', this.getUserEmail)
    }
  },
  filters: {
    dateToJs (sqlDate) {
      return sqlDate ? new Date(sqlDate).toString().slice(0, 24) : ''
    }
  }
}
</script>

<style scoped>
    .chat-body{
        overflow-y: scroll;
        max-height: 500px;
    }
    span{
        margin: 0 10px 0 10px;
        display:block;
    }
</style>
