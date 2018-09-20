import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('bookmarks', {
      params
    })
  },
  post (params) {
    return Api().post('bookmarks', params)
  },
  delete (bookmarkId) {
    return Api().get(`bookmarks/${bookmarkId}`)
  }
}
