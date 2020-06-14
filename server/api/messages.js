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
  //let t = true
  //while (t) {
    // get time
    let past = new Date()
    past.setMinutes(past.getMinutes() - 1)


    let alerts = Alert.findAll({
      attributes: ["id", "userId", "location"],
      where: {
        status: 'pending',
        createdAt: {[Op.lte]: past}
      }
    }).then(a => a.forEach(triggerMessageSend))
    console.log('ALERTS =>', alerts)
    //alerts.forEach(triggerMessageSend)

    //sleep(60000)
  //}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function triggerMessageSend(row) {
  // get contacts from db
  console.log("Row => ", row)
  console.log("Row USER ID => ", row.userId)
  let name = User.findOne({attributes: ['fullName'], where: {Id: row.userId}})
  let contacts = Contact.findAll({attributes: ['number', 'message'], where: {userId: row.userId}})
  .then(c => c.forEach(contact => {
    let message = contact.message + "name: " + name + "\nlocation: " + row.location
    send(contact.number, message)
  }))
  Alert.update({status: 'sent', where: {id: row.id}})

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
