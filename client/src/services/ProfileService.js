import Api from '@/services/Api'

export default {
  get (id) {
    return Api().get(`profile/${id}`)
  },
  post (id) {
    return Api().put(`songs/${id}`, song)
  }
}
