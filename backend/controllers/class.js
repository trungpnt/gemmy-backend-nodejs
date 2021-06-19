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

function remainingDaysFromCourseEndDate(end_date) {
    var today = new Date();
    return end_date.getDate() - today.getDate();
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
                if (class_found) {
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
                else {
                    res.status(404).json({ message: "Class not found!" });
                }
            })
            .catch(error => {
                res.status(500).json({
                })
            })
    }

    //UPDATE STUDENT => ADD NEW STUDENT TO THIS CLASS
    else if (req.body.student_list != null && req.body.is_active == null && req.body.class_session == null) {
        Class.findById(req.params.id)
            .then(class_found => {
                if (class_found) {
                    //Logic to add new student
                    var current_list = class_found.student_list;
                    var list_size = req.body.student_list.length;
                    //Check if new number of students exceed current slots
                    if (list_size > class_found.remaining_slots) {
                        res.status(401).json({
                            message: "The class slot is full",
                            remaining_slots: class_found.remaining_slots,
                            new_slot_added: list_size
                        })
                    }
                    else {
                        //otherwise
                        for (var i = 0; i < list_size; i++) {
                            current_list.push(req.body.student_list[i]);
                        }
                        var new_size = current_list.length;
                        //Update student_list
                        class_found.student_list = current_list;

                        class_found.current_total_students = new_size;
                        //Update the remaining slots
                        class_found.remaining_slots = class_found.slots - new_size;

                        Class.updateOne({ _id: class_found._id }, class_found)
                            .then(result => {
                                if (result.n > 0) {
                                    res.status(200).json({
                                        message: "Update new student list successfully!",
                                        initial_slots: class_found.slots,
                                        new_slot_added: list_size,
                                        remaining_slots: class_found.remaining_slots,
                                        total_current_students: class_found.current_total_students,
                                        new_student_list: class_found.student_list,
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

exports.getClassTimeRange = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;

    const ClassQuery = Class.find({ is_active: true, remaining_slots: {$gt : 1} , }.select({student_list: 0}));

    

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
            res.status(200).json(
                [
                    {
                        message: "Class's time ranges fetched! successfully",
                        time_ranges: times,
                        maxClass: count,
                        ends_in: remainingDaysFromCourseEndDate()
                    },

                ]
            );
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Class failed!"
            });
        });
}

exports.getFutureClasses = (req, res, next) => {
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
            res.status(200).json(
                [
                    {
                        message: "Class's time ranges fetched! successfully",
                        time_ranges: times,
                        maxClass: count,
                        ends_in: remainingDaysFromCourseEndDate()
                    },

                ]
            )
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

exports.getClasses = (req, res, next) => {
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
