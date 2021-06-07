const express = require("express");

const StudentLevelTwoController = require("../controllers/student_level_2");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, StudentLevelTwoController.createStudentLevelTwo);

router.put("/:id", checkAuth, StudentLevelTwoController.updateStudentLevelTwo);

router.get("", StudentLevelTwoController.getStudentLevelTwos);

router.get("/:id", StudentLevelTwoController.getStudentLevelTwo);

router.delete("/:id", checkAuth, StudentLevelTwoController.deleteStudentLevelTwo);

module.exports = router;
