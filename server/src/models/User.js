const Promise = require('bluebird')
// wrapper for calback function which returned byrcrypt
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SOLT_FACTOR = 8
  if (!user.changed('password')) {
    return
  }
  return bcrypt.genSaltAsync(SOLT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  User.prototype.comparePassword = function (pwd) {
    return bcrypt.compareAsync(pwd, this.password)
  }

  return User
}
