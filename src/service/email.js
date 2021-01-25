const _mailer = require('nodemailer');

const mailer = function (to, subject, html) {
    const transporter = _mailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });
    const mailOption = {
        from: 'Elever Center',
        to: to,
        subject: subject,
        html: html
    };
    return transporter.sendMail(mailOption)
};

module.exports = mailer;