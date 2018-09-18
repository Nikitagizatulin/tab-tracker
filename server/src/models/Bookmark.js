module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {})
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.Song, { foreignKey: 'song_id', foreignKeyConstraint: true })
  }
  return Bookmark
}
