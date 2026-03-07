// ═══════════════════════════════════════════════════════════════
// SEED DATA
// ═══════════════════════════════════════════════════════════════

export const initHorses = [
  {
    id: 1, name: "Thunder", state: "HEALTHY", breed: "Andalusian", age: "8",
    stall: "A-07", owner: "Marc Dupont", sex: "Stallion",
    vaccination: "Up to date", arrival: "2020-03-12", training: "Dressage",
    history: [
      { id: 1, date: "2026-01-02", type: "Vaccination – Rabies", doctor: "Dr. Martin", clinic: "EquiVet" },
      { id: 2, date: "2025-11-15", type: "Checkup – Annual",     doctor: "Dr. Martin", clinic: "EquiVet" },
    ],
    open: true,
  },
  {
    id: 2, name: "Luna", state: "INJURY", breed: "Thoroughbred", age: "5",
    stall: "B-03", owner: "Sophie Blanc", sex: "Mare",
    vaccination: "Pending", arrival: "2022-06-01", training: "Show Jumping",
    history: [], open: false,
  },
  {
    id: 3, name: "Soleil", state: "HEALTHY", breed: "Quarter Horse", age: "10",
    stall: "C-01", owner: "Jean Leroy", sex: "Gelding",
    vaccination: "Up to date", arrival: "2018-09-22", training: "Western",
    history: [], open: false,
  },
];

export const initRiders = [
  { id: 1, name: "Camille Martin", level: "Advanced",     horse: "Thunder", phone: "06 12 34 56 78", email: "camille@mail.com", joinDate: "2022-01-10", notes: "Competing nationally" },
  { id: 2, name: "Lucas Bernard",  level: "Intermediate", horse: "Soleil",  phone: "06 98 76 54 32", email: "lucas@mail.com",   joinDate: "2023-05-20", notes: "" },
  { id: 3, name: "Emma Petit",     level: "Beginner",     horse: "Luna",    phone: "07 11 22 33 44", email: "emma@mail.com",    joinDate: "2024-03-01", notes: "Allergic to hay dust" },
];

export const initEvents = [
  { id: 1, date: "2026-03-07", title: "Dressage Training", type: "Training",    horse: "Thunder", rider: "Camille Martin", notes: "Arena A, 9am" },
  { id: 2, date: "2026-03-10", title: "Show Jumping",      type: "Competition", horse: "Luna",    rider: "Emma Petit",     notes: "" },
  { id: 3, date: "2026-03-14", title: "Vet Visit",         type: "Medical",     horse: "Thunder", rider: "",               notes: "Annual checkup Dr. Martin" },
  { id: 4, date: "2026-03-21", title: "Farrier Visit",     type: "Maintenance", horse: "",        rider: "",               notes: "All horses" },
];

export const initInventory = [
  { id: 1, category: "Hay & Forage",         emoji: "🌾", name: "Hay",               qty: 700, maxQty: 1000, unit: "kg" },
  { id: 2, category: "Hay & Forage",         emoji: "🌾", name: "Alfalfa",           qty: 300, maxQty: 1000, unit: "kg" },
  { id: 3, category: "Hay & Forage",         emoji: "🌾", name: "Straw (Bedding)",   qty: 150, maxQty: 1000, unit: "kg" },
  { id: 4, category: "Grain & Concentrate",  emoji: "🌽", name: "Oats",              qty: 850, maxQty: 1000, unit: "kg" },
  { id: 5, category: "Grain & Concentrate",  emoji: "🌽", name: "Pelleted Feed",     qty: 550, maxQty: 1000, unit: "kg" },
  { id: 6, category: "Grain & Concentrate",  emoji: "🌽", name: "Bran",              qty: 400, maxQty: 1000, unit: "kg" },
  { id: 7, category: "Health & Supplements", emoji: "💊", name: "Electrolytes",      qty: 60,  maxQty: 100,  unit: "bottles" },
  { id: 8, category: "Health & Supplements", emoji: "💊", name: "Joint Supplements", qty: 45,  maxQty: 100,  unit: "bottles" },
  { id: 9, category: "Health & Supplements", emoji: "💊", name: "Vitamin E",         qty: 20,  maxQty: 100,  unit: "bottles" },
];

export const initTransactions = [
  { id: 1, date: "2026-03-01", label: "Horse feed – monthly",    type: "Expense", amount: 850, category: "Feed" },
  { id: 2, date: "2026-03-02", label: "Riding lesson – Camille", type: "Income",  amount: 120, category: "Lessons" },
  { id: 3, date: "2026-03-03", label: "Vet visit – Thunder",     type: "Expense", amount: 230, category: "Veterinary" },
  { id: 4, date: "2026-03-05", label: "Riding lesson – Lucas",   type: "Income",  amount: 120, category: "Lessons" },
  { id: 5, date: "2026-03-06", label: "Farrier – 3 horses",      type: "Expense", amount: 360, category: "Farrier" },
];

export const initEmployees = [
  { id: 1, name: "Pierre Moreau",   role: "Head Groom",        phone: "06 33 44 55 66", email: "pierre@equitrack.com",  startDate: "2020-01-15", status: "Active", salary: 2200 },
  { id: 2, name: "Marie Dubois",    role: "Riding Instructor", phone: "06 77 88 99 00", email: "marie@equitrack.com",   startDate: "2021-06-01", status: "Active", salary: 2800 },
  { id: 3, name: "Antoine Laurent", role: "Stable Hand",       phone: "07 22 33 44 55", email: "antoine@equitrack.com", startDate: "2023-03-10", status: "Active", salary: 1800 },
];

export const initVetRecords = [
  { id: 1, date: "2026-01-02", horse: "Thunder", type: "Vaccination",     doctor: "Dr. Martin",  clinic: "EquiVet",     notes: "Rabies booster",                  followUp: "2027-01-02" },
  { id: 2, date: "2025-11-15", horse: "Thunder", type: "Checkup",         doctor: "Dr. Martin",  clinic: "EquiVet",     notes: "Annual – all clear",               followUp: "2026-11-15" },
  { id: 3, date: "2026-02-20", horse: "Luna",    type: "Injury Treatment",doctor: "Dr. Lefevre", clinic: "HorseClinic", notes: "Left foreleg sprain, 3 weeks rest", followUp: "2026-03-13" },
];
