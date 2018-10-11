<template>
    <v-layout row wrap>
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
                            v-model="fields.nickname"
                            :counter="50"
                            label="Nickname"
                            color="teal"
                    ></v-text-field>

                    <v-text-field
                            v-model="fields.lastName"
                            :counter="50"
                            label="Last Name"
                            color="teal"
                    ></v-text-field>

                    <v-text-field
                            v-model="fields.firstName"
                            :counter="50"
                            label="First Name"
                            color="teal"
                    ></v-text-field>

                    <v-layout row
                              wrap>

                        <v-flex xs11>
                            <v-slider
                                    v-model="fields.age"
                                    :rules="rules.age"
                                    color="teal"
                                    label="Age"
                                    hint="Be honest"
                                    persistent-hint
                                    min="1"
                                    max="100"
                                    thumb-label
                            ></v-slider>
                        </v-flex>

                        <v-flex xs1>
                            <v-text-field
                                    v-model="fields.age"
                                    class="mt-0"
                                    max="100"
                                    min="1"
                                    color="teal"
                                    type="number"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-text-field
                            v-model="fields.email"
                            label="E-mail"
                            color="teal"
                            :counter="50"
                    ></v-text-field>

                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <img :src="fields.imageUrl" height="150" v-if="fields.imageUrl"/>
                        <v-text-field label="Select Image"
                                      browser-autocomplete="username"
                                      @click='pickFile'
                                      v-model='imageName'
                                      color="teal"
                                      prepend-icon='attach_file'
                                      @click:prepend="pickFile"></v-text-field>
                        <input
                                type="file"
                                hidden
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                        >
                    </v-flex>

                    <v-divider/>

                    <v-text-field
                            label="Password"
                            :rules="rules.passwordRules"
                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                            v-model="fields.password"
                            :counter="50"
                            color="teal"
                            autocomplete="new-password"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                    ></v-text-field>

                    <v-text-field
                            label="Password Confirm"
                            :rules="rules.passwordConfirmRules"
                            :append-icon="show2 ? 'visibility_off' : 'visibility'"
                            v-model="fields.passwordConfirm"
                            color="teal"
                            :counter="50"
                            autocomplete="new-password"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"
                    ></v-text-field>

                    <v-btn @click="submit"
                           class="teal"
                           dark>submit</v-btn>
                    <v-btn @click="clear"
                           class="teal"
                           dark>clear</v-btn>
                </form>
            </panel>
        </v-flex>
        <v-flex md12>
            <v-progress-linear
                    color="teal"
                    :value="valOfProgress"
            ></v-progress-linear>
            <p>Progress to fill all of fields: {{valOfProgress}}%</p>
        </v-flex>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      fields: {
        lastName: '',
        firstName: '',
        nickname: '',
        age: '',
        email: '',
        imageUrl: '',
        password: '',
        passwordConfirm: ''
      },
      imageName: '',
      show1: false,
      show2: false,
      rules: {
        age: [
          val => !(val < 5 || val > 80) || `I don't believe you!`
        ],
        passwordRules: [
          v => v.length === 0 || v.length > 8 || 'Password must be more than 8 characters'
        ],
        passwordConfirmRules: [
          v => v === this.fields.password || 'Password not match'
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getUserEmail']),
    valOfProgress () {
      // count not null val * 100 / all count of fields
      return (_.size(_.pickBy(this.fields, value => value !== '')) * 100) / _.size(this.fields)
    }
  },
  methods: {
    submit () {
      alert('Submit')
    },
    clear () {
      this.imageName = ''
      this.fields.imageUrl = ''
      this.fields.nickname = ''
      this.fields.email = ''
      this.fields.password = ''
      this.fields.passwordConfirm = ''
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = (ev) => {
          console.log(ev)
          this.fields.imageUrl = fr.result
        }
      } else {
        this.imageName = ''
        this.fields.imageUrl = ''
      }
    },
    pickFile () {
      this.$refs.image.click()
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
