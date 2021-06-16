const Class = require("../models/class");

function genClassCode(class_level, class_label, class_name) {
    var today = new Date();
    //2145MARApreIelts
    var year_digit = today.getFullYear().toString().substr(2, 2);
    var month = today.toLocaleString('default', { month: 'short' }).toUpperCase();
    return "".concat(year_digit, class_level, month, class_label, class_name);
}

function getEndDate(total_sessions, start_date) {

}


exports.createClass = (req, res, next) => {

    var class_code = genClassCode(req.body.class_level, req.body.class_label, req.body.class_name);

    Class.findOne({ class_code: class_code })
        .then(result => {
            if (result) {
                res.status(200).json({ message: "The class_code with the same name already exists !" });
            } else {
                const classModel = new Class({
                    class_name: req.body.class_name,
                    class_code: class_code,
                    slots: req.body.slots,
                    tuition_fee: req.body.tuition_fee,
                    total_sessions: req.body.total_sessions,
                    date_start: req.body.date_start,
                    date_end: "06/05/1990",
                    note: req.body.note,
                    is_active: req.body.is_active,

                    class_session: req.body.class_session,
                    student_list: req.body.student_list,
                    //slots management - calculation
                    current_total_students: req.body.student_list.length,
                    remaining_slots: req.body.slots - req.body.student_list.length
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

    //Update a full class
    if (req.body.class_label != null && req.body.class_level != null && req.body.class_name) {
        
        Class.findById(req.params.id)
            .then(class_found => {
                if(class_found){
                    var class_code = genClassCode(req.body.class_level, req.body.class_label, req.body.class_name);

                const classModel = new Class({
                    _id: req.body.id,
                    class_name: req.body.class_name,
                    class_code: class_code,
                    slots: req.body.slots,
                    tuition_fee: req.body.tuition_fee,
                    total_sessions: req.body.total_sessions,
                    date_start: req.body.date_start,
                    date_end: "06/05/1990",
                    note: req.body.note,
                    is_active: req.body.is_active,

                    class_session: req.body.class_session,
                    student_list: req.body.student_list,

                    current_total_students: req.body.student_list.length,
                    remaining_slots: req.body.slots - req.body.student_list.length
                });

                class_found = classModel;

                Class.findOne({ class_code: class_code })
                    .then(result => {
                        if (result) {
                            res.status(200).json({ message: "The class_code with the same name already exists !" });
                        } else {


                            Class.updateOne({ _id: classModel._id }, classModel)
                                .then(result => {
                                    if (result.n > 0) {
                                        res.status(200).json({
                                            message: "Update new class successfully",
                                            updated_class: classModel
                                        });
                                    } else {
                                        res.status(401).json({ message: "Not authorized!" });
                                    }
                                })
                                .catch(error => {
                                    res.status(500).json({
                                        message: "Couldn't update Class!"
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
                else{
                    res.status(404).json({ message: "Class not found!" });
                }
            })
            .catch(error => {
                res.status(500).json({
                })
            })
    }

    //UPDATE JUST THE CLASS ACTIVE STATUS
    else {
        Class.findById(req.params.id)
            .then(class_found => {
                if (class_found) {
                    class_found.is_active = req.body.is_active
                    Class.updateOne({ _id: req.params.id }, class_found)
                        .then(result => {
                            if (result.n > 0) {
                                res.status(200).json({
                                    message: "Update new class active status successfully!",
                                    class_active_status: req.body.is_active
                                });
                            } else {
                                res.status(401).json({ message: "Not authorized!" });
                            }
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: "Couldn't update Class!"
                            });
                        });
                } else {
                    res.status(404).json({ message: "Class not found!" });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: "Fetching Class failed!"
                });
            });

    }
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
