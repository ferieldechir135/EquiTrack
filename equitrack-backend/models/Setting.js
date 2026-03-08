const { Schema, model } = require("mongoose");
const s = new Schema({
  name:     { type: String, default: "The Organization" },
  email:    { type: String, default: "admin@equitrack.com" },
  phone:    { type: String, default: "" },
  address:  { type: String, default: "" },
  currency: { type: String, default: "EUR" },
}, { timestamps: true });
module.exports = model("Setting", s);
