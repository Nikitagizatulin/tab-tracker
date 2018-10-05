<template>
    <v-layout row wrap>
        <v-flex xs6 offset-xs3>
            <panel title="Chat Room">
                <v-list two-line>
                    <template v-for="(item, index) in chats">
                        <v-subheader
                                v-if="item.nickname"
                                :key="item.id"
                        >
                            {{ item.nickname }}
                        </v-subheader>

                        <v-divider
                                v-else-if="item.divider"
                                :inset="item.inset"
                                :key="index"
                        ></v-divider>

                        <v-list-tile
                                v-else
                                :key="item.title"
                                avatar
                        >
                            <v-list-tile-avatar>
                                <img :src="item.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
                <v-textarea
                        label="Message"
                        v-model.trim="chat.message"
                ></v-textarea>
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
  name: 'chat-room',
  data () {
    return {
      chats: [],
      error: null,
      nickname: this.$route.params.nickname,
      chat: {}
    }
  },
  async mounted () {
    try {
      this.chats = (await ChatService.getChat(this.$route.params.id)).data
    } catch (e) {
      this.error = e.message
    }
  },
  methods: {
    logout (id) {
      this.$router.push({
        name: 'JoinRoom',
        params: { id: id }
      })
    },
    async onSubmit () {
      this.chat.room = this.$route.params.id
      this.chat.nickname = this.$route.params.nickname
      try {
        // let response = (await ChatService.get(this.chat)).data
        // this.$router.push({
        //   name: 'ChatRoom',
        //   params: { id: this.$route.params.id, nickname: response.data.nickname }
        // })
      } catch (e) {
        this.error = e.message
      }
    }
  }
}
</script>

<style>
</style>
