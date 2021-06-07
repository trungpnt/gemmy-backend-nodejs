const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_id: String,
  dob: Date,
  contact_info: String,
  test_date : Date,
  class_level_enrolled: String, //class code,
  discount_code : String,
  tuition_fee : String,
  notes : String
});

const classSessionSchema = new mongoose.Schema({
  day: String,
  time_range: String
})

const classSchema = mongoose.Schema({
  class_name: { type: String, required: true },
  class_code: { type: String, required: true },
  label_id: { type: String, required: true },
  //
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //
  slots : { type: String, required: true },
  number_of_sessions: { type: String, required: true },
  date_start: { type: Date, required: true },
  date_end: { type: Date, required: true },
  status_name: { type: Boolean, required: true }, 

  class_session: [classSessionSchema],
  student_list: [studentSchema]

});


module.exports = mongoose.model("Class", classSchema);
