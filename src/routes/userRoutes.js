const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controllers/userController");
const userController = new UserController();

// Services
const AuthService = require("../services/authService");
const authService = new AuthService();

// Register
router.post("/register", userController.registerUser);

// Login
router.post("/login", userController.loginUser);

// Update
router.post("/update", authService.verifyToken, userController.updateUser);

// Logout
router.get("/logout", authService.verifyToken, userController.logoutUser);

module.exports = router;
