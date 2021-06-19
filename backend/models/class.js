const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    student_id: String,
    dob: Date,
    entry_test_result: Number,
    class_level_enrolled: String, //class code,
    discount_code: String,
    amount_paid: Number,
    amount_remaining: Number,
    student_notes: String
});

const classSessionSchema = new mongoose.Schema({
    day_session: String,
    day: String,
    time_range: String,
    skills: [String]
});

const classSchema = mongoose.Schema({

    class_name: { type: String, required: true },
    class_code: { type: String, required: true },
    class_level: {type: String, required: true},
    //   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tuition_fee: { type: Number, required: true },
    slots: { type: Number, required: true },
    total_sessions: { type: Number, required: true },
    date_start: { type: Date, required: true },
    //remember to calculate
    date_end: { type: Date, required: true },
    is_active: { type: Boolean, required: true },
    
    class_session: [classSessionSchema],
    student_list: [studentSchema],
    class_note: { type: String, required: false },

    //slot-management
    current_total_students: {type: Number, required: true},
    remaining_slots: {type: Number, required: true}
});

module.exports = mongoose.model("Class", classSchema);
