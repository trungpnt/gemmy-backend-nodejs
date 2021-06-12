const mongoose = require("mongoose");

const parentInfo = new mongoose.Schema({
  name: String,
  role: String,
  phone: Number,
  email: String,
  facebook: String
});

const freeDay = new mongoose.Schema({
  day: String,
  time: String
});

const friends = new mongoose.Schema({
    student_id: String,
})

const studentLevelZeroSchema = mongoose.Schema({
  full_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  contact_page_date: { type: Date, required: true },
  //
//   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //

  test_date: { type: Date, required: true },
  dob: { type: Date, required: true},
  test_time: { type: String, required: true },
  
  occupation: { type: String, required: true },
  is_returning: { type: Boolean },
  is_reminded: { type: Boolean },
  notes: { type: String, required: true },
  is_under_care : {type: Boolean},

  friend_student_id_list: [friends],
  parent_info: [parentInfo],
  free_days_list : [freeDay]
});

module.exports = mongoose.model("StudentLevelZero", studentLevelZeroSchema);
