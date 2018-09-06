import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}

// how it works
// AuthenticateService.register({
// email: 'testing@mail.com',
// password: '123123'
// })
