const express = require("express");

const AccountController = require("../controllers/account");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/login", AccountController.loginAccount);

router.post("", AccountController.createAccount)

router.put("/:id", AccountController.updateAccount);

router.delete("/:id", checkAuth, AccountController.deleteAccount);



// router.get("", RoleController.getRoles);






module.exports = router;
