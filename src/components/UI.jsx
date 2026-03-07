// ═══════════════════════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════════════════
import { C, S } from "../styles/theme";

// ─── Modal ───────────────────────────────────────────────────
export function Modal({ title, onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,.45)",
        zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: C.pageBg, borderRadius: 14, padding: 28,
          minWidth: 480, maxWidth: 640, maxHeight: "88vh", overflowY: "auto",
          boxShadow: "0 12px 48px rgba(0,0,0,.28)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 15, fontWeight: "bold", color: C.text, letterSpacing: 0.5 }}>{title}</span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.text, lineHeight: 1 }}
          >✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Confirm dialog ──────────────────────────────────────────
export function Confirm({ msg, onYes, onNo }) {
  return (
    <Modal title="Confirmation" onClose={onNo}>
      <p style={{ fontSize: 14, color: C.text, marginBottom: 20 }}>{msg}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button style={S.btn(C.btnBeige, C.text)} onClick={onNo}>Annuler</button>
        <button style={S.btn(C.btnRed)}            onClick={onYes}>Supprimer</button>
      </div>
    </Modal>
  );
}

// ─── Form Field wrapper ──────────────────────────────────────
export function FF({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={S.lbl}>{label}</label>
      {children}
    </div>
  );
}

// ─── Badge / Tag ─────────────────────────────────────────────
export function Badge({ label, color }) {
  return <span style={S.tag(color || C.btnGreen)}>{label}</span>;
}
