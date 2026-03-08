// ═══════════════════════════════════════════════════════════════
// PAGE: DASHBOARD
// ═══════════════════════════════════════════════════════════════
import { C, S } from "../styles/theme";
import { fmtDate, fmtMoney, stateColor } from "../utils/helpers";
import { Badge } from "../components/UI";

export default function Dashboard({ horses, riders, events, inventory, transactions }) {
  const today    = new Date().toISOString().slice(0, 10);
  const lowStock = inventory.filter((i) => i.qty / i.maxQty < 0.25).length;
  const income   = transactions.filter((t) => t.type === "Income").reduce((a, t) => a + t.amount, 0);
  const expense  = transactions.filter((t) => t.type === "Expense").reduce((a, t) => a + t.amount, 0);
  const upcoming = [...events].filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);

  const statCards = [
    { label: "Horses in Care",    value: horses.length,  col: C.cardGreen },
    { label: "Active Riders",     value: riders.length,  col: C.cardGreen },
    { label: "Events This Month", value: events.filter((e) => e.date.startsWith("2026-03")).length, col: C.cardGreen },
    { label: "Low Stock Items",   value: lowStock, col: lowStock > 0 ? C.btnRed : C.cardGreen },
  ];

  return (
    <div>
      <div style={S.title}>Dashboard</div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {statCards.map((sc) => (
          <div key={sc.label} style={{ backgroundColor: sc.col, borderRadius: 12, padding: "22px 18px", color: "#fff" }}>
            <div style={{ fontSize: 36, fontWeight: "bold", lineHeight: 1 }}>{sc.value}</div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 6, opacity: 0.85 }}>{sc.label}</div>
          </div>
        ))}
      </div>

      {/* Lower panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {/* Upcoming events */}
        <div style={{ backgroundColor: C.cardGreen, borderRadius: 12, padding: 20, color: "#fff" }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.65, marginBottom: 14 }}>
            Upcoming Events
          </div>
          {upcoming.length === 0 ? (
            <div style={{ fontSize: 12, opacity: 0.4 }}>Aucun</div>
          ) : (
            upcoming.map((e) => (
              <div
                key={e.id}
                style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.1)", fontSize: 12 }}
              >
                <span>{e.title}</span>
                <span style={{ color: C.gold, fontSize: 10 }}>{fmtDate(e.date)}</span>
              </div>
            ))
          )}
        </div>

        {/* Finances */}
        <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.textFaint, marginBottom: 14 }}>
            Finances (this month)
          </div>
          {[["Income", income, "#5A8A6A"], ["Expenses", expense, C.btnRed], ["Balance", income - expense, income - expense >= 0 ? "#5A8A6A" : C.btnRed]].map(([l, v, c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: C.text }}>{l}</span>
              <span style={{ fontWeight: "bold", color: c }}>{fmtMoney(v)}</span>
            </div>
          ))}
        </div>

        {/* Horse states */}
        <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.textFaint, marginBottom: 14 }}>
            Horses Condition
          </div>
          {horses.slice(0, 6).map((h) => (
            <div
              key={h.id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: `1px solid ${C.cardInner}` }}
            >
              <span style={{ fontSize: 12, color: C.text }}>{h.name}</span>
              <Badge label={h.state} color={stateColor(h.state)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
