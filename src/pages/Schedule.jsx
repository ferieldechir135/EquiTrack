// ═══════════════════════════════════════════════════════════════
// PAGE: SCHEDULE
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, S } from "../styles/theme";
import { uid, fmtDate, evtColor, MONTHS } from "../utils/helpers";
import { Modal, Confirm, FF, Badge } from "../components/UI";

export default function Schedule({ events, setEvents, horses, riders }) {
  const [viewMode, setViewMode] = useState("Monthly");
  const [curDate, setCurDate]   = useState(new Date(2026, 2, 1));
  const [modal, setModal]       = useState(null);
  const [confirm, setConfirm]   = useState(null);
  const def = { date: "", title: "", type: "Training", horse: "", rider: "", notes: "" };
  const [f, setF] = useState(def);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const yr = curDate.getFullYear(), mo = curDate.getMonth();
  const dim   = new Date(yr, mo + 1, 0).getDate();
  const fd    = new Date(yr, mo, 1).getDay();
  const cells = Array(fd).fill(null).concat(Array.from({ length: dim }, (_, i) => i + 1));
  const dayStr    = (d) => `${yr}-${String(mo + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const evFor     = (d) => events.filter((e) => e.date === dayStr(d));
  const today     = new Date().toISOString().slice(0, 10);
  const moStr     = `${yr}-${String(mo + 1).padStart(2, "0")}`;
  const moEvts    = events.filter((e) => e.date.startsWith(moStr));
  const todayEvts = events.filter((e) => e.date === today);

  const save    = () => { if (modal === "add") setEvents((es) => [...es, { ...f, id: uid() }]); else setEvents((es) => es.map((e) => e.id === modal ? { ...e, ...f } : e)); setModal(null); };
  const del     = (id) => { setEvents((es) => es.filter((e) => e.id !== id)); setConfirm(null); };
  const openEdit = (ev) => { setF({ ...ev }); setModal(ev.id); };
  const openAdd  = (date = "") => { setF({ ...def, date }); setModal("add"); };

  const vpill = (active) => ({
    padding: "7px 18px", borderRadius: active ? 24 : 20, border: "none", cursor: "pointer",
    fontSize: 12, letterSpacing: 0.3,
    backgroundColor: active ? C.cardGreen : C.card,
    color: active ? "#fff" : C.text,
    boxShadow: active ? "0 2px 8px rgba(0,0,0,.18)" : "none",
  });

  return (
    <div>
      <div style={S.title}>Schedule</div>

      <div style={{ fontSize: 11, color: C.textMid, marginBottom: 16 }}>
        <span style={{ marginRight: 24 }}>** <b>{moEvts.length}</b> events this month</span>
        <span>** <b>{todayEvts.length}</b> lessons today</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["Monthly", "Weekly", "Daily"].map((v) => (
            <button key={v} style={vpill(viewMode === v)} onClick={() => setViewMode(v)}>{v} view</button>
          ))}
        </div>
        <button style={{ ...S.btn(C.cardGreen), borderRadius: 8, padding: "7px 18px", fontSize: 12 }} onClick={() => openAdd()}>
          +New event
        </button>
      </div>

      {/* Calendar */}
      <div style={{ backgroundColor: C.cardGreen, borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 18px", gap: 8 }}>
          <button style={{ ...S.btn(C.card, C.text), borderRadius: 8, padding: "4px 12px" }} onClick={() => setCurDate(new Date(yr, mo - 1, 1))}>{"<"}</button>
          <button style={{ ...S.btn(C.card, C.text), borderRadius: 8, padding: "4px 12px" }} onClick={() => setCurDate(new Date(yr, mo + 1, 1))}>{">"}</button>
          <span style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: 18, letterSpacing: 4, fontWeight: "bold" }}>
            {MONTHS[mo].toUpperCase()} {yr}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", backgroundColor: C.card }}>
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d} style={{ textAlign: "center", padding: "8px 0", fontSize: 9, letterSpacing: 2, fontWeight: "bold", color: C.text }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, backgroundColor: C.cardInner }}>
          {cells.map((day, i) => (
            <div
              key={i}
              onClick={() => day && openAdd(dayStr(day))}
              style={{ minHeight: 72, backgroundColor: C.pageBg, padding: "5px 6px", cursor: day ? "pointer" : "default" }}
            >
              {day && (
                <>
                  <div style={{ fontSize: 11, color: C.textFaint, marginBottom: 3 }}>{day}</div>
                  {evFor(day).map((ev) => (
                    <div
                      key={ev.id}
                      onClick={(e) => { e.stopPropagation(); openEdit(ev); }}
                      style={{ backgroundColor: evtColor(ev.type), color: "#fff", borderRadius: 4, fontSize: 9, padding: "2px 5px", marginBottom: 2, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", cursor: "pointer" }}
                    >
                      {ev.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* List view */}
      {viewMode !== "Monthly" && (
        <div style={{ marginBottom: 14 }}>
          {moEvts.length === 0 && <div style={{ fontSize: 13, color: C.textFaint, padding: "12px 0" }}>No events this month.</div>}
          {[...moEvts].sort((a, b) => a.date.localeCompare(b.date)).map((ev) => (
            <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: C.card, borderRadius: 8, padding: "10px 14px", marginBottom: 8 }}>
              <div style={{ width: 4, height: 38, borderRadius: 4, backgroundColor: evtColor(ev.type) }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: C.text }}>{ev.title}</div>
                <div style={{ fontSize: 10, color: C.textFaint }}>
                  {fmtDate(ev.date)}{ev.horse && ` · 🐴 ${ev.horse}`}{ev.rider && ` · 👤 ${ev.rider}`}
                </div>
              </div>
              <Badge label={ev.type} color={evtColor(ev.type)} />
              <button style={S.btn(C.btnGreenL)} onClick={() => openEdit(ev)}>✏️</button>
              <button style={S.btn(C.btnRed)}    onClick={() => setConfirm(ev.id)}>🗑</button>
            </div>
          ))}
        </div>
      )}

      {/* Today's plan */}
      <div style={{ backgroundColor: C.card, borderRadius: 10, padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: "bold", color: C.text }}>
            Today's Plan – {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
          </span>
          <span style={{ color: C.gold, fontSize: 16 }}>∨</span>
        </div>
        {todayEvts.length === 0 ? (
          <div style={{ fontSize: 12, color: C.textFaint, marginTop: 8 }}>No events today.</div>
        ) : (
          todayEvts.map((ev) => (
            <div key={ev.id} style={{ fontSize: 12, color: C.text, padding: "6px 0", borderBottom: `1px solid ${C.cardInner}`, marginTop: 4 }}>
              {ev.title} {ev.notes && <span style={{ opacity: 0.5 }}>– {ev.notes}</span>}
            </div>
          ))
        )}
      </div>

      {modal && (
        <Modal title={modal === "add" ? "New Event" : "Edit Event"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FF label="Title"><input style={S.input} value={f.title} onChange={set("title")} /></FF>
            <FF label="Type">
              <select style={S.input} value={f.type} onChange={set("type")}>
                {["Training", "Competition", "Medical", "Maintenance", "Other"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FF>
            <FF label="Date"><input style={S.input} type="date" value={f.date} onChange={set("date")} /></FF>
            <FF label="Horse">
              <select style={S.input} value={f.horse} onChange={set("horse")}>
                <option value="">– None –</option>
                {horses.map((h) => <option key={h.id}>{h.name}</option>)}
              </select>
            </FF>
            <FF label="Rider">
              <select style={S.input} value={f.rider} onChange={set("rider")}>
                <option value="">– None –</option>
                {riders.map((r) => <option key={r.id}>{r.name}</option>)}
              </select>
            </FF>
            <FF label="Notes"><input style={S.input} value={f.notes} onChange={set("notes")} /></FF>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
            <button style={S.btn(C.btnBeige, C.text)} onClick={() => setModal(null)}>Cancel</button>
            <button style={S.btn()} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {confirm && <Confirm msg="Delete this event?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
    </div>
  );
}
