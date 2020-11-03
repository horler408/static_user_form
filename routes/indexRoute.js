const router = require('express').Router();

const indexController = require('../controllers/indexController')
const auth = require('./../middleware/auth');

router.get('/', indexController.home);
router.get('/dashboard', auth, indexController.dashboard);


module.exports = router;