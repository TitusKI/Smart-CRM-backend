const express = require("express");
const leadController = require("../controllers/leadController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.verifyToken, leadController.getAllLeads)
  .post(authController.verifyToken, leadController.createLead);

router
  .route("/:id")
  .get(authController.verifyToken, leadController.getLead)
  .put(authController.verifyToken, leadController.updateLead)
  .delete(authController.verifyToken, leadController.deleteLead);

router
  .route("/:id/approve")
  .post(
    authController.verifyToken,
    authController.restrictAccess("admin"),
    leadController.approveLead
  );

router
  .route("/:id/reject")
  .post(
    authController.verifyToken,
    authController.restrictAccess("admin"),
    leadController.rejectLead
  );

router
  .route("/admin/approval-queue")
  .get(
    authController.verifyToken,
    authController.restrictAccess("admin"),
    leadController.getApprovalQueue
  );

module.exports = router;
