const express = require("express");

const StudentController = require("../controllers/student");

const checkAuth = require("../middleware/check-auth");
const permit = require("../middleware/authorization");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, permit('student_write'), StudentController.createStudent);

router.put("/:id", checkAuth, permit('student_write'),  StudentController.updateStudent);

router.get("", checkAuth, permit('student_read'), StudentController.getStudents);

router.get("/:id", checkAuth, permit('student_read'), StudentController.getStudent);

router.delete("/:id", checkAuth, permit('student_write'), StudentController.deleteStudent);

module.exports = router;
