import { C } from "../styles/theme";

const NAV = [
  { section: "MAIN",       items: ["Dashboard", "Horses", "Schedule", "Riders"] },
  { section: "MANAGEMENT", items: ["Inventory", "Veterinary", "Finances", "Employees"] },
  { section: "SYSTEM",     items: ["Settings"] },
];

export default function Sidebar({ active, setActive, orgName }) {
  const initials = orgName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      style={{
        width: 210, minWidth: 210,
        backgroundColor: C.sidebar,
        display: "flex", flexDirection: "column",
        borderRight: `3px solid ${C.sidebarBorder}`,
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "22px 18px 18px",
          borderBottom: "1px solid rgba(201,168,76,.2)",
        }}
      >
        <div
          style={{
            width: 44, height: 44, borderRadius: "50%",
            backgroundColor: C.card,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: "bold", color: C.sidebar, overflow: "hidden",
          }}
        >
          <img src="/public/logo_EquiTrack_nobkrd.png" alt="🐴" width="35" height="35" />
        </div>
        <div>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", lineHeight: 1.2 }}>
            EQUITRACK
          </div>
          <div style={{ color: C.gold, fontSize: 7, letterSpacing: 2, textTransform: "uppercase" }}>
            EQUESTRIAN MANAGEMENT
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingTop: 8 }}>
        {NAV.map((g) => (
          <div key={g.section} style={{ padding: "12px 0 4px 20px" }}>
            <div style={{ color: "rgba(201,168,76,.55)", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
              {g.section}
            </div>
            {g.items.map((item) => (
              <div
                key={item}
                onClick={() => setActive(item)}
                style={{
                  padding: "8px 20px", cursor: "pointer", fontSize: 13, letterSpacing: 0.5,
                  marginLeft: -3, transition: "all .15s",
                  color: active === item ? C.gold : C.sidebarText,
                  backgroundColor: active === item ? "rgba(201,168,76,.1)" : "transparent",
                  borderLeft: active === item ? `3px solid ${C.gold}` : "3px solid transparent",
                  fontStyle: active === item ? "italic" : "normal",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "14px 18px",
          borderTop: "1px solid rgba(201,168,76,.2)",
          display: "flex", alignItems: "center", gap: 10,
        }}
      >
        <div
          style={{
            width: 32, height: 32, borderRadius: "50%",
            backgroundColor: C.gold,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: "bold", color: C.sidebar, flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ color: C.gold, fontSize: 8, letterSpacing: 2, textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {orgName}
          </div>
          <div style={{ color: "rgba(245,240,224,.5)", fontSize: 8, letterSpacing: 2, textTransform: "uppercase" }}>ADMIN</div>
        </div>
      </div>
    </div>
  );
}
