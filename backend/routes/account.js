const express = require("express");

const AccountController = require("../controllers/account");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/login", checkAuth, AccountController.loginAccount);

module.exports = router;
