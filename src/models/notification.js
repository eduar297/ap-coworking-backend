const { Schema, model } = require('mongoose'),
    objectId = Schema.ObjectId,

    notificationSchema = new Schema({
        professionalId: { type: objectId, ref: 'Professional' },
        accountId: { type: objectId, ref: 'Account' },
        type: String,
        readed: {
            type: Boolean,
            default: false
        },
        text: String
    }, { timestamps: true })

module.exports = model('Notification', notificationSchema)