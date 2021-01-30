const { Schema, model } = require('mongoose'),
    objectId = Schema.ObjectId,

    notificationSchema = new Schema({
        userId: { type: objectId },
        type: String,
        readed: {
            type: Boolean,
            default: false
        },
        text: String
    }, { timestamps: true })

module.exports = model('Notification', notificationSchema)