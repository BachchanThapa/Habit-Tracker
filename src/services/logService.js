const API_URL = "http://localhost:5000/api/logs";

export async function getLogs() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createLog(logData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logData),
  });

  return response.json();
}

export async function updateLog(logId, updatedData) {
  const response = await fetch(`${API_URL}/${logId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return response.json();
}

export async function getOrCreateTodayLog(today) {
  const logs = await getLogs();

  let todayLog = logs.find((log) => log.date === today);

  if (!todayLog) {
    todayLog = await createLog({
      date: today,
      sleep: false,
      water: false,
      exercise: false,
      lowCarb: false,
      noSugarDrink: false,
      notes: "",
    });
  }

  return todayLog;
}

/*
1. This file keeps all backend API calls in one place.
2. I moved log fetching, creating, and updating here so page components stay cleaner.
3. This service can now be reused by multiple pages instead of repeating fetch code.
*/