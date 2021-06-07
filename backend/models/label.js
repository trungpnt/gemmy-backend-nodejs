const mongoose = require("mongoose");

const labelDescription = new mongoose.Schema({
  day: String,
  time_range: String
});

const labelSchema = mongoose.Schema({
  label_name: { type: String, required: true },
  description: [labelDescription]
});

module.exports = mongoose.model("Label", labelSchema);
