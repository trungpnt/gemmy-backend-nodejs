const express = require("express");

const StudentLevelZeroController = require("../controllers/student_level_0");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, StudentLevelZeroController.createStudentLevelZero);

router.put("/:id", checkAuth, extractFile, StudentLevelZeroController.updateStudentLevelZero);

router.get("", StudentLevelZeroController.getStudentLevelZeros);

router.get("/:id", StudentLevelZeroController.getStudentLevelZero);

router.delete("/:id", checkAuth, StudentLevelZeroController.deleteStudentLevelZero);

module.exports = router;
