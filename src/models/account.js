const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),

    accountSchema = new mongoose.Schema({
        specialty: String,
        firstName: String,
        secondName: String,
        lastName: String,
        address: String,
        city: String,
        province: String,
        pc: String,
        phone: String,
        email: String,
        birthDate: String,
        password: String,
        role: String,
    }, { timestamps: true })

accountSchema.methods.encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
accountSchema.methods.comparePassword = function (password) { return bcrypt.compareSync(password, this.password) }

module.exports = mongoose.model('Account', accountSchema)