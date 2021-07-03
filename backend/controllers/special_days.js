const SpecialDays = require("../models/special_days");

exports.createSpecialDays = (req, res, next) => {

    for(var i = 0; i < req.body.length; i++){
        const specialDays = new SpecialDays({
            date: req.body[i].date,
            day_session:  req.body[i].day_session,
            reason: req.body[i].reason,
        });
        specialDays
            .save()
            .then(createdSpecialDays => {
                res.status(201).json({
                    message: "special days added successfully",
                    special_days: {
                        special_days_created : createdSpecialDays,
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
    const specialDaysQuery = SpecialDays.find({}).select('date + day_session + reason');

    if (pageSize && currentPage) {
        specialDaysQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    let fetchedSpecialDays;
    specialDaysQuery
        .then(documents => {
            fetchedSpecialDays = documents;
            return SpecialDays.count();
        })
        .then(count => {

            res.status(200).json({
                message: "SpecialDays fetched successfully!",
                special_days: fetchedSpecialDays,
                max_special_days: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching special days failed!"
            });
        });
};

exports.getSpecialDayById = (req, res, next) => {
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

exports.getSpecialDaysInTimeRange = (start_date, end_date, class_session) => {
    class_session[0].day = parseInt(class_session[0].day) + 1;
    class_session[1].day = parseInt(class_session[1].day) + 1;
    let query = {
        $match: {
            date: {
                "$cmp": [start_date, end_date],
                "$dayOfWeek": {"$or":[class_session[0].day, class_session[1].day]}
            },
            day_session: {"$or":[class_session[0].day_session, class_session[1].day_session]}
        }
        // ,$count: "count"
    };
    const specialDaysQuery = SpecialDays.find(query).select('date + day_session + reason');

    let fetchedSpecialDays;
    specialDaysQuery
        .then(documents => {
            fetchedSpecialDays = documents;
            return SpecialDays.count();
        }).catch(error => {
            return "fail to get number of special days";
        });
};