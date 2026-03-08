const { Schema, model } = require("mongoose");
const s = new Schema({
  date:  String,
  title: String,
  type:  { type: String, default: "Training" },
  horse: String,
  rider: String,
  notes: String,
}, { timestamps: true });
module.exports = model("Event", s);
