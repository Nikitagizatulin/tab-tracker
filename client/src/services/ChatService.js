import Api from '@/services/Api'

export default {
  allRoom () {
    return Api().get('room')
  },
  addRoom (params) {
    return Api().post('room', params)
  },
  getMessages (id) {
    return Api().get(`chat/${id}`)
  }
}
