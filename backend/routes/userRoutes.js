const express = require("express");
const router = express.Router();

const { signup, login, getProfile, logout } = require("../controllers/userController")

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);

const isLoggedIn = require("../middlewares/isLoggedIn")
router.route("/profile").get(isLoggedIn, getProfile)

module.exports = router;