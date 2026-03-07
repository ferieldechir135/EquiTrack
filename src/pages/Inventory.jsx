// ═══════════════════════════════════════════════════════════════
// PAGE: INVENTORY
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, S } from "../styles/theme";
import { uid } from "../utils/helpers";
import { Modal, Confirm, FF, Badge } from "../components/UI";

const INV_CATS = ["Hay & Forage", "Grain & Concentrate", "Health & Supplements", "Equipment"];

export default function Inventory({ inventory, setInventory }) {
  const [modal, setModal]     = useState(null);
  const [confirm, setConfirm] = useState(null);
  const def = { category: "Hay & Forage", emoji: "🌾", name: "", qty: 0, maxQty: 100, unit: "kg" };
  const [f, setF] = useState(def);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    if (modal === "add") setInventory((inv) => [...inv, { ...f, id: uid(), qty: +f.qty, maxQty: +f.maxQty }]);
    else setInventory((inv) => inv.map((i) => i.id === modal ? { ...i, ...f, qty: +f.qty, maxQty: +f.maxQty } : i));
    setModal(null);
  };
  const del = (id) => { setInventory((inv) => inv.filter((i) => i.id !== id)); setConfirm(null); };

  const groups = INV_CATS.map((cat) => ({ cat, items: inventory.filter((i) => i.category === cat) })).filter((g) => g.items.length > 0);

  return (
    <div>
      <div style={S.title}>Inventory</div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontSize: 14, color: C.textMid, fontStyle: "italic" }}>Feed and Nutrition</span>
        <button
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.text, letterSpacing: 0.5 }}
          onClick={() => { setF(def); setModal("add"); }}
        >
          +Add item
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {groups.map(({ cat, items }) => (
          <div key={cat} style={{ backgroundColor: C.card, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", backgroundColor: C.cardInner }}>
              <span style={{ fontSize: 20 }}>{items[0]?.emoji || "📦"}</span>
              <span style={{ fontSize: 12, fontWeight: "bold", color: C.text, flex: 1 }}>{cat}</span>
              <Badge label={`${items.length} items`} />
            </div>
            {items.map((item) => {
              const pct   = Math.min(100, Math.round((item.qty / item.maxQty) * 100));
              const isLow = pct < 25;
              return (
                <div key={item.id} style={{ padding: "10px 14px", borderTop: `1px solid ${C.cardInner}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: "bold", color: C.text }}>{item.name}</div>
                          <div style={{ fontSize: 9, color: C.textFaint }}>quantity · {item.unit}</div>
                        </div>
                        <div style={S.row}>
                          <button style={{ ...S.btn(C.btnGreenL), padding: "3px 8px", fontSize: 9 }} onClick={() => { setF({ ...item }); setModal(item.id); }}>✏️</button>
                          <button style={{ ...S.btn(C.btnRed),    padding: "3px 8px", fontSize: 9 }} onClick={() => setConfirm(item.id)}>🗑</button>
                        </div>
                      </div>
                      <div style={{ marginTop: 5, height: 5, backgroundColor: C.cardInner, borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", backgroundColor: isLow ? C.btnRed : C.btnGreen, borderRadius: 4 }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <span style={{ fontSize: 8, color: isLow ? C.btnRed : "transparent" }}>⚠️ Low stock</span>
                        <span style={{ fontSize: 8, color: C.textFaint }}>{item.qty}/{item.maxQty} {item.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal === "add" ? "New Item" : "Edit Item"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FF label="Name"><input style={S.input} value={f.name} onChange={set("name")} /></FF>
            <FF label="Category">
              <select style={S.input} value={f.category} onChange={set("category")}>
                {INV_CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </FF>
            <FF label="Emoji"><input style={S.input} value={f.emoji} onChange={set("emoji")} /></FF>
            <FF label="Unit"><input style={S.input} value={f.unit} onChange={set("unit")} /></FF>
            <FF label="Current Qty"><input style={S.input} type="number" value={f.qty} onChange={set("qty")} /></FF>
            <FF label="Max Capacity"><input style={S.input} type="number" value={f.maxQty} onChange={set("maxQty")} /></FF>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
            <button style={S.btn(C.btnBeige, C.text)} onClick={() => setModal(null)}>Cancel</button>
            <button style={S.btn()} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {confirm && <Confirm msg="Delete this item?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
    </div>
  );
}
