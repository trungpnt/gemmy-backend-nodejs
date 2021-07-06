const express = require("express");

const RoleController = require("../controllers/role");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("",  RoleController.createRole);

router.put("/:id", RoleController.updateRole);

router.get("", RoleController.getRoles);

router.get("/:id", RoleController.getRole);

router.delete("/:id", checkAuth, RoleController.deleteRole);

module.exports = router;