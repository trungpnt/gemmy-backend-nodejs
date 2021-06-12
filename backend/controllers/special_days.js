const SpecialDays = require("../models/student_level_0");

exports.createSpecialDays = (req, res, next) => {

    for(var i = 0; i < req.body.length; i++){
        const specialDays = new SpecialDays({
            date: req.body[i].date,
            reason: req.body[i].reason,
        });
        specialDays
            .save()
            .then(createdSpecialDays => {
                res.status(201).json({
                    message: "special days added successfully",
                    studen_tlevel_zero: {
                        ...createdSpecialDays,
                        id: createdSpecialDays._id
                    }
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: "Creating special days failed!"
                });
            });
    }
    
};

exports.updateSpecialDays = (req, res, next) => {

    const specialDays = new SpecialDays({
        _id: req.body.id,
        date: req.body.date,
        reason: req.body.reason,
    });
    SpecialDays.updateOne({ _id: req.params.id }, specialDays)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update special days!"
            });
        });
};

exports.getSpecialDays = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const specialdaysQuery = SpecialDays.find();

    if (pageSize && currentPage) {
        specialDaysQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    let fetchedSpecialDayss;
    specialDaysQuery
        .then(documents => {
            fetchedSpecialDayss = documents;
            return SpecialDays.count();
        })
        .then(count => {
            res.status(200).json({
                message: "SpecialDayss fetched successfully!",
                special_days: fetchedSpecialDayss,
                max_special_days: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching special days failed!"
            });
        });
};

exports.getSpecialDays = (req, res, next) => {
    SpecialDays.findById(req.params.id)
        .then(specialDays => {
            if (specialDays) {
                res.status(200).json(specialDays);
            } else {
                res.status(404).json({ message: "Special Day not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching special days failed!"
            });
        });
};

exports.deleteSpecialDays = (req, res, next) => {
    SpecialDays.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
                message: "Deleting specialdayss failed!"
            });
        });
};
