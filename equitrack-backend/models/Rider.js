const { Schema, model } = require("mongoose");
const s = new Schema({
  name:     String,
  level:    { type: String, default: "Beginner" },
  horse:    String,
  phone:    String,
  email:    String,
  joinDate: String,
  notes:    String,
}, { timestamps: true });
module.exports = model("Rider", s);
