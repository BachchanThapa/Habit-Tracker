const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    sleep: {
      type: Boolean,
      default: false,
    },
    water: {
      type: Boolean,
      default: false,
    },
    exercise: {
      type: Boolean,
      default: false,
    },
    lowCarb: {
      type: Boolean,
      default: false,
    },
    noSugarDrink: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DailyLog", dailyLogSchema);


/*
1. This file creates the DailyLog model, which is the main data structure for one day’s habit tracking.
2. I added simple habit fields as true/false values so it is easy to save checked and unchecked habits.
3. Notes is a text field where user can write something extra for that day.
4. Timestamps help me automatically store when each log was created and updated.
*/