const express = require("express");
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.verifyToken, notificationController.getNotifications);

router
  .route("/:id/read")
  .post(
    authController.verifyToken,
    notificationController.markNotificationAsRead
  );
module.exports = router;
