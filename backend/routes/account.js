const express = require("express");

const AccountController = require("../controllers/account");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, AccountController.createAccount);

router.put("/:id", checkAuth, AccountController.updateAccount);

router.get("", AccountController.getAccounts);

router.get("/:id", AccountController.getAccount);

router.delete("/:id", checkAuth, AccountController.deleteAccount);

module.exports = router;
