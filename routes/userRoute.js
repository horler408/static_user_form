const router = require("express").Router();

const userController = require("./../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get('/signup', userController.signup)
router.get('/signin', userController.signin)
router.delete("/:userId", userController.deleteUser);

module.exports = router;