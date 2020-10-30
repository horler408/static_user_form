const router = require('express').Router();

const indexController = require('../controllers/indexController')

router.get('/', indexController.home)
router.get('/register', indexController.register)
router.get('/login', indexController.login)

module.exports = router;