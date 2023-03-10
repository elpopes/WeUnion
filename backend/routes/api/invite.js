const express = require("express");
require("dotenv").config();
const router = express.Router();
const sgMail = require("@sendgrid/mail");

router.post("/", (req, res) => {
  const { email, unionName, unionId, inviterName } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "mernweunion@gmail.com",
    subject: `Join ${unionName}`,
    html: `
      <p>Hello,</p>
      <p>weUnion user ${inviterName} is inviting you to join their union!</p>
      <p>Enter this union code: ${unionId} at <a href="https://we-union.onrender.com/signup" target="_blank" rel="noopener noreferrer">weUnion</a> sign up.</p>
      <p>Best regards,</p>
      <p>The weUnion Team</p>
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({ message: "Email sent successfully." });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while sending the email." });
    });
});

module.exports = router;
