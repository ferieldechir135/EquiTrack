const { Schema, model } = require("mongoose");
const s = new Schema({
  date:     String,
  label:    String,
  type:     { type: String, enum: ["Income", "Expense"] },
  amount:   Number,
  category: String,
}, { timestamps: true });
module.exports = model("Transaction", s);
