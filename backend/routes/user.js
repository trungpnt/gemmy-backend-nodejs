const express = require("express");

const checkAuth = require("../middleware/check-auth");

const permit = require("../middleware/authorization");

const router = express.Router();

const UserController = require("../controllers/user");

router.put("/:id", UserController.updateUser);

router.get("", checkAuth, permit('read'), UserController.getUsers);

router.get("/:id", UserController.getUser);

router.delete("/:id", checkAuth, UserController.deleteUser);

router.post("/signup", UserController.createUser);

module.exports = router;
