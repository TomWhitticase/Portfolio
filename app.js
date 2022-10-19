const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

//email
const senderUsername = "passivesoybean@gmail.com";
const senderPassword = "pusbpyouzunvylpz";
const recipient = "tom.pe.wh@gmail.com";
const emailSubject = "PORTFOLIO CONTACT FORM";

//Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderUsername,
      pass: senderPassword,
    },
  });

  const mailOptions = {
    to: recipient,
    subject: emailSubject,
    text:
      req.body.message +
      "\n\nFROM: " +
      req.body.name +
      "\nEMAIL ADDRESS: " +
      req.body.emailAddress,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
