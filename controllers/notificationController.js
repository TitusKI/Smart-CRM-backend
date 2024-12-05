const Notification = require("../models/notificationModel");
const asyncHandler = require("express-async-handler");

exports.getNotifications = asyncHandler(async (req, res) => {
  //   const notifications = await Notification.find({ user_id: req.user.id }).sort({
  //     createdAt: -1,
  //   });

  try {
    const notifications = await Notification.find({
      user_id: req.user.id,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: notifications.length,
      data: { notifications },
    });
  } catch (error) {
    console.log("Error fetching notifications:", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

exports.markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification || notification.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("Notification not found or unauthorized");
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json({
    status: "success",
    data: { notification },
  });
});
