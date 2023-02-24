require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    to: "+13477682942",
    from: "+18555091435",
    body: "Lorenzo, I would like for you to join my Union! Use this union code to join: ",
  })
  .then((message) => console.log(message.sid));
