const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  full_name: {type: String, required: true},
  dob :{type:String,require:true},
  phone :{type:String,require:true},
  email :{type:String,require:true, unique: true },
  facebook :{type:String,require:true},
  bank_account_number: { type: String, required: true },
  assigned_classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
