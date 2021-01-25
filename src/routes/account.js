const { Router } = require('express'),
    router = Router(),

    {
        register,
        login,
        currentUser,
        editUser,
        getAppointments,
        forgotPassword,
        resetPassword,
        updatePasswordByEmail
    } = require('../controllers/account'),

    account = require('../middleware/account')

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)

router.route('/me')
    .get(account, currentUser)

router.route('/getAppointments')
    .get(account, getAppointments)

router.route('/edit')
    .put(account, editUser)

router.route('/forgotPassword')
    .post(forgotPassword)

router.route('/resetPassword')
    .get(resetPassword)

router.route('/updatePasswordByEmail')
    .put(updatePasswordByEmail)

module.exports = router