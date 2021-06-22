const express = require("express");

const StudentController = require("../controllers/student");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", StudentController.createStudent);

router.put("/:id",  StudentController.updateStudent);

router.get("", StudentController.getStudents);

router.get("/:id", StudentController.getStudent);

router.delete("/:id", StudentController.deleteStudent);

module.exports = router;
