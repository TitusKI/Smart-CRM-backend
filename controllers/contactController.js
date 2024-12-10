const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

exports.getAllContacts = asyncHandler(async (req, res) => {
  let contacts;
  if (req.user.role === "admin") contacts = await Contact.find({});
  else {
    contacts = await Contact.find({ user_id: req.user.id });
  }

  res.status(200).json({
    status: "success",
    results: contacts.length,
    data: {
      contacts,
    },
  });
});
exports.getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({
    user_id: req.user.id,
    _id: req.params.id,
  });

  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});
exports.createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, phone } = req.body;
  if (!name || !phone) {
    res.status(400);
    throw new Error("name and phone are mandatory.");
  }

  try {
    const contact = await Contact.create({
      name,
      phone,
      address: req.body.address,
      role: req.body.relationship,
      user_id: req.user.id,
    });

    console.log(contact);

    res.status(201).json({
      status: "success",
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("no contact with given id exists");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user do not have permission to update contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedContact,
    },
  });
});
exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("no contact with given id exists");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user do not have permission to update contacts");
  }
  const updatedContact = await Contact.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: updatedContact,
  });
});
