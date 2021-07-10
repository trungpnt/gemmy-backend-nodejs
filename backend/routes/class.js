const express = require("express");

const ClassController = require("../controllers/class");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const permit = require("../middleware/authorization");

const router = express.Router();

router.post("", /*checkAuth*/ ClassController.createClass);

router.put("/:id", checkAuth , permit('class_write') ,ClassController.updateClass);

router.patch("/:id", checkAuth , permit('class_write'),ClassController.updateClass);

router.get("", checkAuth , permit('class_read'), ClassController.getClasses);

router.get("/future", checkAuth , permit('class_read'), ClassController.getFutureClasses);

router.get("/time-range", checkAuth , permit('class_read'),ClassController.getClassTimeRange)

router.get("/:id", checkAuth , permit('class_read'), ClassController.getClass);

router.delete("/:id", checkAuth , permit('class_write'), checkAuth, ClassController.deleteClass);

module.exports = router;
