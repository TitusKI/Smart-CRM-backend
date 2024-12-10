const Lead = require("../models/leadModel");
const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

// Retrieve all leads (Filter by status)
exports.getAllLeads = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};

  // Users can only view their leads; Admins can view all
  if (req.user.role !== "admin") {
    filter.user_id = req.user.id;
  }
  if (status) {
    filter.status = status;
  }

  const leads = await Lead.find(filter);
  res.status(200).json({
    status: "success",
    results: leads.length,
    data: { leads },
  });
});

// Retrieve a single lead
exports.getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (
    !lead ||
    (req.user.role !== "admin" && lead.user_id.toString() !== req.user.id)
  ) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.status(200).json({
    status: "success",
    data: { lead },
  });
});

exports.createLead = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Title and description are required");
  }

  console.log("starting to create a lead");

  try {
    const lead = await Lead.create({
      title,
      description,
      user_id: req.user.id,
    });

    console.log(lead);
    res.status(201).json({
      status: "success",
      data: { lead },
    });
  } catch (err) {
    console.error("Error creating lead:", err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the lead",
    });
  }
});

// Update lead details
exports.updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (
    !lead ||
    (req.user.role !== "admin" && lead.user_id.toString() !== req.user.id)
  ) {
    res.status(404);
    throw new Error("Lead not found or unauthorized");
  }

  const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: { updatedLead },
  });
});

// Delete a lead
exports.deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (
    !lead ||
    (req.user.role !== "admin" && lead.user_id.toString() !== req.user.id)
  ) {
    res.status(404);
    throw new Error("Lead not found or unauthorized");
  }

  await Lead.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: "success", data: null });
});

// approved lead
exports.approveLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead || lead.status !== "Pending") {
    res.status(404);
    throw new Error("Lead not found or not in Pending status");
  }

  lead.status = "Approved";
  lead.notificationSent = true;
  await lead.save();

  // Create a new notification and save to DB
  await Notification.create({
    user_id: lead.user_id,
    message: `Your lead "${lead.title}" has been approved!`,
  });

  res.status(200).json({
    status: "success",
    data: { lead },
  });
});

// Reject a lead
exports.rejectLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead || lead.status !== "Pending") {
    res.status(404);
    throw new Error("Lead not found or not in Pending status");
  }

  lead.status = "Rejected";
  lead.rejectionNotes =
    req.body.rejectionNotes || "No rejection notes provided";
  lead.notificationSent = true;
  await lead.save();

  // Create a new notification and save to DB
  await Notification.create({
    user_id: lead.user_id,
    message: `Your lead "${lead.title}" has been rejected. Reason: ${lead.rejectionNotes}`,
  });

  res.status(200).json({
    status: "success",
    data: { lead },
  });
});

// Retrieve Approval Queue (Admin only)
exports.getApprovalQueue = asyncHandler(async (req, res) => {
  const leads = await Lead.find({ status: "Pending" });

  res.status(200).json({
    status: "success",
    results: leads.length,
    data: { leads },
  });
});
