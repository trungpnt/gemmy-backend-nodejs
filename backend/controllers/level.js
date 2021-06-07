const Level = require("../models/level");

exports.createLevel = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const level = new Level({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  level
    .save()
    .then(createdLevel => {
      res.status(201).json({
        message: "Level added successfully",
        level: {
          ...createdLevel,
          id: createdLevel._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a level failed!"
      });
    });
};

exports.updateLevel = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const level = new Level({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Level.updateOne({ _id: req.params.id, creator: req.userData.userId }, level)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate level!"
      });
    });
};

exports.getLevels = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const levelQuery = Level.find();
 
  if (pageSize && currentPage) {
    levelQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  let fetchedLevels;
  levelQuery
    .then(documents => {
      fetchedLevels = documents;
      return Level.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Levels fetched successfully!",
        levels: fetchedLevels,
        maxLevels: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching levels failed!"
      });
    });
};

exports.getLevel = (req, res, next) => {
  Level.findById(req.params.id)
    .then(level => {
      if (level) {
        res.status(200).json(level);
      } else {
        res.status(404).json({ message: "Level not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching level failed!"
      });
    });
};

exports.deleteLevel = (req, res, next) => {
  Level.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
        message: "Deleting levels failed!"
      });
    });
};
