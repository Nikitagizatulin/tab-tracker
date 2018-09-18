import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('songs', {
      params: { search }
    })
  },
  post (song) {
    return Api().post('songs', song)
  },
  show (id) {
    return Api().get(`songs/${id}`)
  },
  put (song) {
    return Api().put(`songs/${song.id}`, song)
  }
}
