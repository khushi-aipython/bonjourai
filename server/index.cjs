
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Test API
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Hello Khushi! Backend connected successfully!"
  });
});

// React build location
const frontendPath = path.join(
  __dirname,
  "../bonjourai/dist"
);

// Serve React
app.use(express.static(frontendPath));

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      message: "API not found"
    });
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
