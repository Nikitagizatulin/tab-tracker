module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    nickname: DataTypes.STRING,
    message: DataTypes.STRING
  })
  Chat.associate = function (models) {
    Chat.belongsTo(models.Room)
  }
  return Chat
}
