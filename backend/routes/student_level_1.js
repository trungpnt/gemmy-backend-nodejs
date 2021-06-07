const express = require("express");

const StudentLevelFirstController = require("../controllers/student_level_1");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, StudentLevelFirstController.createStudentLevelOne);

router.put("/:id", checkAuth, extractFile, StudentLevelFirstController.updateStudentLevelOne);

router.get("", StudentLevelFirstController.getStudentLevelOne);

router.get("/:id", StudentLevelFirstController.getStudentLevelOne);

router.delete("/:id", checkAuth, StudentLevelFirstController.deleteStudentLevelOne);

module.exports = router;
