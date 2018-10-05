const AuthenticationController = require('./controller/AuthenticateController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongControllerPolicy = require('./policies/SongControllerPolicy')
const SongsController = require('./controller/SongsController')
const BookmarksController = require('./controller/BookmarksController')
const HistoriesController = require('./controller/HistoriesController')
const RoomController = require('./controller/RoomController')
const ChatController = require('./controller/ChatController')
const isAuthenticated = require('./policies/IsAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationControllerPolicy.login,
    AuthenticationController.login)

  app.get('/songs',
    SongsController.index)
  app.get('/songs/:songId',
    SongsController.show)
  app.put('/songs/:songId',
    isAuthenticated,
    SongControllerPolicy.createOrEdit,
    SongsController.put)
  app.post('/songs',
    isAuthenticated,
    SongControllerPolicy.createOrEdit,
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

  app.get('/room', RoomController.index)
  app.get('/room/:roomId', RoomController.show)
  app.post('/room', RoomController.post)

  app.get('/chat', ChatController.index)
  app.get('/chat/:chatId', ChatController.show)
  app.post('/chat', ChatController.post)

  require('./error')(app)
}
