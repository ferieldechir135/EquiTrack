import { useState } from "react";
import { C, S } from "../styles/theme";
import { FF } from "../components/UI";
import { fmtMoney } from "../utils/helpers";

export default function Settings({ orgSettings, setOrgSettings }) {
  const [local, setLocal] = useState({ ...orgSettings });
  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => setLocal((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    setOrgSettings({ ...local });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div style={S.title}>Settings</div>
      <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: "bold", color: C.text, marginBottom: 18 }}>
          Organisation
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FF label="Organisation Name">
            <input style={S.input} value={local.name} onChange={set("name")} />
          </FF>
          <FF label="Email">
            <input style={S.input} type="email" value={local.email} onChange={set("email")} />
          </FF>
          <FF label="Phone">
            <input style={S.input} value={local.phone} onChange={set("phone")} />
          </FF>
          <FF label="Currency">
            <select style={S.input} value={local.currency} onChange={set("currency")}>
              <option value="EUR">EUR – Euro (€)</option>
              <option value="USD">USD – Dollar ($)</option>
              <option value="GBP">GBP – Pound (£)</option>
              <option value="DZD">DZD – Dinar algérien (دج)</option>
            </select>
          </FF>
        </div>
        <FF label="Address">
          <input style={S.input} value={local.address} onChange={set("address")} />
        </FF>

        {/* Live preview */}
        <div style={{ backgroundColor: C.cardInner, borderRadius: 8, padding: "10px 14px", marginTop: 8, marginBottom: 14 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.textFaint, marginBottom: 6 }}>
            Preview
          </div>
          <div style={{ fontSize: 12, color: C.textMid }}>
            Nom dans la sidebar : <b style={{ color: C.gold }}>{local.name || "—"}</b>
            {"  ·  "}
            Exemple de montant : <b style={{ color: C.text }}>{fmtMoney(1234.5, local.currency)}</b>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
          <button style={S.btn()} onClick={save}>Save changes</button>
          {saved && <span style={{ color: "#5A8A6A", fontSize: 12 }}>✓ Saved!</span>}
        </div>
      </div>
    </div>
  );
}
