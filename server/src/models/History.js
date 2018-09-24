module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {})
  History.associate = function (models) {
    History.belongsTo(models.Song)
    History.belongsTo(models.User)
  }
  return History
}
