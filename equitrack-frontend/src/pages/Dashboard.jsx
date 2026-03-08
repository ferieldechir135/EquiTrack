import { C, S } from "../styles/theme";
import { fmtDate, fmtMoney, stateColor } from "../utils/helpers";
import { Badge } from "../components/UI";

function BarChart({ transactions }) {
  const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const currentYear = new Date().getFullYear();

  const monthlyData = monthNames
    .map((label, i) => {
      const monthStr = `${currentYear}-${String(i + 1).padStart(2, "0")}`;
      const income  = transactions.filter((t) => t.type === "Income"  && t.date.startsWith(monthStr)).reduce((a, t) => a + t.amount, 0);
      const expense = transactions.filter((t) => t.type === "Expense" && t.date.startsWith(monthStr)).reduce((a, t) => a + t.amount, 0);
      return { label, income, expense };
    })
    .filter((m) => m.income > 0 || m.expense > 0);

  if (monthlyData.length === 0) {
    return <div style={{ fontSize: 12, color: C.textFaint, padding: "20px 0" }}>Aucune donnée.</div>;
  }

  const maxVal = Math.max(...monthlyData.flatMap((m) => [m.income, m.expense]), 1);
  const chartH  = 160;
  const BAR_W   = 18;
  const BAR_GAP = 4;
  const GRP_GAP = 28;

  const yLabels = [maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 10, height: chartH, flexShrink: 0, width: 52 }}>
          {yLabels.map((v) => <span key={v} style={{ fontSize: 9, color: C.textFaint, lineHeight: 1 }}>{v}</span>)}
        </div>

        <div style={{ flex: 1, overflowX: "auto" }}>
          <div style={{ position: "relative", height: chartH, minWidth: monthlyData.length * (BAR_W * 2 + BAR_GAP + GRP_GAP) }}>
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
              <div key={pct} style={{ position: "absolute", top: `${(1 - pct) * chartH}px`, left: 0, right: 0, borderTop: `1px solid ${C.cardInner}`, zIndex: 0 }} />
            ))}
            <div style={{ position: "absolute", bottom: 0, left: 0, display: "flex", alignItems: "flex-end", gap: GRP_GAP, zIndex: 1 }}>
              {monthlyData.map((m) => (
                <div key={m.label} style={{ display: "flex", alignItems: "flex-end", gap: BAR_GAP, flexShrink: 0 }}>
                  <div style={{ width: BAR_W, backgroundColor: C.btnGreen, borderRadius: "3px 3px 0 0", height: m.income  > 0 ? `${Math.max(2, (m.income  / maxVal) * chartH)}px` : "0px" }} />
                  <div style={{ width: BAR_W, backgroundColor: C.btnRed,   borderRadius: "3px 3px 0 0", height: m.expense > 0 ? `${Math.max(2, (m.expense / maxVal) * chartH)}px` : "0px" }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: GRP_GAP, marginTop: 6 }}>
            {monthlyData.map((m) => (
              <div key={m.label} style={{ width: BAR_W * 2 + BAR_GAP, textAlign: "center", fontSize: 9, color: C.textFaint, flexShrink: 0 }}>{m.label}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.textMid }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: C.btnGreen }} /> Revenue
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.textMid }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: C.btnRed }} /> Expenses
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ horses, riders, events, inventory, transactions, employees, currency }) {
  const today    = new Date().toISOString().slice(0, 10);
  const lowStock = inventory.filter((i) => i.qty / i.maxQty < 0.25).length;
  const income   = transactions.filter((t) => t.type === "Income").reduce((a, t) => a + t.amount, 0);
  const expense  = transactions.filter((t) => t.type === "Expense").reduce((a, t) => a + t.amount, 0);
  const balance  = income - expense;
  const upcoming = [...events].filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);

  const chartKey = transactions.map((t) => `${t.id}-${t.amount}-${t.type}-${t.date}`).join("|");

  const statCards = [
    { label: "Horses",   value: horses.length,                    icon: "🐴" },
    { label: "Employees",  value: employees ? employees.length : 0, icon: "👥" },
    { label: "Low Stock", value: lowStock,                          icon: "📦" },
    { label: "Balance",     value: fmtMoney(balance, currency),      icon: "💰", isMoney: true },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: C.text, fontFamily: "'Garamond','Georgia',serif" }}>
            Welcome
          </div>
          <div style={{ fontSize: 13, color: C.textMid, marginTop: 4 }}>Your Stable</div>
        </div>
        <div style={{ fontSize: 22, color: C.textFaint, cursor: "pointer", marginTop: 4 }}>🔔</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {statCards.map((sc) => (
          <div key={sc.label} style={{ backgroundColor: C.card, borderRadius: 12, padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 26 }}>{sc.icon}</span>
            <div style={{ fontSize: sc.isMoney ? 18 : 28, fontWeight: "bold", color: C.text, lineHeight: 1 }}>{sc.value}</div>
            <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: C.textFaint }}>{sc.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ backgroundColor: "#E8F5EE", borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ fontSize: 18, fontWeight: "bold", color: "#5A8A6A", marginBottom: 4 }}>↗ {fmtMoney(income, currency)}</div>
          <div style={{ fontSize: 10, color: C.textFaint, textTransform: "uppercase", letterSpacing: 1 }}>Revenue</div>
        </div>
        <div style={{ backgroundColor: "#FAF0EC", borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ fontSize: 18, fontWeight: "bold", color: C.btnRed, marginBottom: 4 }}>↘ {fmtMoney(expense, currency)}</div>
          <div style={{ fontSize: 10, color: C.textFaint, textTransform: "uppercase", letterSpacing: 1 }}>Expenses</div>
        </div>
        <div style={{ backgroundColor: C.card, borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ fontSize: 18, fontWeight: "bold", color: C.text, marginBottom: 4 }}>💰 {fmtMoney(balance, currency)}</div>
          <div style={{ fontSize: 10, color: C.textFaint, textTransform: "uppercase", letterSpacing: 1 }}>Balance</div>
        </div>
      </div>

      <div style={{ backgroundColor: C.card, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: C.text, marginBottom: 18 }}>Monthly Evolution</div>
        <BarChart key={chartKey} transactions={transactions} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ backgroundColor: C.cardGreen, borderRadius: 12, padding: 20, color: "#fff" }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.65, marginBottom: 14 }}>Upcoming Events</div>
          {upcoming.length === 0 ? (
            <div style={{ fontSize: 12, opacity: 0.4 }}>Aucun</div>
          ) : (
            upcoming.map((e) => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.1)", fontSize: 12 }}>
                <span>{e.title}</span>
                <span style={{ color: C.gold, fontSize: 10 }}>{fmtDate(e.date)}</span>
              </div>
            ))
          )}
        </div>

        <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.textFaint, marginBottom: 14 }}>Horses Condition</div>
          {horses.slice(0, 6).map((h) => (
            <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: `1px solid ${C.cardInner}` }}>
              <span style={{ fontSize: 12, color: C.text }}>{h.name}</span>
              <Badge label={h.state} color={stateColor(h.state)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
