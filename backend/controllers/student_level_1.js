const StudentLevelOne = require("../models/student_level_1");

exports.createStudentLevelOne = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const studentlevelone = new StudentLevelOne({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  StudentLevelOne
    .save()
    .then(createdStudentLevelOne => {
      res.status(201).json({
        message: "StudentLevelOne added successfully",
        studentlevelone: {
          ...createdStudentLevelOne,
          id: createdStudentLevelOne._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a studentlevelone failed!"
      });
    });
};

exports.updateStudentLevelOne = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const StudentLevelOne = new StudentLevelOne({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  StudentLevelOne.updateOne({ _id: req.params.id, creator: req.userData.userId }, studentlevelone)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate studentlevelone!"
      });
    });
};

exports.getStudentLevelOnes = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const studentLevelOneQuery = StudentLevelOne.find();
 
  if (pageSize && currentPage) {
    studentLevelOneQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  let fetchedStudentLevelOnes;
  studentLevelOneQuery
    .then(documents => {
      fetchedStudentLevelOnes = documents;
      return StudentLevelOne.count();
    })
    .then(count => {
      res.status(200).json({
        message: "StudentLevelOnes fetched successfully!",
        student_level_one: fetchedStudentLevelOnes,
        max_student_level_ones: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching studentlevelones failed!"
      });
    });
};

exports.getStudentLevelOne = (req, res, next) => {
  StudentLevelOne.findById(req.params.id)
    .then(studentLevelOne => {
      if (studentLevelOne) {
        res.status(200).json(studentLevelOne);
      } else {
        res.status(404).json({ message: "StudentLevelOne not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching studentlevelone failed!"
      });
    });
};

exports.deleteStudentLevelOne = (req, res, next) => {
  StudentLevelOne.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
        message: "Deleting studentlevelones failed!"
      });
    });
};
