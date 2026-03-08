const { Schema, model } = require("mongoose");
const s = new Schema({
  name:        String,
  state:       { type: String, default: "HEALTHY" },
  breed:       String,
  age:         String,
  stall:       String,
  owner:       String,
  sex:         String,
  vaccination: String,
  arrival:     String,
  training:    String,
  open:        { type: Boolean, default: false },
  history:     [{ date: String, type: String, doctor: String, clinic: String }],
}, { timestamps: true });
module.exports = model("Horse", s);
