const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  user_roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }]
});

module.exports = mongoose.model("Account", accountSchema);
