const mongoose = require('mongoose'),
    objectId = mongoose.Schema.ObjectId,

    appointmentSchema = new mongoose.Schema({
        professionalId: { type: objectId, ref: 'Account' },
        clientId: { type: objectId, ref: 'Account' },
        other: Object,
        year: String,
        month: String,
        day: String,
        start: String,
        end: String,

        timestamp: { type: Date, default: Date.now }
    })

module.exports = mongoose.model('Appointment', appointmentSchema)