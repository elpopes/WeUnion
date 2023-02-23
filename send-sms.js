const accountSid = 'AC87936ce2d8d65a75003c3c67ecec5806'
const authToken = 'c1e67bc2e14f7da91c77a79555cb3e1e'

const client = require('twilio')(accountSid, authToken);

client.messages.create({
  to: '+19292487060',
  from: '+18555091435',
  body: "Hello from Node"
})
.then((message) => console.log(message.sid));