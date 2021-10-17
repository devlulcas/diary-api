const express = require("express");
const router = express.Router();

// Controllers
const ConfigController = require("../controllers/configController");
const configController = new ConfigController();

// Services
const AuthService = require("../services/authService");
const authService = new AuthService();

// Config
router.get("/", authService.verifyToken, configController.getConfig);
router.put("/", authService.verifyToken, configController.updateConfig);

module.exports = router;
