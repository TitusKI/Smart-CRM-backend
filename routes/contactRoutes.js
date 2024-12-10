const express = require("express");
const contactController = require("../controllers/contactController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.verifyToken, contactController.getAllContacts)
  .post(authController.verifyToken, contactController.createContact);

router
  .route("/:id")
  .get(authController.verifyToken, contactController.getContact)
  .patch(authController.verifyToken, contactController.updateContact)
  .delete(authController.verifyToken, contactController.deleteContact);
module.exports = router;
