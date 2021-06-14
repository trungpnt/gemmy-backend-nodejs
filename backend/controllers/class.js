const Class = require("../models/class");

function genClassCode(class_level, class_label, class_name) {
    var today = new Date();
    //2145MARApreIelts
    var year_digit = today.getFullYear().toString().substr(2, 2);
    var month = today.toLocaleString('default', { month: 'short' }).toUpperCase();
    return "".concat(year_digit, class_level, month, class_label, class_name);
}

function getEndDate(total_sessions,start_date) {

}

exports.createClass = (req, res, next) => {

    var class_code = genClassCode(req.body.class_level, req.body.class_label, req.body.class_name);

    Class.findOne({ class_code: class_code })
        .then(result => {
            if (result) {
                res.status(200).json({ message: "The class_code with the same name already exists !" });
            } else {
                classModel = new Class({
                    class_name: req.body.class_name,
                    class_code: class_code,
                    slots: req.body.slots,
                    tuition_fee: req.body.tuition_fee,
                    total_sessions: req.body.total_sessions,
                    date_start: req.body.date_start,
                    date_end: "06/05/1990",
                    note: req.body.note,
                    is_active: req.body.is_active,  
                    //the problem starts here!    
                    class_session: req.body.class_session,
                    student_list: req.body.student_list
                });
                classModel
                    .save()
                    .then(createdClass => {
                        res.status(201).json({
                            message: "Class added successfully",
                            created_class: createdClass
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: "Creating a class failed!"
                        });
                    });
            }
        })
        .catch(error => {
            res.status(501).json({
                message: "Please check your inputs and try again!"
            });
        });
}


exports.updateClass = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const classModel = new Class({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    classModel.updateOne({ _id: req.params.id, creator: req.userData.userId }, classModel)
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
                class: fetchedClass,
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
        .then(class_found => {
            if (class_found) {
                res.status(200).json(class_found);
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
