const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controllers/userController");
const userController = new UserController();

// Register
router.post("/register", userController.registerUser);

// Login
router.post("/login", userController.loginUser);

// Update
router.post("/update", userController.updateUser);

module.exports = router;
