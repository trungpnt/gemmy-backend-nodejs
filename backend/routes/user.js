const express = require("express");

const checkAuth = require("../middleware/check-auth");
const permit = require("../middleware/authorization");

const router = express.Router();

const UserController = require("../controllers/user");

router.put("/:id", checkAuth, permit('user_write'), UserController.updateUser);

router.get("", checkAuth, permit('user_read'), UserController.getUsers);

router.get("/:id", checkAuth, permit('user_read'), UserController.getUser);

router.delete("/:id", checkAuth, permit('user_write'), checkAuth, UserController.deleteUser);

router.post("/signup", checkAuth, permit('user_write'), UserController.createUser);

module.exports = router;
