const StudentLevelZero = require("../models/student_level_0");

exports.createStudentLevelZero = (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");
  const StudentLevelZero = new StudentLevelZero({
    full_name: req.body.full_name,
    phone_number: req.body.phone_number,
    test_date: req.file.test_date,
    //creator: req.userData.userId
    
  });
  StudentLevelZero
    .save()
    .then(createdStudentLevelZero => {
      res.status(201).json({
        message: "StudentLevelZero added successfully",
        studen_tlevel_zero: {
          ...createdStudentLevelZero,
          id: createdStudentLevelZero._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a student-level-zero failed!"
      });
    });
};

exports.updateStudentLevelZero = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const StudentLevelZero = new StudentLevelZero({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  StudentLevelZero.updateOne({ _id: req.params.id, creator: req.userData.userId }, StudentLevelZero)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate studentlevelzero!"
      });
    });
};

exports.getStudentLevelZeros = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const studentlevelzeroQuery = StudentLevelZero.find();
 
  if (pageSize && currentPage) {
    studentLevelZeroQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  let fetchedStudentLevelZeros;
  studentLevelZeroQuery
    .then(documents => {
      fetchedStudentLevelZeros = documents;
      return StudentLevelZero.count();
    })
    .then(count => {
      res.status(200).json({
        message: "StudentLevelZeros fetched successfully!",
        student_level_zeros: fetchedStudentLevelZeros,
        max_student_level_zeros: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching studentlevelzeros failed!"
      });
    });
};

exports.getStudentLevelZero = (req, res, next) => {
  StudentLevelZero.findById(req.params.id)
    .then(studentLevelZero => {
      if (studentLevelZero) {
        res.status(200).json(studentLevelZero);
      } else {
        res.status(404).json({ message: "StudentLevelZero not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching studentlevelzero failed!"
      });
    });
};

exports.deleteStudentLevelZero = (req, res, next) => {
  StudentLevelZero.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting studentlevelzeros failed!"
      });
    });
};
