const StudentLevelTwo = require("../models/student_level_2");

exports.createStudentLevelTwo = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const StudentLevelTwo = new StudentLevelTwo({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  StudentLevelTwo
    .save()
    .then(createdStudentLevelTwo => {
      res.status(201).json({
        message: "StudentLevelTwo added successfully",
        studentleveltwo: {
          ...createdStudentLevelTwo,
          id: createdStudentLevelTwo._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a studentleveltwo failed!"
      });
    });
};

exports.updateStudentLevelTwo = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const StudentLevelTwo = new StudentLevelTwo({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  StudentLevelTwo.updateOne({ _id: req.params.id, creator: req.userData.userId }, StudentLevelTwo)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate studentleveltwo!"
      });
    });
};

exports.getStudentLevelTwos = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const studentleveltwoQuery = StudentLevelTwo.find();
 
  if (pageSize && currentPage) {
    studentLevelTwoQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  let fetchedStudentLevelTwos;
  studentLevelTwoQuery
    .then(documents => {
      fetchedStudentLevelTwos = documents;
      return StudentLevelTwo.count();
    })
    .then(count => {
      res.status(200).json({
        message: "StudentLevelTwos fetched successfully!",
        student_level_twos: fetchedStudentLevelTwos,
        max_student_level_twos: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching studentleveltwos failed!"
      });
    });
};

exports.getStudentLevelTwo = (req, res, next) => {
  StudentLevelTwo.findById(req.params.id)
    .then(studentLevelTwo => {
      if (studentLevelTwo) {
        res.status(200).json(studentLevelTwo);
      } else {
        res.status(404).json({ message: "StudentLevelTwo not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching studentleveltwo failed!"
      });
    });
};

exports.deleteStudentLevelTwo = (req, res, next) => {
  StudentLevelTwo.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
        message: "Deleting studentleveltwos failed!"
      });
    });
};
