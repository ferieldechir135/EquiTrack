const express    = require("express");
const mongoose   = require("mongoose");
const cors       = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/horses",       require("./routes/horses"));
app.use("/api/riders",       require("./routes/riders"));
app.use("/api/events",       require("./routes/events"));
app.use("/api/inventory",    require("./routes/inventory"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/employees",    require("./routes/employees"));
app.use("/api/vetrecords",   require("./routes/vetrecords"));
app.use("/api/settings",     require("./routes/settings"));

// ─── MongoDB ─────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
