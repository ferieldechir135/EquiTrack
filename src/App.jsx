// ═══════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { S } from "./styles/theme";

// Data
import { initHorses, initRiders, initEvents, initInventory, initTransactions, initEmployees, initVetRecords } from "./data/seedData";

// Components
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard  from "./pages/Dashboard";
import Horses     from "./pages/Horses";
import Schedule   from "./pages/Schedule";
import Riders     from "./pages/Riders";
import Inventory  from "./pages/Inventory";
import Veterinary from "./pages/Veterinary";
import Finances   from "./pages/Finances";
import Employees  from "./pages/Employees";
import Settings   from "./pages/Settings";

export default function App() {
  const [active, setActive]               = useState("Dashboard");
  const [horses, setHorses]               = useState(initHorses);
  const [riders, setRiders]               = useState(initRiders);
  const [events, setEvents]               = useState(initEvents);
  const [inventory, setInventory]         = useState(initInventory);
  const [transactions, setTransactions]   = useState(initTransactions);
  const [employees, setEmployees]         = useState(initEmployees);
  const [vetRecords, setVetRecords]       = useState(initVetRecords);

  const p = { horses, setHorses, riders, setRiders, events, setEvents, inventory, setInventory, transactions, setTransactions, employees, setEmployees, vetRecords, setVetRecords };

  const pages = {
    Dashboard:  <Dashboard  {...p} />,
    Horses:     <Horses     {...p} />,
    Schedule:   <Schedule   {...p} />,
    Riders:     <Riders     {...p} />,
    Inventory:  <Inventory  {...p} />,
    Veterinary: <Veterinary {...p} />,
    Finances:   <Finances   {...p} />,
    Employees:  <Employees  {...p} />,
    Settings:   <Settings />,
  };

  return (
    <div style={S.app}>
      <Sidebar active={active} setActive={setActive} />
      <div style={S.main}>{pages[active]}</div>
    </div>
  );
}
