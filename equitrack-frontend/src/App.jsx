import { useState, useEffect } from "react";
import { S } from "./styles/theme";

import { horsesApi, ridersApi, eventsApi, inventoryApi, transactionsApi, employeesApi, vetRecordsApi, settingsApi } from "./api";

import Sidebar    from "./components/Sidebar";
import Dashboard  from "./pages/Dashboard";
import Horses     from "./pages/Horses";
import Schedule   from "./pages/Schedule";
import Riders     from "./pages/Riders";
import Inventory  from "./pages/Inventory";
import Veterinary from "./pages/Veterinary";
import Finances   from "./pages/Finances";
import Employees  from "./pages/Employees";
import Settings   from "./pages/Settings";
import Auth       from "./pages/Auth";

const DEFAULT_SETTINGS = { name: "The Organization", email: "admin@equitrack.com", phone: "", address: "", currency: "EUR" };

export default function App() {
  const [token,  setToken]  = useState(() => localStorage.getItem("auth_token") || null);
  const [user,   setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem("auth_user")) || null; } catch { return null; }
  });

  const [active, setActive]         = useState("Dashboard");
  const [loading, setLoading]       = useState(true);

  const [horses,       setHorses]       = useState([]);
  const [riders,       setRiders]       = useState([]);
  const [events,       setEvents]       = useState([]);
  const [inventory,    setInventory]    = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [employees,    setEmployees]    = useState([]);
  const [vetRecords,   setVetRecords]   = useState([]);
  const [orgSettings,  setOrgSettings]  = useState(DEFAULT_SETTINGS);

  // Load data only when authenticated
  useEffect(() => {
    if (!token) { setLoading(false); return; }
    Promise.all([
      horsesApi.getAll(),
      ridersApi.getAll(),
      eventsApi.getAll(),
      inventoryApi.getAll(),
      transactionsApi.getAll(),
      employeesApi.getAll(),
      vetRecordsApi.getAll(),
      settingsApi.get(),
    ]).then(([h, r, e, inv, tr, emp, vet, cfg]) => {
      setHorses(h); setRiders(r); setEvents(e); setInventory(inv);
      setTransactions(tr); setEmployees(emp); setVetRecords(vet); setOrgSettings(cfg);
      setLoading(false);
    }).catch((err) => {
      console.error("Failed to load data:", err);
      // If 401, token is invalid — log out
      if (err.message.includes("401") || err.message.includes("Unauthorized")) handleLogout();
      else setLoading(false);
    });
  }, [token]);

  const handleLogin = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setLoading(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  // Not authenticated → show Auth page
  if (!token) return <Auth onLogin={handleLogin} />;

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#F5F0E0", fontSize: 16, color: "#1C3A2E" }}>
      Chargement...
    </div>
  );

  const addHorse    = async (data) => { const d = await horsesApi.create(data);            setHorses((p) => [...p, d]); };
  const updateHorse = async (id, data) => { const d = await horsesApi.update(id, data);    setHorses((p) => p.map((x) => x._id === id ? d : x)); };
  const deleteHorse = async (id) => { await horsesApi.remove(id);                          setHorses((p) => p.filter((x) => x._id !== id)); };

  const addRider    = async (data) => { const d = await ridersApi.create(data);             setRiders((p) => [...p, d]); };
  const updateRider = async (id, data) => { const d = await ridersApi.update(id, data);    setRiders((p) => p.map((x) => x._id === id ? d : x)); };
  const deleteRider = async (id) => { await ridersApi.remove(id);                          setRiders((p) => p.filter((x) => x._id !== id)); };

  const addEvent    = async (data) => { const d = await eventsApi.create(data);             setEvents((p) => [...p, d]); };
  const updateEvent = async (id, data) => { const d = await eventsApi.update(id, data);    setEvents((p) => p.map((x) => x._id === id ? d : x)); };
  const deleteEvent = async (id) => { await eventsApi.remove(id);                          setEvents((p) => p.filter((x) => x._id !== id)); };

  const addInventory    = async (data) => { const d = await inventoryApi.create(data);            setInventory((p) => [...p, d]); };
  const updateInventory = async (id, data) => { const d = await inventoryApi.update(id, data);    setInventory((p) => p.map((x) => x._id === id ? d : x)); };
  const deleteInventory = async (id) => { await inventoryApi.remove(id);                          setInventory((p) => p.filter((x) => x._id !== id)); };

  const addTransaction    = async (data) => { const d = await transactionsApi.create(data);            setTransactions((p) => [...p, d]); };
  const updateTransaction = async (id, data) => { const d = await transactionsApi.update(id, data);    setTransactions((p) => p.map((x) => x._id === id ? d : x)); };
  const deleteTransaction = async (id) => { await transactionsApi.remove(id);                          setTransactions((p) => p.filter((x) => x._id !== id)); };

  const addEmployee    = async (data) => { const d = await employeesApi.create(data);            setEmployees((p) => [...p, d]); };
  const updateEmployee = async (id, data) => { const d = await employeesApi.update(id, data);    setEmployees((p) => p.map((x) => x._id === id ? d : x)); };
  const deleteEmployee = async (id) => { await employeesApi.remove(id);                          setEmployees((p) => p.filter((x) => x._id !== id)); };

  const addVetRecord    = async (data) => { const d = await vetRecordsApi.create(data);            setVetRecords((p) => [...p, d]); };
  const updateVetRecord = async (id, data) => { const d = await vetRecordsApi.update(id, data);    setVetRecords((p) => p.map((x) => x._id === id ? d : x)); };
  const deleteVetRecord = async (id) => { await vetRecordsApi.remove(id);                          setVetRecords((p) => p.filter((x) => x._id !== id)); };

  const saveOrgSettings = async (data) => { const d = await settingsApi.save(data); setOrgSettings(d); };

  const p = {
    horses,       addHorse,    updateHorse,    deleteHorse,
    riders,       addRider,    updateRider,    deleteRider,
    events,       addEvent,    updateEvent,    deleteEvent,
    inventory,    addInventory,updateInventory,deleteInventory,
    transactions, addTransaction, updateTransaction, deleteTransaction,
    employees,    addEmployee, updateEmployee, deleteEmployee,
    vetRecords,   addVetRecord,updateVetRecord,deleteVetRecord,
  };

  const renderPage = () => {
    switch (active) {
      case "Dashboard":  return <Dashboard  {...p} currency={orgSettings.currency} />;
      case "Horses":     return <Horses     {...p} />;
      case "Schedule":   return <Schedule   {...p} />;
      case "Riders":     return <Riders     {...p} />;
      case "Inventory":  return <Inventory  {...p} />;
      case "Veterinary": return <Veterinary {...p} />;
      case "Finances":   return <Finances   {...p} currency={orgSettings.currency} />;
      case "Employees":  return <Employees  {...p} currency={orgSettings.currency} />;
      case "Settings":   return <Settings   orgSettings={orgSettings} setOrgSettings={saveOrgSettings} user={user} token={token} onLogout={handleLogout} />;
      default:           return null;
    }
  };

  return (
    <div style={S.app}>
      <Sidebar active={active} setActive={setActive} orgName={orgSettings.name} user={user} onLogout={handleLogout} />
      <div style={S.main}>{renderPage()}</div>
    </div>
  );
}
