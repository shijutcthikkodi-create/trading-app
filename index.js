const express = require("express");
const app = express();

// ✅ Only use Railway port
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Trading App is Live 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const BASE_URL = "https://script.google.com/macros/s/AKfycbzsGgTmJET-j414jqdLl3mQSy0Rm444KOWORIUAnsZHB2SFZVJKuAeHIeoMA-dDEyef/exec";

async function getSheet(name) {
  const res = await axios.get(`${BASE_URL}?sheet=${name}`);
  return res.data;
}

app.get("/data", async (req, res) => {
  try {
    const [signals, watchlist, users, logs, insights, messages] =
      await Promise.all([
        getSheet("signals"),
        getSheet("watchlist"),
        getSheet("users"),
        getSheet("logs"),
        getSheet("insights"),
        getSheet("messages")
      ]);

    res.json({
      signals,
      watchlist,
      users,
      logs,
      insights,
      messages
    });

  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});