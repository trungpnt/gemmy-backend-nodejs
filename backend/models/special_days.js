const mongoose = require("mongoose");

const specialDaysSchema = mongoose.Schema({
  date: { type: Date, required: true },
  reason: {type: String}
});

module.exports = mongoose.model("SpecialDays", specialDaysSchema);
