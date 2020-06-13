#!/usr/bin/env node

const authToken = process.env.TwilioAuthToken
const accountSid = process.env.TwilioAccountSid
const client = require('twilio')(accountSid, authToken)

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+12019285464',
    to: '+16035627796'
  })
  .then(message => console.log(message.sid))

// -> terminal -> run active file
