import Api from '@/services/Api'

export default {
  allRoom () {
    return Api().get('room')
  },
  addRoom (params) {
    return Api().post('room', params)
  },
  checkRoom (id) {
    return Api().get(`room/${id}`)
  },
  getMessages (id) {
    return Api().get(`chat/${id}`)
  }
}
