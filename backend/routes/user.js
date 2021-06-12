const express = require("express");

const checkAuth = require("../middleware/check-auth")

const router = express.Router();

const UserController = require("../controllers/user");

router.post("/signup", checkAuth, UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;
