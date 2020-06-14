const router = require('express').Router()
const {User, Contact, Alert} = require('../db/models')
require('../../secrets')
const {Op} = require('sequelize')

const phoneNum = process.env.phoneNum

const authToken = process.env.TwilioAuthToken
const accountSid = process.env.TwilioAccountSid
const client = require('twilio')(accountSid, authToken)

function anonymous(location) {
  return client.messages
    .create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+12019285464',
      to: '+16035627796'
    })
    .then(message => console.log(message.sid))
}

function listenForAlerts() {
    // get time
    let past = new Date()
    past.setMinutes(past.getMinutes() - 1)


    Alert.findAll({
      attributes: ["id", "userId", "location"],
      where: {
        status: 'pending',
        createdAt: {[Op.lte]: past}
      }
    }).then(a => a.forEach(triggerMessageSend))
}



function triggerMessageSend(row) {
  // get contacts from db
  var name
  User.findOne({attributes: ['fullName'], where: {id: row.userId}}).then(x => {name = x.fullName})
  Contact.findAll({attributes: ['number', 'message'], where: {userId: row.userId}})
  .then(c => c.forEach(contact => {
    let message = contact.message + "\nname: " + name + "\nlocation: " + row.location
    send(contact.number, message)
    // console.log("MESSAGE => ", message)
  }))
  Alert.update({status: 'sent'}, {where: {id: row.id}}).then(x => x)
}

// helper function to actually send the message
function send(to, body) {
  client.messages
    .create({
      body,
      from: phoneNum,
      to
    })
    .then(message => console.log(message.sid))
}

module.exports = listenForAlerts
