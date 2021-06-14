const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    student_id: String,
    dob: Date,
    contact_info: String,
    test_date: Date,
    class_level_enrolled: String, //class code,
    discount_code: String,
    tuition_fee: String,
    student_notes: String
});

const classSessionSchema = new mongoose.Schema({
    day: String,
    time_range: String
})

const classSchema = mongoose.Schema({
    class_name: { type: String, required: true },
    //functionize this class code
    /*năm(21)+45(level)+Mar(tháng hiện tại)+A(label)+preIelts(className) => 2145MARApreIelts
  năm hiện tại,2 số đầu, tháng ( init 1st time only ), label_name,className
  backend */
    class_code: { type: String, required: true },
    //
    //   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    //
    tuition_fee: {type: Number, required: true},
    slots: { type: String, required: true },
    number_of_sessions: { type: String, required: true },
    date_start: { type: Date, required: true },
    //remember to calculate
    date_end: { type: Date, required: true },
    is_active: { type: Boolean, required: true },

    class_session: [classSessionSchema],
    student_list: [studentSchema],
    class_note : {type: String, required: false}
});


module.exports = mongoose.model("Class", classSchema);
