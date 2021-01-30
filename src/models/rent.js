const mongoose = require('mongoose'),
    objectId = mongoose.Schema.ObjectId,

    rentSchema = new mongoose.Schema({
        professionalId: { type: objectId, ref: 'Account' },
        officeId: { type: objectId, ref: 'Office' },
        officeName: String,
        year: String,
        month: String,
        day: String,
        type: Number
    }, { timestamps: true })

module.exports = mongoose.model('Rent', rentSchema)