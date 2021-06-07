const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Account", accountSchema);
