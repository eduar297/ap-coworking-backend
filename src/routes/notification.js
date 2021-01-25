const { Router } = require('express'),
    router = Router(),

    {
        createNotification,
        getAllNotifications,
        getCountNoReadedNotification,
        readAllNotifications,
        deleteNotification } = require('../controllers/notification')


router.route('/count/:id')
    .get(getCountNoReadedNotification)

router.route('/:id')
    .delete(deleteNotification)//se le pasa el id de la noti
    .put(readAllNotifications)//se le pasa el id dl usuario
    .get(getAllNotifications)//se le pasa el id dl usuario
    .post(createNotification)//se le pasa el id dl usuario

module.exports = router