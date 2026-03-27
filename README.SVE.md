[🇬🇧 Read in English](./README.ENG.md)

# Habit Tracker App

En fullstack-applikation för vanespårning byggd med React, Express och MongoDB.  
Appen gör det möjligt för användare att registrera dagliga vanor, skriva anteckningar och visualisera sin utveckling över tid.

---

## 🚀 Funktioner

- Registrera dagliga vanor (sömn, vatten, träning, kost osv.)
- Spara och uppdatera daglig progression
- Skriva och spara dagens anteckning
- Visa färdiga och återstående uppgifter
- Veckostatistik med diagramvisualisering (Chart.js)
- Lagring av data med MongoDB

---

## 🛠️ Teknikstack

### Frontend
- React (Vite)
- CSS
- Chart.js

### Backend
- Node.js
- Express

### Databas
- MongoDB Atlas

---

## 📊 Applikationsstruktur

- Frontend hanterar användargränssnitt och interaktion
- Backend tillhandahåller API-endpoints
- MongoDB lagrar dagliga vaneloggar

---

## 🔌 API-endpoints

- `GET /api/logs` → Hämtar alla loggar  
- `POST /api/logs` → Skapar en ny logg  
- `PUT /api/logs/:id` → Uppdaterar en logg  

---

## ▶️ Hur man kör projektet lokalt

### 1. Klona repot  
git clone <din-repo-länk>

### 2. Installera beroenden  
npm install  
npm install chart.js react-chartjs-2

### 3. Miljövariabler  
MONGO_URI=din_mongodb_anslutningssträng  
PORT=5000
