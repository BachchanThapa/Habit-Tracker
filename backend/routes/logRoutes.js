const express = require("express");
const router = express.Router();

const {
  getLogs,
  createLog,
  updateLog,
} = require("../controllers/logController");

router.get("/", getLogs);
router.post("/", createLog);
router.put("/:id", updateLog);

module.exports = router;


/*
1. This file defines the API routes for daily logs.
2. I connect each route to its matching controller function.
3. GET gets all logs, POST creates a new log, and PUT updates one log by id.
4. Keeping routes in a separate file makes server.js simpler and cleaner.
*/