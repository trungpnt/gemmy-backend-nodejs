const express = require("express");

const ClassController = require("../controllers/class");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", /*checkAuth*/ ClassController.createClass);

router.put("/:id",ClassController.updateClass);

router.patch("/:id",ClassController.updateClass);

router.get("", ClassController.getClasses);

router.get("/future", ClassController.getFutureClasses);

router.get("/time-range",ClassController.getClassTimeRange)

router.get("/:id", ClassController.getClass);

router.delete("/:id", checkAuth, ClassController.deleteClass);

module.exports = router;
