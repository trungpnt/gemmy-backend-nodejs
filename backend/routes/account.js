const express = require("express");

const AccountController = require("../controllers/account");

const checkAuth = require("../middleware/check-auth");

const permit = require("../middleware/authorization");

const router = express.Router();

router.post("/login", AccountController.loginAccount);

router.post("", checkAuth , permit('account_write') ,  AccountController.createAccount)

router.put("/:id", checkAuth , permit('account_write') , AccountController.updateAccount);

router.delete("/:id", checkAuth , permit('account_write') , checkAuth, AccountController.deleteAccount);

// router.get("", RoleController.getRoles);






module.exports = router;
