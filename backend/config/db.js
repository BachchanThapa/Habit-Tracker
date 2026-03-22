const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

/*
This file is responsible for connecting our backend to MongoDB database.

1. We use mongoose to create connection between our server and MongoDB.
2. The function connectDB() is called when server starts.
3. It reads the database URL from .env file (MONGO_URI).
4. If connection is successful → we print success message.
5. If connection fails → we log error and stop the server.
6. This helps us make sure backend only runs when database is connected.
*/
 