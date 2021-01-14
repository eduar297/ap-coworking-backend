const account = require('../models/account')

const ctr = {},
    Account = require('../models/account'),
    Appointment = require('../models/appointment'),
    Notification = require('../models/notification'),
    jwt = require('../service/jwt')

ctr.register = async (req, res) => {
    const {
        specialty,
        firstName,
        secondName,
        lastName,
        address,
        city,
        province,
        pc,
        phone,
        email,
        birthDate,
        password,
        role
    } = req.body,

        existingAccount = await Account.findOne({ email: email })

    if (existingAccount)
        return res.status(200).send({ error: "Ya Existe un Usuario con ese email" })

    const newAccount = new Account({
        specialty,
        firstName,
        secondName,
        lastName,
        address,
        city,
        province,
        pc,
        phone,
        email,
        birthDate,
        role
    })

    newAccount.password = newAccount.encryptPassword(password)
    const account = await newAccount.save()

    return res.status(200).send({
        token: jwt.createToken(account),
        account: account,
        appointments: [],
        notifications: []
    })
}

ctr.forgotPassword = async (req, res) => {
    const email = req.body.email

    // return res.status(200).send({ message: `email not in db` })
    // return res.status(200).send({ message: `recovery email sent` })
}

ctr.login = async (req, res) => {
    const { email, password } = req.body,
        account = await Account.findOne({ email: email })

    if (!account)
        return res.status(200).send({ error: "Invalid credentials" })

    if (!account.comparePassword(password))
        return res.status(200).send({ error: "Invalid credentials" })

    let appoinments;
    if (account.role == "client")
        appointments = await Appointment.find({ clientId: account._id });
    else
        appointments = await Appointment.find({ professionalId: account._id });

    const notifications = await Notification.find({ 'accountId': account._id })


    return res.status(200).send({
        token: jwt.createToken(account),
        account: account,
        appointments: appointments,
        notifications: notifications
    })
}

ctr.currentUser = async (req, res) => {
    const { id } = req.user,
        account = await Account.findById(id),
        appointments = await Appointment.find({ accountId: id }),
        notifications = await Notification.find({ 'accountId': account._id })

    res.status(200).send({
        account: account,
        appointments: appointments,
        notifications: notifications
    })
}

ctr.editUser = async (req, res) => {
    var account = await Account.findById(req.user.id)

    const {
        specialty,
        firstName,
        secondName,
        lastName,
        address,
        city,
        province,
        pc,
        phone,
        email,
        birthDate,
        password
    } = req.body

    account['specialty'] = specialty
    account['firstName'] = firstName
    account['secondName'] = secondName
    account['lastName'] = lastName
    account['address'] = address
    account['city'] = city
    account['province'] = province
    account['pc'] = pc
    account['phone'] = phone
    account['birthDate'] = birthDate
    account['password'] = account.encryptPassword(password)

    account = await Account.save()

    res.status(200).json({ updatedAccount: account })
}

ctr.updateNotifications = async (req, res) => {
    const id = req.user.id
    account = await Account.findOne({ _id: id }),
        notifications = await Notification.find({ 'accountId': req.user.id })

    notifications.forEach(async notification => {
        const _res = await notification.update({ readed: req.body.readed })
    })

    res.status(200).json({ msg: "updated all notification" })

}

ctr.getAllNotifications = async (req, res) => {

    const id = req.user.id
    account = await Account.findOne({ _id: id })
    notifications = await Notification.find({ 'accountId': req.user.id })

    return res.status(200).json({ notifications })
}

ctr.deleteNotification = async (req, res) => {
    const notification = await Notification.findOneAndDelete({ '_id': req.params.id })
    res.status(200).json({ deleted: notification })
}

ctr.getCountNoReadedNotification = async (req, res) => {

    const id = req.user.id,
    account = await Account.findOne({ _id: id }),
        notifications = await Notification.find({ 'accountId': req.user.id, 'readed': false })

    return res.status(200).json({ count: notifications.length })
}

ctr.getAppointments = async (req, res) => {
    const id = req.user.id,
    account = await Account.findOne({ _id: id });
    if (account.role == 'client') {
        const appointments = await Appointment.find({ 'clientId': id });
        for (let i = 0; i < appointments.length; i++) {
            appointments[i].other =  await Account.findOne({ _id: appointments[i].professionalId });          
        }
        return res.status(200).json({ appointments })
    }
    else if (account.role == 'professional') {
        const appointments = await Appointment.find({ 'professionalId': id });
        for (let i = 0; i < appointments.length; i++) {
            appointments[i].other =  await Account.findOne({ _id: appointments[i].clientId });          
        }
        return res.status(200).json({ appointments })
    }


}

module.exports = ctr