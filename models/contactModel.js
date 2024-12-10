const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "please add a contact name"],
  },
  phone: {
    type: String,
    required: [true, "please add the phone number of the contact"],
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
