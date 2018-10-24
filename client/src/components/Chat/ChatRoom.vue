<template>
    <v-layout row wrap>
        <v-flex xs8 md6 offset-xs2 offset-md3>
            <panel title="Chat Room">
                <v-list two-line
                        v-chat-scroll
                        class="chat-body">
                    <template v-for="(item,index) in chats">
                        <v-list-tile
                                class="marginTopBottom"
                                :key="index"
                                avatar>
                            <v-layout
                                    row
                                    :reverse="item.nickname === getUserEmail">
                                <v-list-tile-avatar>
                                    <img src="/static/user-default.jpg">
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
                                            :class="item.nickname === getUserEmail ? 'text-xs-right' : ''">
                                        <div :class="item.nickname === getUserEmail ? 'chat-message-right' : 'chat-message-left'"
                                             class="fontForEmoji">
                                            {{ item.message}}
                                        </div>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-layout>
                        </v-list-tile>
                        <v-divider inset :key="index + item.nickname" />
                    </template>
                </v-list>
                <v-text-field
                        class="fontForEmoji"
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
                        @click:clear="clearMessage">
                    <picker @emoji="insert" :search="search"  slot="prepend">
                        <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events }" v-on="events">
                            <v-icon class="smileEmoji">insert_emoticon</v-icon>
                        </div>
                        <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                            <div class="emoji-picker">
                                <div class="emoji-picker__search">
                                    <input type="text" v-model="search" v-focus>
                                </div>
                                <div>
                                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                                        <h5>{{ category }}</h5>
                                        <div class="emojis">
                        <span
                                v-for="(emoji, emojiName) in emojiGroup"
                                :key="emojiName"
                                @click="insert(emoji)"
                                :title="emojiName"
                        >{{ emoji }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </picker>
                </v-text-field>
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
import { createNamespacedHelpers } from 'vuex'
import { EmojiPicker } from 'vue-emoji-picker'
const { mapGetters } = createNamespacedHelpers('authStore')

Vue.use(VueChatScroll)

export default {
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  components: {
    picker: EmojiPicker
  },
  name: 'chat-room',
  data () {
    return {
      search: '',
      chats: [],
      error: null,
      message: '',
      socket: io('http://localhost:8081', {
        query: {
          nickname: this.$store.getters['authStore/getUserEmail'],
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
    insert (emoji) {
      this.message += emoji
    },
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
    .fontForEmoji{
        font-family: Montserrat
    }
    .marginTopBottom{
        margin: 10px 0;
    }
    .chat-message-right{
        display: inline-block;
        background-color: #bff6e7;
        border-radius: 10px;
        padding: 1em;
        text-align: left;
        color: black;
        max-width: 65%;
        white-space: initial;
    }
    .chat-message-left{
        text-align: left;
        display: inline-block;
        background-color: #e7f1f6;
        border-radius: 10px;
        padding: 1em;
        color: black;
        max-width: 65%;
        white-space: initial;
    }
    .chat-body{
        overflow-y: scroll;
        max-height: 500px;
    }
    span{
        margin: 0 10px 0 10px;
        display:block;
    }
    .smileEmoji{
        cursor: pointer;
    }
    .emoji-picker{
        position: absolute;
        z-index: 1;
        top:0;
        transform: translateY(-100%);
        font-family: Montserrat;
        border: 1px solid #ccc;
        width: 15rem;
        height: 20rem;
        overflow: auto;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 0.5rem;
        background: #fff;
        box-shadow: 1px 1px 8px #c7dbe6;
    }
    .emoji-picker__search {
        display: flex;
    }
    .emoji-picker__search > input {
        flex: 1;
        border-radius: 10rem;
        width: 100%;
        border: 1px solid #ccc;
        padding: 0.5rem 1rem;
        outline: none;
        margin: 0;
    }
    .emoji-picker h5 {
        margin-top: 7px;
        margin-bottom: 7px;
        color: #b1b1b1;
        text-transform: uppercase;
        font-size: 0.8rem;
        cursor: default;
    }
    .emoji-picker .emojis {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .emoji-picker .emojis:after {
        content: "";
        flex: auto;
    }
    .emoji-picker .emojis span {
        padding: 0.2rem;
        cursor: pointer;
        border-radius: 5px;
    }
    .emoji-picker .emojis span:hover {
        background: #ececec;
        cursor: pointer;
    }
</style>
