import { useState } from "react";
import { C, S } from "../styles/theme";
import { fmtDate, stateColor } from "../utils/helpers";
import { Modal, Confirm, FF, Badge } from "../components/UI";

function HorseForm({ initial, onSave, onClose }) {
  const def = { name: "", state: "HEALTHY", breed: "", age: "", stall: "", owner: "", sex: "Gelding", vaccination: "", arrival: "", training: "", history: [] };
  const [f, setF] = useState(initial || def);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FF label="Name"><input style={S.input} value={f.name} onChange={set("name")} /></FF>
        <FF label="Condition">
          <select style={S.input} value={f.state} onChange={set("state")}>
            {["HEALTHY","INJURY","SICK","REST"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </FF>
        <FF label="Breed"><input style={S.input} value={f.breed} onChange={set("breed")} /></FF>
        <FF label="Age (Years)"><input style={S.input} type="number" value={f.age} onChange={set("age")} /></FF>
        <FF label="Box"><input style={S.input} value={f.stall} onChange={set("stall")} /></FF>
        <FF label="Owner"><input style={S.input} value={f.owner} onChange={set("owner")} /></FF>
        <FF label="Sex">
          <select style={S.input} value={f.sex} onChange={set("sex")}>
            {["Stallion","Mare","Gelding"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </FF>
        <FF label="Vaccination"><input style={S.input} value={f.vaccination} onChange={set("vaccination")} /></FF>
        <FF label="Arrival date"><input style={S.input} type="date" value={f.arrival} onChange={set("arrival")} /></FF>
        <FF label="Training"><input style={S.input} value={f.training} onChange={set("training")} /></FF>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
        <button style={S.btn(C.btnBeige, C.text)} onClick={onClose}>Cancel</button>
        <button style={S.btn()} onClick={() => f.name && onSave(f)}>Save</button>
      </div>
    </>
  );
}

function HorseCard({ horse, onEdit, onDelete, onToggle, onAddHistory }) {
  const [showHF, setShowHF] = useState(false);
  const [hf, setHf] = useState({ date: "", type: "", doctor: "", clinic: "" });
  const pill = (bg, col = "#fff") => ({ backgroundColor: bg, color: col, border: "none", borderRadius: 20, padding: "5px 16px", fontSize: 11, cursor: "pointer" });

  return (
    <div style={{ borderRadius: 12, marginBottom: 12, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,.1)" }}>
      <div onClick={onToggle} style={{ backgroundColor: C.cardGreen, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", cursor: "pointer" }}>
        <div style={S.row}>
          <span style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>{horse.name}</span>
          <Badge label={horse.state} color={stateColor(horse.state)} />
          <span style={{ color: C.gold, fontSize: 14, marginLeft: 6 }}>{horse.open ? "∧" : "∨"}</span>
        </div>
        <div style={S.row} onClick={(e) => e.stopPropagation()}>
          <button style={pill(C.btnGreenL)} onClick={onEdit}>Edit</button>
          <button style={pill(C.cardInner, C.text)} onClick={onDelete}>Delete</button>
        </div>
      </div>

      {horse.open && (
        <div style={{ backgroundColor: C.card, padding: "18px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 10 }}>
            {[["BREED",horse.breed],["AGE",horse.age+" yrs"],["STALL",horse.stall],["OWNER",horse.owner],["SEX",horse.sex],["VACCINATION",horse.vaccination],["ARRIVAL",fmtDate(horse.arrival)],["TRAINING",horse.training]].map(([l,v]) => (
              <div key={l} style={{ backgroundColor: C.cardInner, borderRadius: 8, padding: "8px 12px" }}>
                <div style={S.lbl}>{l}</div>
                <div style={{ fontSize: 12, fontWeight: "500", color: C.text }}>{v || "–"}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, textTransform: "uppercase", color: C.text }}>Medical History :</span>
              <button style={S.btn(C.cardGreen, "#fff")} onClick={() => setShowHF((v) => !v)}>+ Add</button>
            </div>
            {showHF && (
              <div style={{ backgroundColor: C.white, borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  <FF label="Date"><input style={S.input} type="date" value={hf.date} onChange={(e) => setHf((p) => ({ ...p, date: e.target.value }))} /></FF>
                  <FF label="Type"><input style={S.input} value={hf.type} onChange={(e) => setHf((p) => ({ ...p, type: e.target.value }))} placeholder="Vaccination / Checkup…" /></FF>
                  <FF label="Doctor"><input style={S.input} value={hf.doctor} onChange={(e) => setHf((p) => ({ ...p, doctor: e.target.value }))} /></FF>
                  <FF label="Clinic"><input style={S.input} value={hf.clinic} onChange={(e) => setHf((p) => ({ ...p, clinic: e.target.value }))} /></FF>
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button style={S.btn(C.btnBeige, C.text)} onClick={() => setShowHF(false)}>Cancel</button>
                  <button style={S.btn()} onClick={() => { onAddHistory(horse._id, { ...hf, _id: Date.now().toString() }); setShowHF(false); setHf({ date: "", type: "", doctor: "", clinic: "" }); }}>Add</button>
                </div>
              </div>
            )}
            {(horse.history || []).length === 0 ? (
              <div style={{ fontSize: 12, color: C.textFaint }}>No records yet.</div>
            ) : (
              [...(horse.history || [])].sort((a, b) => b.date.localeCompare(a.date)).map((h, i) => (
                <div key={h._id || i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: i === 0 ? "#5A8A6A" : C.gold, fontSize: 9, marginTop: 4 }}>●</span>
                  <div>
                    <div style={{ fontSize: 10, color: C.textFaint }}>{fmtDate(h.date)}</div>
                    <div style={{ fontSize: 12, color: C.text }}>{h.type}</div>
                    <div style={{ fontSize: 10, color: C.textFaint }}>DOCTOR: {h.doctor} &nbsp; CLINIC: {h.clinic}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Horses({ horses, addHorse, updateHorse, deleteHorse }) {
  const [search, setSearch]   = useState("");
  const [modal, setModal]     = useState(null);
  const [confirm, setConfirm] = useState(null);

  const toggle = async (id) => {
    const h = horses.find((x) => x._id === id);
    await updateHorse(id, { open: !h.open });
  };
  const save = async (f) => {
    if (modal.type === "add") await addHorse({ ...f, open: false });
    else await updateHorse(modal.horse._id, f);
    setModal(null);
  };
  const del = async (id) => { await deleteHorse(id); setConfirm(null); };
  const addHistory = async (hid, rec) => {
    const h = horses.find((x) => x._id === hid);
    await updateHorse(hid, { history: [...(h.history || []), rec] });
  };

  const filtered = horses.filter((h) => [h.name, h.breed, h.owner].join(" ").toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={S.title}>Horses Management</div>
        <div style={S.row}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: C.textFaint }}>🔍</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Horse, Breed, Age, Owner..." style={{ ...S.input, paddingLeft: 30, borderRadius: 20, width: 230, border: `1px solid ${C.cardInner}` }} />
          </div>
          <button style={{ ...S.btn(), borderRadius: 8, padding: "7px 18px" }} onClick={() => setModal({ type: "add" })}>+ New horse</button>
        </div>
      </div>
      <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.textFaint, marginBottom: 16 }}>{filtered.length} horses in care</div>
      {filtered.map((h) => (
        <HorseCard key={h._id} horse={h} onToggle={() => toggle(h._id)} onEdit={() => setModal({ type: "edit", horse: h })} onDelete={() => setConfirm(h._id)} onAddHistory={addHistory} />
      ))}
      {modal && (
        <Modal title={modal.type === "add" ? "New Horse" : "Edit – " + modal.horse.name} onClose={() => setModal(null)}>
          <HorseForm initial={modal.horse} onSave={save} onClose={() => setModal(null)} />
        </Modal>
      )}
      {confirm && <Confirm msg="Delete this horse permanently?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
    </div>
  );
}
