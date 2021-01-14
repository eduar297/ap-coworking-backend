const ctr = {},
    Notification = require('../models/notification')

ctr.create = async (req, res) => {
    const ioCtr = require('../socketio')
    const {
        type,
        text,
        wellRead,
        accountId,
    } = req.body

    const newNotification = new Notification({
        type,
        text,
        wellRead: wellRead ? wellRead : false,
        accountId: accountId ? accountId : null
    }),

        notification = await newNotification.save()
    ioCtr.emitMsg(accountId, notification)

    res.status(201).json({ notification })
}

ctr.get = async (req, res) => {
    var notifications = await Notification.find({ 'accountId': req.params.id })
    return res.status(200).json({ notifications })
}

ctr.update = async (req, res) => {
    const notification = await Notification.findOneAndUpdate({ '_id': req.params.id }, req.body)
    res.status(200).json({ updated: notification })
}

ctr.deleteOne = async (req, res) => {
    const notification = await Notification.findOneAndDelete({ '_id': req.params.id })
    res.status(200).json({ deleted: notification })
}

module.exports = ctr