const DailyLog = require("../models/DailyLog");

const getLogs = async (req, res) => {
  try {
    console.log("PUT update body:", req.body);
    const logs = await DailyLog.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};

const createLog = async (req, res) => {
  try {
    const newLog = await DailyLog.create(req.body);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ message: "Failed to create log" });
  }
};

const updateLog = async (req, res) => {
  try {
    const updatedLog = await DailyLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(400).json({ message: "Failed to update log" });
  }
};

module.exports = {
  getLogs,
  createLog,
  updateLog,
};


/*
1. This file contains the main logic for getting, creating, and updating daily logs.
2. I separated controller logic from routes to keep backend code cleaner and easier to understand.
3. getLogs fetches all logs, createLog saves a new log, and updateLog changes an existing log.
4. I return JSON responses here because frontend will later use this API data.
*/