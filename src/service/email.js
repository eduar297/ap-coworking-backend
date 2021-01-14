const _mailer = require('nodemailer');

const mailer = function (to, subject, html) {
    const transporter = _mailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });
    const mailOption = {
        from: '',
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOption, (error, info) => {
        if (error)
            return false;
        else
            return true;
    })
};

module.exports = mailer;