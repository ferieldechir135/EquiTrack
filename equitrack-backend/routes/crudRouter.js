const { Router } = require("express");

module.exports = function crudRouter(Model) {
  const r = Router();

  r.get("/", async (req, res) => {
    try { res.json(await Model.find().sort({ createdAt: 1 })); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  r.post("/", async (req, res) => {
    try { res.status(201).json(await Model.create(req.body)); }
    catch (e) { res.status(400).json({ error: e.message }); }
  });

  r.put("/:id", async (req, res) => {
    try { res.json(await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
    catch (e) { res.status(400).json({ error: e.message }); }
  });

  r.delete("/:id", async (req, res) => {
    try { await Model.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
    catch (e) { res.status(400).json({ error: e.message }); }
  });

  return r;
};
