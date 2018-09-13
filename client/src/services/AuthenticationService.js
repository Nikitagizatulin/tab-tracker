import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}

// how it works
// AuthenticateService.register({
// email: 'testing@mail.com',
// password: '123123'
// })
