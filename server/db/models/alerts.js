const Sequelize = require('sequelize')
const db = require('../db')

const Alert = db.define('alert', {
  //userID,
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('pending', 'sent', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false
  }
})

module.exports = Alert
