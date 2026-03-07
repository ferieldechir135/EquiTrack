// ═══════════════════════════════════════════════════════════════
// PAGE: SETTINGS
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, S } from "../styles/theme";
import { FF } from "../components/UI";

export default function Settings() {
  const [org, setOrg]   = useState({ name: "The Organization", email: "admin@equitrack.com", phone: "", address: "", currency: "EUR" });
  const [saved, setSaved] = useState(false);
  const set  = (k) => (e) => setOrg((p) => ({ ...p, [k]: e.target.value }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <div style={S.title}>Settings</div>
      <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: "bold", color: C.text, marginBottom: 18 }}>
          Organisation
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FF label="Organisation Name"><input style={S.input} value={org.name} onChange={set("name")} /></FF>
          <FF label="Email"><input style={S.input} type="email" value={org.email} onChange={set("email")} /></FF>
          <FF label="Phone"><input style={S.input} value={org.phone} onChange={set("phone")} /></FF>
          <FF label="Currency">
            <select style={S.input} value={org.currency} onChange={set("currency")}>
              <option>EUR</option><option>USD</option><option>GBP</option>
            </select>
          </FF>
        </div>
        <FF label="Address"><input style={S.input} value={org.address} onChange={set("address")} /></FF>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
          <button style={S.btn()} onClick={save}>Save changes</button>
          {saved && <span style={{ color: "#5A8A6A", fontSize: 12 }}>✓ Saved!</span>}
        </div>
      </div>
    </div>
  );
}
