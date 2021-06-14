const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    student_id: String,
    dob: Date,
    contact_info: String,
    test_date: Date,
    class_level_enrolled: String, //class code,
    discount_code: String,
    tuition_fee: Number,
    student_notes: String
});

const classSessionSchema = new mongoose.Schema({
    day: String,
    time_range: String
})

const classSchema = mongoose.Schema({

    class_name: { type: String, required: true },
    class_code: { type: String, required: true },
    //   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tuition_fee: {type: Number, required: true},
    slots: { type: Number, required: true },
    number_of_sessions: { type: Number, required: true },
    date_start: { type: Date, required: true },
    //remember to calculate
    date_end: { type: Date, required: true },
    is_active: { type: Boolean, required: true },

    class_session: [classSessionSchema],
    student_list: [studentSchema],
    class_note : {type: String, required: false}
});

module.exports = mongoose.model("Class", classSchema);
