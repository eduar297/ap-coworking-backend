var jwt = require('jsonwebtoken'),
    secret = process.env.jwtSecretKey || 'jwtSecretKey'

async function professional(req, res, next) {

    if (!req.headers.authorization)
        return res.status(403).send({ message: 'Autorización Denegada' })

    var token = req.headers.authorization.split(' ')[1]

    try {
        var payload = await jwt.verify(token, secret)
        
        if (payload.role != 'professional')
            return res.status(401).send({ message: 'Autorización Denegada' })
    } catch (ex) {
        return res.status(404).send({ message: 'Autorización Denegada' })
    }

    req.user = payload

    next()
}
module.exports = professional