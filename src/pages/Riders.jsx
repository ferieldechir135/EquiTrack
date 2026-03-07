// ═══════════════════════════════════════════════════════════════
// PAGE: RIDERS
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, S } from "../styles/theme";
import { uid, fmtDate } from "../utils/helpers";
import { Modal, Confirm, FF, Badge } from "../components/UI";

export default function Riders({ riders, setRiders, horses }) {
  const [modal, setModal]     = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [search, setSearch]   = useState("");

  const def = { name: "", level: "Beginner", horse: "", phone: "", email: "", joinDate: "", notes: "" };
  const [f, setF] = useState(def);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    if (modal === "add") setRiders((rs) => [...rs, { ...f, id: uid() }]);
    else setRiders((rs) => rs.map((r) => r.id === modal ? { ...r, ...f } : r));
    setModal(null);
  };
  const del = (id) => { setRiders((rs) => rs.filter((r) => r.id !== id)); setConfirm(null); };
  const levelColor = (l) => l === "Advanced" ? C.btnGreen : l === "Intermediate" ? "#8A7A4A" : "#6A8A9A";
  const filtered = riders.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={S.title}>Riders</div>
        <div style={S.row}>
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rider…"
            style={{ ...S.input, borderRadius: 20, width: 200 }}
          />
          <button style={S.btn()} onClick={() => { setF(def); setModal("add"); }}>+ New rider</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {filtered.map((r) => (
          <div key={r.id} style={{ backgroundColor: C.card, borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: "bold", color: C.text, marginBottom: 4 }}>{r.name}</div>
                <Badge label={r.level} color={levelColor(r.level)} />
              </div>
              <div style={S.row}>
                <button style={S.btn(C.btnGreenL)} onClick={() => { setF({ ...r }); setModal(r.id); }}>✏️</button>
                <button style={S.btn(C.btnRed)}    onClick={() => setConfirm(r.id)}>🗑</button>
              </div>
            </div>
            {[["🐴", r.horse || "–"], ["📞", r.phone || "–"], ["✉️", r.email || "–"], ["📅", fmtDate(r.joinDate)]].map(([ic, v]) => (
              <div key={ic} style={{ fontSize: 12, color: C.text, marginBottom: 5 }}>
                <span style={{ opacity: 0.5 }}>{ic} </span>{v}
              </div>
            ))}
            {r.notes && <div style={{ marginTop: 8, fontSize: 11, color: C.textFaint, fontStyle: "italic" }}>{r.notes}</div>}
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal === "add" ? "New Rider" : "Edit Rider"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FF label="Name"><input style={S.input} value={f.name} onChange={set("name")} /></FF>
            <FF label="Level">
              <select style={S.input} value={f.level} onChange={set("level")}>
                {["Beginner", "Intermediate", "Advanced"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </FF>
            <FF label="Horse">
              <select style={S.input} value={f.horse} onChange={set("horse")}>
                <option value="">– None –</option>
                {horses.map((h) => <option key={h.id}>{h.name}</option>)}
              </select>
            </FF>
            <FF label="Phone"><input style={S.input} value={f.phone} onChange={set("phone")} /></FF>
            <FF label="Email"><input style={S.input} type="email" value={f.email} onChange={set("email")} /></FF>
            <FF label="Join Date"><input style={S.input} type="date" value={f.joinDate} onChange={set("joinDate")} /></FF>
          </div>
          <FF label="Notes">
            <textarea style={{ ...S.input, height: 60, resize: "vertical" }} value={f.notes} onChange={set("notes")} />
          </FF>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button style={S.btn(C.btnBeige, C.text)} onClick={() => setModal(null)}>Cancel</button>
            <button style={S.btn()} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {confirm && <Confirm msg="Delete this rider?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
    </div>
  );
}
