const Level = require("../models/level");

exports.createLevel = (req, res, next) => {

    const all_levels_added = [];
   
    for(var i = 0; i < req.body.length; i++) {
        
        const level = new Level({
            level_name: req.body[i].level_name,
            description: req.body[i].description,
            //creator: req.userData.userId
        });
        
        Level.findOne({ level_name: level.level_name })
            .then(result => {   
                if (result) {
                    res.status(200).json({ message: "The level with the same name already exists !" });
                } else {
                    level
                        .save()
                        .then(createdLevel => {
                            res.status(201).json({
                                message: "Level added successfully",
                                level: {
                                    id: createdLevel._id,
                                    level_name: createdLevel.level_name
                                }
                            });
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: "Creating a level failed!"
                            });
                        });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: "Please check your inputs and try again!"
                });
            });
    }

}

exports.updateLevel = (req, res, next) => {

    const level = new Level({
        _id: req.body.id,
        level_name: req.body.level_name,
        description: req.body.description,
    });
    Level.updateOne({ _id: req.params.id }, level)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update level!"
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
    Level.deleteOne({ _id: req.params.id })
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
