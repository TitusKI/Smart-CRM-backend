// firebase.js
const admin = require("firebase-admin");
const dotenv = require("dotenv").config();

// Load service account credentials from an environment variable
var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
