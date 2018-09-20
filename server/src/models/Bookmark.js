module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {})
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.Song)
    Bookmark.belongsTo(models.User)
  }
  return Bookmark
}
