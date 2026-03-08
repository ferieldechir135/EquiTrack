const { Schema, model } = require("mongoose");
const s = new Schema({
  category: String,
  emoji:    String,
  name:     String,
  qty:      Number,
  maxQty:   Number,
  unit:     String,
}, { timestamps: true });
module.exports = model("Inventory", s);
