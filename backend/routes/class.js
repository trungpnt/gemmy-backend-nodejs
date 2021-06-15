const express = require("express");

const ClassController = require("../controllers/class");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", /*checkAuth*/ ClassController.createClass);

router.put("/:id",ClassController.updateClassStatus);

router.put("/:id", ClassController.updateClass);

router.get("", ClassController.getClass);

router.get("/:id", ClassController.getClass);

router.delete("/:id", checkAuth, ClassController.deleteClass);

module.exports = router;
