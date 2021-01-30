const mongoose = require('mongoose'),

    officeSchema = new mongoose.Schema({
        name: String,
        dayPrice: Number,
        morningPrice: Number,
        afternoomPrice: Number,
        nigthPrice: Number,
        description: String,
        img: String,
        count: Number,
        avaliable: Number
    }, { timestamps: true })

module.exports = mongoose.model('Office', officeSchema)