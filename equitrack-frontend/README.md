# EquiTrack — Backend Setup

## Structure
```
equitrack-backend/   ← Dossier backend (Node.js)
  server.js
  .env
  models/
  routes/
  api.js             ← À copier dans src/ du frontend

Fichiers frontend à remplacer dans src/ :
  App.jsx
  pages/Finances.jsx
  pages/Employees.jsx
  pages/Horses.jsx
  pages/Riders.jsx
  pages/Inventory.jsx
  pages/Schedule.jsx
  pages/Veterinary.jsx
```

---

## 1. Installer MongoDB
- Télécharger : https://www.mongodb.com/try/download/community
- Ou utiliser MongoDB Atlas (cloud gratuit) : https://www.mongodb.com/atlas

## 2. Lancer le backend

```bash
cd equitrack-backend
npm install
npm run dev
```

Le serveur tourne sur http://localhost:5000

## 3. Configurer .env

Si tu utilises MongoDB Atlas, remplace dans `.env` :
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/equitrack
PORT=5000
```

## 4. Copier les fichiers frontend

Dans ton projet Vite :
- `api.js`          → `src/api.js`
- `App.jsx`         → `src/App.jsx`
- `Finances.jsx`    → `src/pages/Finances.jsx`
- `Employees.jsx`   → `src/pages/Employees.jsx`
- `Horses.jsx`      → `src/pages/Horses.jsx`
- `Riders.jsx`      → `src/pages/Riders.jsx`
- `Inventory.jsx`   → `src/pages/Inventory.jsx`
- `Schedule.jsx`    → `src/pages/Schedule.jsx`
- `Veterinary.jsx`  → `src/pages/Veterinary.jsx`

## 5. Configurer le proxy Vite (optionnel)

Dans `vite.config.js`, ajoute :
```js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}
```
Si tu fais ça, change `BASE` dans `api.js` de `"http://localhost:5000/api"` vers `"/api"`.

## 6. Lancer le frontend
```bash
npm run dev
```

---

## API Endpoints disponibles

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/horses | Liste tous les chevaux |
| POST | /api/horses | Créer un cheval |
| PUT | /api/horses/:id | Modifier un cheval |
| DELETE | /api/horses/:id | Supprimer un cheval |
| ... | (idem pour riders, events, inventory, transactions, employees, vetrecords) | |
| GET | /api/settings | Lire les paramètres |
| PUT | /api/settings | Sauvegarder les paramètres |
