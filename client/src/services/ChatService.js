import Api from '@/services/Api'

export default {
  allRoom () {
    return Api().get('room')
  },
  addRoom (params) {
    return Api().post('room', params)
  },
  showRoom (id) {
    return Api().get(`room/${id}`)
  },
  createChat (params) {
    return Api().post('chat', params)
  },
  getChat (id) {
    return Api().get(`chat/${id}`)
  }
}
