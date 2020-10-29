const router = require("express").Router();

const userController = require("./../controllers/userController");

router.post("/register", userController.signup);
router.post("/login", userController.login);
router.delete("/:userId", userController.deleteUser);

module.exports = router;