const express = require("express");

const StudentLevelZeroController = require("../controllers/student_level_0");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", StudentLevelZeroController.createStudentLevelZero);

router.put("/:id",  StudentLevelZeroController.updateStudentLevelZero);

router.get("", StudentLevelZeroController.getStudentLevelZeros);

router.get("/:id", StudentLevelZeroController.getStudentLevelZero);

router.delete("/:id", StudentLevelZeroController.deleteStudentLevelZero);

module.exports = router;
