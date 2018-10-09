<template>
    <v-layout row wrap>
        <v-flex xs12>
            <panel title="Room List">
                <v-btn
                        slot="action"
                        :to="{name: 'room-create'}"
                        fab
                        class="teal accens-2"
                        light
                        medium
                        absolute
                        right
                        dark
                        middle  >
                    <v-icon>add</v-icon>
                </v-btn>
                <v-data-table
                        :headers="fields"
                        :items="rooms"
                        :pagination.sync="pagination">
                    <template slot="items"
                              slot-scope="props">
                        <td>{{ props.item.room_name }}</td>
                        <td>{{ dateToJs(props.item.createdAt) }}</td>
                        <td>
                            <v-btn  @click.stop="joinRoom(props.item.id)"
                                    class="teal"
                                    dark>
                                Join
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
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
import { mapGetters } from 'vuex'
export default {
  name: 'rooms',
  data () {
    return {
      chat: {},
      pagination: {
        sortBy: null
      },
      fields: [
        { value: 'room_name', text: 'Room Name', align: 'center' },
        { value: 'createdAt', text: 'Created Date', align: 'center' },
        { value: 'actions', text: 'Action', sortable: false, align: 'center' }
      ],
      rooms: [],
      error: null
    }
  },
  async mounted () {
    this.rooms = (await ChatService.allRoom()).data
  },
  methods: {
    dateToJs (sqlDate) {
      return new Date(sqlDate).toString().slice(0, 24)
    },
    async joinRoom (id) {
      this.$router.push({
        name: 'chat-room',
        params: { id: id }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUserEmail'
    ])
  }
}
</script>
