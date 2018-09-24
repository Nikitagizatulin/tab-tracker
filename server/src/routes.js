const AuthenticationController = require('./controller/AuthenticateController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controller/SongsController')
const BookmarksController = require('./controller/BookmarksController')
const HistoriesController = require('./controller/HistoriesController')
const isAuthenticated = require('./policies/IsAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.get('/songs',
    SongsController.index)
  app.get('/songs/:songId',
    SongsController.show)
  app.put('/songs/:songId',
    isAuthenticated,
    SongsController.put)
  app.post('/songs',
    isAuthenticated,
    SongsController.post)

  app.get('/bookmarks',
    isAuthenticated,
    BookmarksController.index)
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post)
  app.get('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete)

  app.get('/histories',
    isAuthenticated,
    HistoriesController.index)
  app.post('/histories',
    isAuthenticated,
    HistoriesController.post)
}
