const { Router } = require('express'),
    router = Router(),

    {
        register,
        login,
        currentUser,
        updateNotifications,
        editUser,
        getAllNotifications,
        getCountNoReadedNotification,
        deleteNotification,
        forgotPassword,
        getAppointments
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

router.route('/notifications')
    .get(account, getAllNotifications)

router.route('/count_notifications')
    .get(account, getCountNoReadedNotification)

router.route('/edit')
    .put(account, editUser)

router.route('/updateNotifications')
    .put(account, updateNotifications)

router.route('/deleteNotifications/:id')
    .delete(account, deleteNotification)

router.route('/forgotPassword')
    .post(forgotPassword)

module.exports = router