const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/contacts", (req, res) => {
  res.json({ message: "Get all contacts" });
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
