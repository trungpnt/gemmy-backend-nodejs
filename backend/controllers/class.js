const Class = require("../models/Class");

function genClassCode(class_level, class_label, class_name) {
    var today = new Date();

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //2145MARApreIelts
    var year_digit = today.getFullYear().toString().substr(2, 2);
    var month = today.toLocaleString('default', { month: 'short' }).toUpperCase();
    return "".concat(year_digit, class_level,month,class_label,class_name);
}

exports.createClass = (req, res, next) => {
    
    var class_name = req.body.class_name;
    var class_code = genClassCode(class_level,class_label,class_name);

    const Class = new Class({
        class_name: req.body.class_name,
        class_code : class_code,
        slots: req.body.slots,
        number_of_sessions: req.body.slots,
        date_start: req.body.date_start,
        date_start: '06/05/1990',
        note: req.body.note,
        is_active: req.body.is_active,
        //
        class_session: req.body.class_session,
        student_list: req.body.student_list
        //creator: req.userData.userId
    });
    Class
        .save()
        .then(createdClass => {
            res.status(201).json({
                message: "Class added successfully",
                Class: {
                    ...createdClass,
                    id: createdClass._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a Class failed!"
            });
        });
};

exports.updateClass = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const Class = new Class({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    Class.updateOne({ _id: req.params.id, creator: req.userData.userId }, Class)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update Class!"
            });
        });
};

exports.getClass = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const ClassQuery = Class.find();

    if (pageSize && currentPage) {
        ClassQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    let fetchedClass;
    ClassQuery
        .then(documents => {
            fetchedClass = documents;
            return Class.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Class fetched successfully!",
                Class: fetchedClass,
                maxClass: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Class failed!"
            });
        });
};

exports.getClass = (req, res, next) => {

    Class.findById(req.params.id)
        .then(Class => {
            if (Class) {
                res.status(200).json(Class);
            } else {
                res.status(404).json({ message: "Class not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Class failed!"
            });
        });
};

exports.deleteClass = (req, res, next) => {
    Class.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
                message: "Deleting Class failed!"
            });
        });
};
