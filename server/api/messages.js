const router = require('express').Router()
const {User, Contact} = require('../db/models')
require('../../secrets')

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

function triggerMessageSend(userID, location) {
  // get contacts from db
  // append location to message
  // append name to message
  // for each contact:
  //    get message
  //    get number
  //    call 'send' helper function
}

// helper function to actually send the message
function send(to, body) {
  client.messages
    .create({
      body,
      from: '+12019285464',
      to
    })
    .then(message => console.log(message.sid))
}

module.exports = router
