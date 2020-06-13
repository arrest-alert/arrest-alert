const Sequelize = require('sequelize')
const db = require('../db')

const Contact = db.define('contact', {
  number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  contactName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue:
      'This is a automated message from the Arrest Alert App. Based on location tracking, someone who listed you as an emergency contact may have been arrested.'
  }
})

module.exports = Contact
