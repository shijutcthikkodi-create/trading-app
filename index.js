const express = require("express");
const app = express();

// ✅ Correct Railway-compatible port
const PORT = process.env.PORT || 8080;

// Routes
app.get("/", (req, res) => {
  res.send("Trading App is Live 🚀");
});

app.get("/data", (req, res) => {
  res.json({ status: "API working" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});