import Api from '@/services/Api'

export default {
  post (payload) {
    return Api().post(`profile`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
