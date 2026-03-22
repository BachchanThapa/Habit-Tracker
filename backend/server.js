const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const logRoutes = require("./routes/logRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/logs", logRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*
1. This is the main backend file where server setup, database connection, and routes come together.
2. I use app.use("/api/logs", logRoutes) to connect all log API endpoints in one place.
3. Middleware is added here so backend can read JSON data and allow frontend requests.
4. The basic route is only for checking that the server is responding during development.
*/