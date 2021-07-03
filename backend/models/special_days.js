const mongoose = require("mongoose");

const specialDaysSchema = mongoose.Schema({
  date: { type: Date, required: true },
  day_session: {type: String, require: false}, 
  reason: {type: String, require: true}
});

module.exports = mongoose.model("SpecialDays", specialDaysSchema);
