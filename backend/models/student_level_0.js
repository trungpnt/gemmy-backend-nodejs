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

const studentLevelZeroSchema = mongoose.Schema({
  full_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  contact_page_date: { type: String, is_small_children: true },
  //
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //
  test_date: { type: Date, required: true },
  test_time: { type: String, required: true },
  occupation: { type: String, required: true },
  dob: { type: Date, required: true },
  is_returning: { type: Boolean, required: true },

  is_reminded: { type: Boolean, required: true },

  notes: { type: String, required: true },
  
  //Schema begins
  parent_info: [parentInfo],
  free_days_list : [freeDay]
});

module.exports = mongoose.model("StudentLevelZero", studentLevelZeroSchema);
