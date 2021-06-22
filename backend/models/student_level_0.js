const mongoose = require("mongoose");

const parentInfo = new mongoose.Schema({
  name: String,
  role: String,
  phone: String,
  email: String,
  facebook: String
});

const entry_test = new mongoose.Schema({
    date: Date,
    day_session: String,
    time: String,
    skill: String,
  });
  
  const final_test = new mongoose.Schema({
    date: Date,
    day_session: String,
    time: String,
    skill: String,
  });
  
const freeDay = new mongoose.Schema({
  day_session: String,
  weekdays_and_time :[date_time_data]
});

const date_time_data = new mongoose.Schema({
    day: String,
    time: String
})

const friends = new mongoose.Schema({
    student_id: String,
})

const enrolled_class_data = new mongoose.Schema({
    class_code_id: String,
})

const entry_test_data = new mongoose.Schema({
    class_code_id: String,
})

const final_test_data = new mongoose.Schema({
    class_code_id: String,
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
  is_returning_student: { type: Boolean, required : true },
  is_reminded: { type: Boolean },
  notes: { type: String, required: false },
  is_under_care : {type: Boolean},

  //friend_student_id_list: [friends],
  parent_info: parentInfo,
  free_days_list : [freeDay],

  class_code_enrolled:[enrolled_class_data],

  is_reminded_before_entry_test_date : {type: Boolean},
  is_reminded_before_final_test_date :{type: Boolean},
  is_attend_entry_test_date: {type: Boolean},
  is_attend_final_test_date: {type: Boolean},

  entry_test_result: 


});

module.exports = mongoose.model("StudentLevelZero", studentLevelZeroSchema);
