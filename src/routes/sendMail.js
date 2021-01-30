const { Router } = require('express'),
    router = Router(),
    { send } = require('../controllers/mail')

router.route('/')
    .post(send)

module.exports = router