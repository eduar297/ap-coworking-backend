var jwt = require('jsonwebtoken')
var secret = process.env.jwtSecretKey || 'jwtSecretKey';

exports.createToken = function (user) {
    var payload = {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        password: user.password,
        role: user.role,
    };
    const token = jwt.sign(payload, secret, {
        expiresIn: 100000
    });

    return token;
};