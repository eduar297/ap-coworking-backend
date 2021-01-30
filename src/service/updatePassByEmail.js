const crypto = require('crypto'),
    mailer = require('./email'),

    Account = require('../models/account'),

    ENDPOINT = `${process.env.ENDPOINT}`

const updatePassByEmail = async (id, password, res) => {
    let user = await Account.findOne({ _id: id })

    user['password'] = user.encryptPassword(password)
    user['resetPasswordToken'] = null
    user['resetPasswordExpires'] = null

    user = await user.save()

    return res.status(200).send({ message: `password updated`, user })
}

module.exports = updatePassByEmail