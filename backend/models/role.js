const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
  role_name: { type: String, required: true },
  description: {type: String, require: false}
});

module.exports = mongoose.model("Roles", rolesSchema);