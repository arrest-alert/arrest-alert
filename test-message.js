#!/usr/bin/env node
require('./secrets')
const authToken = process.env.TwilioAuthToken
const accountSid = process.env.TwilioAccountSid
const client = require('twilio')(accountSid, authToken)

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+12019285464',
    to: '+17169976397'
  })
  .then(message => console.log(message.sid))

// -> terminal -> run active file
