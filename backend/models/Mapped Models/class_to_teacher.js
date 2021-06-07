const mongoose = require("mongoose");

const assignedClasses = new mongoose.Schema({
    class_id : String,
    class_code : String,
    class_slots : Number
})

const classToTeacherSchema = mongoose.Schema({
  teacher_id: String,
  teacher_full_name: String,
  classes: [assignedClasses]
});

module.exports = mongoose.model("Class", classToTeacherSchema);
