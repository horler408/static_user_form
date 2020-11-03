const router = require("express").Router();

const userController = require("./../controllers/userController");


router.post("/register", userController.register);
router.post("/login", userController.login);
router.delete("/:userId", userController.deleteUser);
router.get('/users', userController.getUsers)
router.get('/register', userController.signup)
router.get('/login', userController.signin)

module.exports = router;