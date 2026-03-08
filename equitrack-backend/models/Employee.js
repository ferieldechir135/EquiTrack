const { Schema, model } = require("mongoose");
const s = new Schema({
  name:      String,
  role:      String,
  phone:     String,
  email:     String,
  startDate: String,
  status:    { type: String, default: "Active" },
  salary:    Number,
}, { timestamps: true });
module.exports = model("Employee", s);
