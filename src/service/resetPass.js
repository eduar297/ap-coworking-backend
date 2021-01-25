const Account = require('../models/account')

const resetPassword = async (token, res) => {
    let user = await Account.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (user === null)
        return res.status(200).send({ message: `password reset link is invalid or has expired` })
    else {
        return res.status(200).send({
            message: `password reset link a-ok`,
            id: user._id
        })
    }
}

module.exports = resetPassword