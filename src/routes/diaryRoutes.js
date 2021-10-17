const express = require("express");
const router = express.Router();

// Controllers
const DiaryController = require("../controllers/diaryController");
const diaryController = new DiaryController();

// Services
const AuthService = require("../services/authService");
const authService = new AuthService();

// Diary
router.get("/", authService.verifyToken, diaryController.getDiaryContent);
router.put("/", authService.verifyToken, diaryController.updateDiaryContent);

module.exports = router;
