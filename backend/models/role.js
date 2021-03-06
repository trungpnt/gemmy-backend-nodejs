const mongoose = require("mongoose");

// // permission_name example : 'student_read' , 'student_write' , 'class_read', 'class_write'
// const permissionSchema = mongoose.Schema({
//   permission_name: { type: String, required: true }
// });

//role_name example : 'super_admin', 'user'
const rolesSchema = mongoose.Schema({
  role_name: { type: String, required: true },
  description: {type: String, require: true},
  permissions:[{ type: String, required: true }]
});

module.exports = mongoose.model("Role", rolesSchema);