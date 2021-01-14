const { Router } = require('express'),
    router = Router(),

    {
        create,
        get,
        update,
        deleteOne } = require('../controllers/notification')

router.route('/')
    .post(create)

router.route('/:id')
    .delete(deleteOne)
    .put(update)
    .get(get)

module.exports = router