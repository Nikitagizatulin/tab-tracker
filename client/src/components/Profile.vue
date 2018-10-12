<template>
    <v-layout row wrap>
        <v-flex xs12 md6>
            <panel title="Profile">
                <v-avatar
                        :size="300"
                        color="black">
                    <img src="https://picsum.photos/510/300?random" alt="avatar">
                </v-avatar>
                <p><span class="grey--text">Email:</span> {{getUserEmail}}</p>
            </panel>
        </v-flex>
        <v-flex xs12 md6>
            <panel title="Edit Profile">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="forms.nickname"
                            :rules="rules.names"
                            :counter="50"
                            label="Nickname"
                            color="teal"/>

                    <v-text-field
                            v-model="forms.firstName"
                            :counter="50"
                            :rules="rules.names"
                            label="First Name"
                            color="teal"/>

                    <v-text-field
                            v-model="forms.lastName"
                            :counter="50"
                            :rules="rules.names"
                            label="Last Name"
                            color="teal"/>

                    <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px">
                        <v-text-field
                                slot="activator"
                                v-model="forms.birthdate"
                                label="Birthday date"
                                prepend-icon="event"
                                color="teal"
                                readonly/>
                        <v-date-picker
                                ref="picker"
                                color="teal"
                                reactive
                                v-model="forms.birthdate"
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1950-01-01"
                                @change="save"/>
                    </v-menu>

                    <v-text-field
                            v-model="forms.email"
                            :rules="rules.emailRequired"
                            label="E-mail"
                            color="teal"
                            :counter="50"/>

                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <img :src="forms.imageUrl" height="150" v-if="forms.imageUrl"/>
                        <v-text-field label="Select Image"
                                      browser-autocomplete="username"
                                      @click='pickFile'
                                      v-model='imageName'
                                      color="teal"
                                      prepend-icon='attach_file'
                                      @click:prepend="pickFile"/>
                        <input
                                type="file"
                                hidden
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked">
                    </v-flex>

                    <v-text-field
                            label="Password"
                            :rules="rules.passwordRules"
                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                            v-model="forms.password"
                            :counter="50"
                            color="teal"
                            autocomplete="new-password"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"/>

                    <v-text-field
                            label="Password Confirm"
                            :rules="rules.passwordConfirmRules"
                            :append-icon="show2 ? 'visibility_off' : 'visibility'"
                            v-model="forms.passwordConfirm"
                            color="teal"
                            :counter="50"
                            autocomplete="new-password"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"/>

                    <v-btn @click="submit"
                           class="teal"
                           :disabled="!valid"
                           :dark="valid">submit</v-btn>
                    <v-btn @click="clear"
                           class="teal"
                           dark>clear</v-btn>
                </v-form>
            </panel>
        </v-flex>
        <v-flex md12>
            <v-progress-linear
                    color="teal"
                    :value="valOfProgress"/>
            <p>Progress to fill all of fields: {{valOfProgress}}%</p>
        </v-flex>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import _ from 'lodash'
import ProfileService from '@/services/ProfileService'

export default {
  data () {
    return {
      forms: {
        birthdate: '',
        lastName: '',
        firstName: '',
        nickname: '',
        email: '',
        imageUrl: '',
        password: '',
        passwordConfirm: ''
      },
      valid: true,
      menu: false,
      imageName: '',
      show1: false,
      show2: false,
      rules: {
        emailRequired: [
          v => v.length === 0 || /.+@.+/.test(v) || 'E-mail must be valid',
          v => v.length === 0 || (v.length > 4 && v.length < 50) || 'E-mail must be more then 4 characters and less 50'
        ],
        names: [
          v => v.length === 0 || (v.length >= 2 && v.length < 50) || 'This input must be more then 2 characters and less 50'
        ],
        passwordRules: [
          v => v.length === 0 || v.length > 8 || 'Password must be more than 8 characters'
        ],
        passwordConfirmRules: [
          v => v === this.forms.password || 'Password not match'
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getUserEmail']),
    valOfProgress () {
      // count not null val * 100 / all count of forms
      return (_.size(_.pickBy(this.forms, value => value !== '')) * 100) / _.size(this.forms)
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate()
    },
    clear () {
      this.imageName = ''
      this.forms.birthdate = ''
      this.forms.firstName = ''
      this.forms.lastName = ''
      this.forms.imageUrl = ''
      this.forms.nickname = ''
      this.forms.email = ''
      this.forms.password = ''
      this.forms.passwordConfirm = ''
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        console.log(files[0])
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = (ev) => {
          this.forms.imageUrl = fr.result
        }
      } else {
        this.imageName = ''
        this.forms.imageUrl = ''
      }
    },
    pickFile () {
      this.$refs.image.click()
    },
    save (date) {
      this.$refs.menu.save(date)
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
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
