// ═══════════════════════════════════════════════════════════════
// PAGE: EMPLOYEES
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, S } from "../styles/theme";
import { uid, fmtDate, fmtMoney } from "../utils/helpers";
import { Modal, Confirm, FF, Badge } from "../components/UI";

const ROLES = ["Head Groom", "Riding Instructor", "Stable Hand", "Veterinary Nurse", "Manager", "Other"];

export default function Employees({ employees, setEmployees }) {
  const [modal, setModal]     = useState(null);
  const [confirm, setConfirm] = useState(null);
  const def = { name: "", role: "Stable Hand", phone: "", email: "", startDate: "", status: "Active", salary: 0 };
  const [f, setF] = useState(def);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    if (modal === "add") setEmployees((es) => [...es, { ...f, id: uid(), salary: +f.salary }]);
    else setEmployees((es) => es.map((e) => e.id === modal ? { ...e, ...f, salary: +f.salary } : e));
    setModal(null);
  };
  const del = (id) => { setEmployees((es) => es.filter((e) => e.id !== id)); setConfirm(null); };
  const totalSalary = employees.filter((e) => e.status === "Active").reduce((a, e) => a + e.salary, 0);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={S.title}>Employees</div>
        <div style={S.row}>
          <span style={{ fontSize: 12, color: C.textMid }}>
            Payroll: <b style={{ color: C.text }}>{fmtMoney(totalSalary)}/mo</b>
          </span>
          <button style={S.btn()} onClick={() => { setF(def); setModal("add"); }}>+ Add Employee</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: C.cardGreen, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr .8fr 90px", padding: "10px 16px", color: "rgba(255,255,255,.55)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase" }}>
          <span>Name</span><span>Role</span><span>Salary</span><span>Since</span><span>Status</span><span></span>
        </div>
        {employees.map((emp) => (
          <div
            key={emp.id}
            style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr .8fr 90px", padding: "12px 16px", backgroundColor: C.card, borderTop: `1px solid ${C.cardInner}`, alignItems: "center" }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: "bold", color: C.text }}>{emp.name}</div>
              <div style={{ fontSize: 10, color: C.textFaint }}>{emp.email}</div>
            </div>
            <div style={{ fontSize: 12, color: C.text }}>{emp.role}</div>
            <div style={{ fontSize: 12, fontWeight: "bold", color: C.text }}>
              {fmtMoney(emp.salary)}<span style={{ fontWeight: "normal", fontSize: 10, opacity: 0.5 }}>/mo</span>
            </div>
            <div style={{ fontSize: 11, color: C.textFaint }}>{fmtDate(emp.startDate)}</div>
            <Badge label={emp.status} color={emp.status === "Active" ? "#5A8A6A" : "#8A7A4A"} />
            <div style={S.row}>
              <button style={{ ...S.btn(C.btnGreenL), padding: "4px 9px", fontSize: 11, marginLeft: 9 }} onClick={() => { setF({ ...emp }); setModal(emp.id);  }}>✏️</button>
              <button style={{ ...S.btn(C.btnRed),    padding: "4px 9px", fontSize: 11 }} onClick={() => setConfirm(emp.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal === "add" ? "New Employee" : "Edit Employee"} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FF label="Name"><input style={S.input} value={f.name} onChange={set("name")} /></FF>
            <FF label="Role">
              <select style={S.input} value={f.role} onChange={set("role")}>
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </FF>
            <FF label="Phone"><input style={S.input} value={f.phone} onChange={set("phone")} /></FF>
            <FF label="Email"><input style={S.input} type="email" value={f.email} onChange={set("email")} /></FF>
            <FF label="Start Date"><input style={S.input} type="date" value={f.startDate} onChange={set("startDate")} /></FF>
            <FF label="Monthly Salary (€)"><input style={S.input} type="number" value={f.salary} onChange={set("salary")} /></FF>
            <FF label="Status">
              <select style={S.input} value={f.status} onChange={set("status")}>
                <option>Active</option><option>Inactive</option><option>On Leave</option>
              </select>
            </FF>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
            <button style={S.btn(C.btnBeige, C.text)} onClick={() => setModal(null)}>Cancel</button>
            <button style={S.btn()} onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {confirm && <Confirm msg="Delete this employee?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
    </div>
  );
}
