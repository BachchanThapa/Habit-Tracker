[🇸🇪 Läs på svenska](./README.SVE.md)

# Habit Tracker App

A full-stack habit tracking application built with React, Express, and MongoDB.  
The app allows users to track daily habits, write notes, and visualize progress over time.

---

## 🚀 Features

- Track daily habits (sleep, water, exercise, diet, etc.)
- Save and update daily progress
- Write and store notes of the day
- View completed and pending tasks
- Weekly statistics with chart visualization (Chart.js)
- Data persistence using MongoDB

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- CSS
- Chart.js

### Backend
- Node.js
- Express

### Database
- MongoDB Atlas

---

## 📊 Application Structure

- Frontend handles UI and user interaction
- Backend provides API endpoints
- MongoDB stores daily habit logs

---

## 🔌 API Endpoints

- `GET /api/logs` → Get all logs  
- `POST /api/logs` → Create new log  
- `PUT /api/logs/:id` → Update log  

---

## ▶️ How to Run Locally

### 1. Clone repository  
git clone <your-repo-link>

### 2. Install dependencies  
npm install  
npm install chart.js react-chartjs-2

### 3. Environment variables  
MONGO_URI=your_mongodb_connection_string  
PORT=5000
