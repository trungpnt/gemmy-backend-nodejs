const express = require("express");

const RoleController = require("../controllers/role");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("",  RoleController.createRole);

module.exports = router;