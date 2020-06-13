// const {FoodItem, User} = require('../db/models')
require('../../secrets')

const authToken = process.env.TwilioAuthToken
const accountSid = process.env.TwilioAccountSid
const client = require('twilio')(accountSid, authToken)

function anonymous(location) {
  client.messages
    .create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+12019285464',
      to: '+16035627796'
    })
    .then(message => console.log(message.sid))
}

function triggerMessageSend(userID, location) {
  // get message from db
  // get contacts from db
  // append location to message
  // for each contact:
  // call 'send' helper function
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
