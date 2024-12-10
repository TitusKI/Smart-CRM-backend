const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.route("/signUp").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logOut").post(authController.logOut);
router
  .route("/")
  .get(
    authController.verifyToken,
    authController.restrictAccess("admin"),
    userController.getAllUsers
  )
  .post(
    authController.verifyToken,
    authController.restrictAccess("admin"),
    userController.createUser
  );

router
  .route("/:id")
  .get(
    authController.verifyToken,
    authController.restrictAccess("admin"),
    userController.getUser
  )
  .delete(
    authController.verifyToken,
    authController.restrictAccess("admin"),
    userController.deleteUser
  );

router.route("/deleteMe").delete(
  authController.verifyToken,

  userController.deleteMyAccount
);
module.exports = router;
