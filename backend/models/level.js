const mongoose = require("mongoose");

const levelSchema = mongoose.Schema({
  level_description: { type: String, required: true },
});

module.exports = mongoose.model("Level", levelSchema);
