const express = require("express");

const checkAuth = require("../middleware/check-auth")

const router = express.Router();

const UserController = require("../controllers/user");

router.post("", checkAuth, UserController.createUser);

router.put("/:id", checkAuth, UserController.updateUser);

router.get("", UserController.getUsers);

router.get("/:id", UserController.getUsers);

router.delete("/:id", checkAuth, UserController.deleteUser);

router.post("/signup", checkAuth, UserController.createUser);


module.exports = router;
