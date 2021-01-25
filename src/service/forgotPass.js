const crypto = require('crypto'),
    mailer = require('./email'),

    Account = require('../models/account'),

    ENDPOINT = `${process.env.ENDPOINT}`

const forgotPassword = async (email, res) => {
    if (email === '')
        return res.status(200).send({ message: `email required` })

    let user = await Account.findOne({ email: email })

    if (user === null)
        return res.status(200).send({ message: `email not in db` })
    else {
        const token = crypto.randomBytes(20).toString('hex')

        user['resetPasswordToken'] = token
        user['resetPasswordExpires'] = Date.now() + 3600000

        user = await user.save()

        const text = `<h2>You are receiving this because you (or someone else) have 
        request the reset of the password for your account.</h2>
        <p>Please click on the following link, or paste this into your browser to
        complete the process withing one hour of receiving it:</p>
        <p>${ENDPOINT}/account/reset/${token}</p>
        <p>If you did not request this, please ignore this email and your
        password will remain unchanged.</p>`

        mailer(email, "Link to Reset Password", text).
            then(_res => {
                console.log('success', _res)
                return res.status(200).send({ message: `recovery email sent` })
            }).
            catch(err => {
                console.log("error", err)
                return res.status(200).send({ message: `error`, err })
            })

    }

    // setTimeout(() => { res.status(200).send({ message: `recovery email sent` }) }, 1000)
    // setTimeout(() => { res.status(200).send({ message: `email not in db` }) }, 1000)
    // setTimeout(() => { res.status(200).send({ message: `email required` }) }, 1000)

}

module.exports = forgotPassword