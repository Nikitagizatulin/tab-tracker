module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: DataTypes.STRING
  })
  Chat.associate = function (models) {
    Chat.belongsTo(models.Room)
    Chat.belongsTo(models.User)
  }
  return Chat
}
