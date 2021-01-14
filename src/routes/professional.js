const { Router } = require('express');
const router = Router();

const {
    gets,
    get,
    remove,
    getSchedule,
    bookAppointment,
    getRents
} = require('../controllers/professional');

const admin = require('../middleware/admin');
const client = require('../middleware/client');
const professional = require('../middleware/professional');

router.route('/')
    .get(gets)

router.route('/getRents')
    .get(professional, getRents)
    
router.route('/getSchedule/:id')
    .post(client, getSchedule)

router.route('/:id')
    .get(professional, get)
    .post(client, bookAppointment)
    .delete(admin, remove);

module.exports = router;