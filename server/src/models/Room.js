module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Room', {
    room_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  })
}
