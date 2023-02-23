require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages.create({
  to: '+19292487060',
  from: '+18555091435',
  body: "Hello from Node"
})
.then((message) => console.log(message.sid));