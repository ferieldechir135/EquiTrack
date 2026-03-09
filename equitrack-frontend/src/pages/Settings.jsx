import { useState } from "react";
import { C, S } from "../styles/theme";
import { FF } from "../components/UI";
import { fmtMoney } from "../utils/helpers";

export default function Settings({ orgSettings, setOrgSettings, user, token, onLogout }) {
  const [local, setLocal]         = useState({ ...orgSettings });
  const [saved, setSaved]         = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteLoading, setDeleteLoading]         = useState(false);
  const [deleteError, setDeleteError]             = useState("");

  const set = (k) => (e) => setLocal((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    setOrgSettings({ ...local });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      await fetch("http://localhost:5000/api/auth/account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (r) => { if (!r.ok) throw new Error(await r.text()); return r.json(); });
      onLogout();
    } catch (err) {
      setDeleteError(err.message || "Failed to delete account.");
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div style={S.title}>Settings</div>

      {/* Organisation settings */}
      <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 24, marginBottom: 20 }}>
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

        <div style={{ backgroundColor: C.cardInner, borderRadius: 8, padding: "10px 14px", marginTop: 8, marginBottom: 14 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.textFaint, marginBottom: 6 }}>Preview</div>
          <div style={{ fontSize: 12, color: C.textMid }}>
            Sidebar name: <b style={{ color: C.gold }}>{local.name || "—"}</b>
            {"  ·  "}
            Amount example: <b style={{ color: C.text }}>{fmtMoney(1234.5, local.currency)}</b>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={S.btn()} onClick={save}>Save changes</button>
          {saved && <span style={{ color: "#5A8A6A", fontSize: 12 }}>✓ Saved!</span>}
        </div>
      </div>

      {/* Account section */}
      <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: "bold", color: C.text, marginBottom: 18 }}>
          Account
        </div>

        {user && (
          <div style={{ marginBottom: 20, fontSize: 13, color: C.textMid }}>
            Signed in as <b style={{ color: C.text }}>{user.email}</b>
          </div>
        )}

        {/* Danger zone */}
        <div style={{
          border: `1px solid rgba(176,90,42,0.35)`,
          borderRadius: 10,
          padding: "18px 20px",
          backgroundColor: "rgba(176,90,42,0.05)",
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.btnRed, fontWeight: "bold", marginBottom: 10 }}>
            Danger Zone
          </div>
          <div style={{ fontSize: 12, color: C.textMid, marginBottom: 14 }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </div>

          {deleteError && (
            <div style={{ backgroundColor: "rgba(176,90,42,0.15)", border: "1px solid rgba(176,90,42,0.4)", borderRadius: 7, padding: "8px 12px", fontSize: 12, color: C.btnRed, marginBottom: 12 }}>
              ⚠ {deleteError}
            </div>
          )}

          {!showConfirmDelete ? (
            <button
              style={{ ...S.btn(C.btnRed), padding: "8px 20px", fontSize: 12 }}
              onClick={() => setShowConfirmDelete(true)}
            >
              Delete Account
            </button>
          ) : (
            <div style={{ backgroundColor: C.cardInner, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: C.text, marginBottom: 12, fontWeight: "bold" }}>
                Are you sure? This will permanently delete your account.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={{ ...S.btn(C.btnRed), padding: "8px 20px", fontSize: 12, opacity: deleteLoading ? 0.5 : 1 }}
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Yes, delete my account"}
                </button>
                <button
                  style={{ ...S.btn(C.btnBeige, C.text), padding: "8px 20px", fontSize: 12 }}
                  onClick={() => { setShowConfirmDelete(false); setDeleteError(""); }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
