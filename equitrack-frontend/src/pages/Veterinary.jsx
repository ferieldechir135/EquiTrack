import { useState } from "react";
import { C, S } from "../styles/theme";
import { fmtDate } from "../utils/helpers";
import { Modal, Confirm, FF, Badge } from "../components/UI";

const VET_TYPES = ["Vaccination", "Checkup", "Injury Treatment", "Surgery", "Dental", "Other"];

export default function Veterinary({ vetRecords, addVetRecord, updateVetRecord, deleteVetRecord, horses }) {
  const [modal, setModal]     = useState(null);
  const [confirm, setConfirm] = useState(null);
  const def = { date: "", horse: "", type: "Checkup", doctor: "", clinic: "", notes: "", followUp: "" };
  const [f, setF] = useState(def);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const save = async () => {
    if (modal === "add") await addVetRecord(f);
    else await updateVetRecord(modal, f);
    setModal(null);
  };
  const del   = async (id) => { await deleteVetRecord(id); setConfirm(null); };
  const vtCol = (t) => t === "Injury Treatment" ? C.btnRed : t === "Vaccination" ? "#4A7A5A" : "#5A6A8A";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={S.title}>Veterinary</div>
        <button style={S.btn()} onClick={() => { setF(def); setModal("add"); }}>+ New Record</button>
      </div>

      {[...vetRecords].sort((a, b) => b.date.localeCompare(a.date)).map((r) => (
        <div key={r._id} style={{ backgroundColor: C.card, borderRadius: 10, padding: "14px 18px", marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: "bold", color: C.text }}>🐴 {r.horse}</span>
                <Badge label={r.type} color={vtCol(r.type)} />
              </div>
              <div style={{ fontSize: 12, color: C.text, marginBottom: 3 }}>{r.notes || "–"}</div>
              <div style={{ fontSize: 10, color: C.textFaint }}>
                Dr. {r.doctor} · {r.clinic} · {fmtDate(r.date)}
                {r.followUp && <> · <span style={{ color: C.gold }}>Follow-up: {fmtDate(r.followUp)}</span></>}
              </div>
            </div>
            <div style={S.row}>
              <button style={S.btn(C.btnGreenL)} onClick={() => { setF({ ...r }); setModal(r._id); }}>✏️</button>
              <button style={S.btn(C.btnRed)}    onClick={() => setConfirm(r._id)}>🗑</button>
            </div>
          </div>
        </div>
      ))}

      {modal && (
        <Modal title={modal === "add" ? "New Vet Record" : "Edit Vet Record"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FF label="Horse">
              <select style={S.input} value={f.horse} onChange={set("horse")}>
                <option value="">– Select –</option>
                {horses.map((h) => <option key={h._id}>{h.name}</option>)}
              </select>
            </FF>
            <FF label="Type">
              <select style={S.input} value={f.type} onChange={set("type")}>
                {VET_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </FF>
            <FF label="Date"><input style={S.input} type="date" value={f.date} onChange={set("date")} /></FF>
            <FF label="Follow-up Date"><input style={S.input} type="date" value={f.followUp} onChange={set("followUp")} /></FF>
            <FF label="Doctor"><input style={S.input} value={f.doctor} onChange={set("doctor")} /></FF>
            <FF label="Clinic"><input style={S.input} value={f.clinic} onChange={set("clinic")} /></FF>
          </div>
          <FF label="Notes">
            <textarea style={{ ...S.input, height: 70, resize: "vertical" }} value={f.notes} onChange={set("notes")} />
          </FF>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
            <button style={S.btn(C.btnBeige, C.text)} onClick={() => setModal(null)}>Cancel</button>
            <button style={S.btn()} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {confirm && <Confirm msg="Delete this vet record?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
    </div>
  );
}
