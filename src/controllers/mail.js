const ctr = {},
  _mailer = require("nodemailer");

// const EMAIL_ADDRESS = "elevercenter@gmail.com"
// const EMAIL_PASSWORD = "XQwarXYZ."
const EMAIL_ADDRESS = "hola@elevercenter.com";
const EMAIL_PASSWORD = "I+vcxeB6n&R)";

const mailer = function(to, subject, html, from) {
  const transporter = _mailer.createTransport({
    // service: 'gmail',
    pool: true,
    auth: {
      user: `${EMAIL_ADDRESS}`,
      pass: `${EMAIL_PASSWORD}`
    },
    host: "mail.elevercenter.com",
    port: 587,
    secure: false, // true for 465, false for other ports,
    tls: {
      rejectUnauthorized: false
    }
  });
  const mailOption = {
    from,
    to: to,
    subject: subject,
    html: html
  };
  return transporter.sendMail(mailOption);
};

ctr.send = async (req, res) => {
  const { email, message, name, job, phone } = req.body.data;

  let html = `
    <h2>Name</h2>
    <p>${name}</p>
    <h2>Email</h2>
    <p>${email}</p>    
    <h2>Job</h2>
    <p>${job}</p>
    <h2>Phone</h2>
    <p>${phone}</p>    
    <h2>Message</h2>
    <p>${message}</p>    
    `;

  if (email === "") return res.status(200).send({ message: `email required` });

  try {
    mailer(
      "hola@elevercenter.com",
      "Mensaje de contacto de " + name,
      html,
      email
    )
      .then(_res => {
        console.log("success to send msg", _res);
        return res.status(200).send({ message: `email sent` });
      })
      .catch(err => {
        console.log("error", err);
        return res.status(200).send({ message: `error`, err });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = ctr;
