const { Router } = require("express");
const Setting = require("../models/Setting");
const r = Router();

r.get("/", async (req, res) => {
  try {
    let s = await Setting.findOne();
    if (!s) s = await Setting.create({});
    res.json(s);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

r.put("/", async (req, res) => {
  try {
    const s = await Setting.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(s);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = r;
