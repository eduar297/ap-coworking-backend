const ctr = {},
    Notification = require('../models/notification')

ctr.createNotification = async (req, res) => {
    const ioCtr = require('../socketio'),

        {
            type,
            text,
            wellRead,
        } = req.body,

        userId = req.params.id,

        newNotification = new Notification({
            type,
            text,
            wellRead: wellRead ? wellRead : false,
            userId: userId
        }),

        notification = await newNotification.save(),
        notifications = await Notification.find({ userId: userId, readed: false })

    data = { notification, count: notifications.length }
    ioCtr.emitMsg(userId, data)

    res.status(201).json({ notification })
}

ctr.readAllNotifications = async (req, res) => {

    const id = req.params.id,
        notifications = await Notification.find({ userId: id })

    notifications.forEach(async notification => {
        const _res = await notification.update({ readed: true })
    })

    res.status(200).json({ msg: "updated all notification" })
}

ctr.getAllNotifications = async (req, res) => {
    const id = req.params.id,
        notifications = await Notification.find({ userId: id })

    return res.status(200).json({ notifications })
}

ctr.deleteNotification = async (req, res) => {
    const notification = await Notification.findOneAndDelete({ '_id': req.params.id })
    res.status(200).json({ deleted: notification })
}

ctr.getCountNoReadedNotification = async (req, res) => {
    const id = req.params.id,
        notifications = await Notification.find({ 'userId': id, 'readed': false })

    return res.status(200).json({ count: notifications.length })
}


module.exports = ctr