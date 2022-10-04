const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors")({
  origin: true,
});

exports.emailMessage = functions.https.onRequest((req, res) => {
  const { name, email, phone, message } = req.body;
  return cors(req, res, () => {
    var text = `<div>
      <h4>Information</h4>
      <ul>
        <li>
          Name - ${name || ""}
        </li>
        <li>
          Email - ${email || ""}
        </li>
        <li>
          Phone - ${phone || ""}
        </li>
      </ul>
      <h4>Message</h4>
      <p>${message || ""}</p>
    </div>`;
    var sesAccessKey = "YOURGMAIL@gmail.com";
    var sesSecretKey = "password";

    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: "passivesoybean@gmail.com",
          pass: "pusbpyouzunvylpz",
        },
      })
    );
    const mailOptions = {
      to: "tom.pe.wh@gmail.com",
      from: "passivesoybean@gmail.com",
      subject: `${name} sent you a new message`,
      text: text,
      html: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
      }
      res.status(200).send({
        message: "success",
      });
    });
  }).catch(() => {
    res.status(500).send("error");
  });
});
