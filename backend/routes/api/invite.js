const express = require("express");
require("dotenv").config();
const router = express.Router();
const sgMail = require("@sendgrid/mail");

router.post("/", (req, res) => {
  const { email } = req.body;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "mernweunion@gmail.com",
    subject: "Join Our Union!",
    text: "https://we-union.onrender.com/signup",
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
