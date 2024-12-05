const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const leadRoutes = require("./routes/leadRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const errorHandler = require("./middleware/errorHandler");
connectDb();

const app = express();
app.use(helmet());

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use(errorHandler);
process.on("uncaughtException", (err) => {
  console.log("uncaught Exception");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server listening on port " + port);
});
