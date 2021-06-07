const mongoose = require("mongoose");

const studentLevelOne = mongoose.Schema({
  result: { type: Number, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("StudentLevelOne", studentLevelOne);
