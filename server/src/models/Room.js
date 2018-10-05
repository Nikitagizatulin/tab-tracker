module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Room', {
    room_name: DataTypes.STRING
  })
}
