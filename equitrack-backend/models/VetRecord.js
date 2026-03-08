const { Schema, model } = require("mongoose");
const s = new Schema({
  date:     String,
  horse:    String,
  type:     String,
  doctor:   String,
  clinic:   String,
  notes:    String,
  followUp: String,
}, { timestamps: true });
module.exports = model("VetRecord", s);
