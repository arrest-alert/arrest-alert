const accountSid = 'AC8f07420e6d9bdfa0b183eb2e69987d10'
const authToken = 'your_auth_token'
const client = require('twilio')(accountSid, authToken)

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+12019285464',
    to: '+16035627796'
  })
  .then(message => console.log(message.sid))
