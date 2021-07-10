const express = require("express");

const RoleController = require("../controllers/role");
const checkAuth = require("../middleware/check-auth");
const permit = require("../middleware/authorization");

const router = express.Router();

router.post("", checkAuth, permit('role_write'),  RoleController.createRole);

router.put("/:id", checkAuth, permit('role_write'), RoleController.updateRole);

router.get("", checkAuth, permit('role_read'), RoleController.getRoles);

router.get("/:id", checkAuth, permit('role_read'), RoleController.getRole);

router.delete("/:id", checkAuth, permit('role_write'), RoleController.deleteRole);

module.exports = router;