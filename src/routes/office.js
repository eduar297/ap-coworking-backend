const { Router } = require('express'),
    router = Router(),

    {
        gets,
        get,
        getSchedule,
        rentOffice,
        create
    } = require('../controllers/office');

const professional = require('../middleware/professional');

router.route('/')
    .get(gets)
    .post(create)

router.route('/:id')
    .get(get)
    .post(professional, rentOffice)

router.route('/getSchedule/:id')
    .post(getSchedule)

module.exports = router