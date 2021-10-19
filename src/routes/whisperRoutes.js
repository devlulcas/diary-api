const express = require("express");
const router = express.Router();

// Controllers
const WhisperController = require("../controllers/whisperController");
const whisperController = new WhisperController();

// Services
const AuthService = require("../services/authService");
const authService = new AuthService();

// Whisper
router.get("/", authService.verifyToken, whisperController.getWhisper);
router.post("/", authService.verifyToken, whisperController.createWhisper);
module.exports = router;
