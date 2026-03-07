// ═══════════════════════════════════════════════════════════════
// PAGE: FINANCES
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, S } from "../styles/theme";
import { uid, fmtDate, fmtMoney } from "../utils/helpers";
import { Modal, Confirm, FF } from "../components/UI";

const FIN_CATS = ["Feed", "Lessons", "Veterinary", "Farrier", "Equipment", "Salaries", "Other"];

export default function Finances({ transactions, setTransactions }) {
  const [modal, setModal]     = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [filter, setFilter]   = useState("All");
  const def = { date: "", label: "", type: "Expense", amount: 0, category: "Feed" };
  const [f, setF] = useState(def);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    if (modal === "add") setTransactions((ts) => [...ts, { ...f, id: uid(), amount: +f.amount }]);
    else setTransactions((ts) => ts.map((t) => t.id === modal ? { ...t, ...f, amount: +f.amount } : t));
    setModal(null);
  };
  const del      = (id) => { setTransactions((ts) => ts.filter((t) => t.id !== id)); setConfirm(null); };
  const income   = transactions.filter((t) => t.type === "Income").reduce((a, t) => a + t.amount, 0);
  const expense  = transactions.filter((t) => t.type === "Expense").reduce((a, t) => a + t.amount, 0);
  const filtered = transactions.filter((t) => filter === "All" || t.type === filter).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={S.title}>Finances</div>
        <button style={S.btn()} onClick={() => { setF(def); setModal("add"); }}>+ Add</button>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 22 }}>
        {[["Revenue", income, "#5A8A6A"], ["Expenses", expense, C.btnRed], ["Balance", income - expense, income - expense >= 0 ? "#5A8A6A" : C.btnRed]].map(([l, v, c]) => (
          <div key={l} style={{ backgroundColor: C.cardGreen, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 6 }}>{l}</div>
            <div style={{ fontSize: 24, fontWeight: "bold", color: c }}>{fmtMoney(v)}</div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["All", "Income", "Expense"].map((v) => (
          <button
            key={v} onClick={() => setFilter(v)}
            style={{ padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, backgroundColor: filter === v ? C.cardGreen : C.card, color: filter === v ? "#fff" : C.text }}
          >
            {v}
          </button>
        ))}
      </div>

      {filtered.map((t) => (
        <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: C.card, borderRadius: 8, padding: "10px 16px", marginBottom: 8 }}>
          <div style={{ width: 4, height: 38, borderRadius: 4, backgroundColor: t.type === "Income" ? "#5A8A6A" : C.btnRed }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: "bold", color: C.text }}>{t.label}</div>
            <div style={{ fontSize: 10, color: C.textFaint }}>{fmtDate(t.date)} · {t.category}</div>
          </div>
          <div style={{ fontWeight: "bold", color: t.type === "Income" ? "#5A8A6A" : C.btnRed, fontSize: 14 }}>
            {t.type === "Income" ? "+" : "–"}{fmtMoney(t.amount)}
          </div>
          <button style={S.btn(C.btnGreenL)} onClick={() => { setF({ ...t }); setModal(t.id); }}>✏️</button>
          <button style={S.btn(C.btnRed)}    onClick={() => setConfirm(t.id)}>🗑</button>
        </div>
      ))}

      {modal && (
        <Modal title={modal === "add" ? "New Transaction" : "Edit Transaction"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FF label="Label"><input style={S.input} value={f.label} onChange={set("label")} /></FF>
            <FF label="Type">
              <select style={S.input} value={f.type} onChange={set("type")}>
                <option>Income</option>
                <option>Expense</option>
              </select>
            </FF>
            <FF label="Amount (€)"><input style={S.input} type="number" value={f.amount} onChange={set("amount")} /></FF>
            <FF label="Category">
              <select style={S.input} value={f.category} onChange={set("category")}>
                {FIN_CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </FF>
            <FF label="Date"><input style={S.input} type="date" value={f.date} onChange={set("date")} /></FF>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
            <button style={S.btn(C.btnBeige, C.text)} onClick={() => setModal(null)}>Cancel</button>
            <button style={S.btn()} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {confirm && <Confirm msg="Delete this transaction?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
    </div>
  );
}
