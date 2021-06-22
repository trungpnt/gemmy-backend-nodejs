const StudentLevelZero = require("../models/student_level_0");

exports.createStudentLevelZero = (req, res, next) => {

    var parent_info = null;
    var friend_student_id_list = [];
    var is_under_care = false;

    // var entry_test_result = null;
    // var final_test_result = null;
    // var current_class_code_enrolled = null;
    // var is_reminded_before_entry_test_date = false;
    // var is_reminded_before_final_test_date = false;

    // var is_attend_entry_test_date = false;

    // var is_attend_final_test_date = false;

    // if (req.body.parent_info != null){
    //     parent_info = req.body.parent_info;
    //     is_under_care = true;
    // }

    // if (req.body.entry_test_result != null){
    //     entry_test_result = req.body.entry_test_result;
    // }

    if (req.body.friend_student_id_list != null){
        friend_student_id_list = req.body.friend_student_id_list;
    }

    const studentLevelZero = new StudentLevelZero({

        full_name: req.body.full_name,
        phone_number: req.body.phone_number,
        contact_page_date: req.body.contact_page_date,
        dob: req.body.dob,
        entry_test_datetime: req.body.entry_test_datetime,
        final_test_datetime: req.body.final_test_datetime,
        occupation: req.body.occupation,
        is_returning_student: req.body.is_returning_student,
        is_reminded_before_entry_test_date: req.body.is_reminded_before_entry_test_date,
        notes: req.body.notes,
        is_under_care: is_under_care,
        
        friend_student_id_list: req.body.friend_student_id_list,
        parent_info: req.body.parent_info,

        free_days_list: req.body.free_days_list,
        
        previous_class_code_enrolled: req.body.previous_class_code_enrolled,

        current_class_code_enrolled: req.body.current_class_code_enrolled,

        is_reminded_before_entry_test_date:  req.body.is_reminded_before_entry_test_date,

        is_reminded_before_final_test_date: req.body.is_reminded_before_final_test_date,

        applied_offer : req.body.applied_offer,

        entry_test_result : req.body.entry_test_result,
        final_test_result: req.body.final_test_result
    });

    studentLevelZero
        .save()
        .then( createdStudentLevelZero => {
            res.status(201).json({
                message: "StudentLevelZero added successfully",
                student_level_zero: createdStudentLevelZero,
                id: createdStudentLevelZero._id
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a student-level-zero failed!"
            });
        });
};

exports.updateStudentLevelZero = (req, res, next) => {

    const parent_info = null;
    const friend_student_id_list = null;

    if (req.body.parent_info != null){
        parent_info = req.body.parent_info;
    }

    if (req.body.friend_student_id_list != null){
        friend_student_id_list = req.body.friend_student_id_list;
    }

    const studentLevelZero = new StudentLevelZero({
        _id : req.body.id,
        full_name: req.body.full_name,
        phone_number: req.body.phone_number,
        test_date: req.body.test_date,
        contact_page_day: req.body.full_name,
        is_young_buffalo: req.body.full_name,
        dob: req.body.full_name,
        occupation: req.body.full_name,
        test_time: req.body.test_time,
        //optional 
        friend_student_id_list: friend_student_id_list,

        //optional
        parent_info: parent_info,
        free_days_list: req.body.free_days_list,
        is_returning_student: req.body.is_returning_student,
        is_reminded: req.body.is_reminded,
        notes: req.body.notes

    });
    studentLevelZero.updateOne({ _id: req.params.id, creator: req.userData.userId }, StudentLevelZero)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't udpate studentlevelzero!"
            });
        });
};

exports.getStudentLevelZeros = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const studentLevelZeroQuery = StudentLevelZero.find();

    if (pageSize && currentPage) {
        studentLevelZeroQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    let fetchedStudentLevelZeros;
    studentLevelZeroQuery
        .then(documents => {
            //modiy this fetched to return suitable fields
            fetchedStudentLevelZeros = documents;
            return StudentLevelZero.count();
        })
        .then(count => {
            res.status(200).json({
                message: "StudentLevelZeros fetched successfully!",
                student_level_zeros: fetchedStudentLevelZeros,
                max_student_level_zeros: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching studentlevelzeros failed!"
            });
        });
};

exports.getStudentLevelZero = (req, res, next) => {
    StudentLevelZero.findById(req.params.id)
        .then(studentLevelZero => {
            if (studentLevelZero) {
                res.status(200).json(studentLevelZero);
            } else {
                res.status(404).json({ message: "StudentLevelZero not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching studentlevelzero failed!"
            });
        });
};

exports.deleteStudentLevelZero = (req, res, next) => {
    StudentLevelZero.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
                message: "Deleting studentlevelzeros failed!"
            });
        });
};
