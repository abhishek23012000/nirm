const express = require("express");
const router = express.Router();
const passport = require("passport");

const { userLogin, userRegistration } = require("../controller/userController");

router.post("/login", userLogin);
router.post("/adduser", userRegistration);

module.exports = router;
