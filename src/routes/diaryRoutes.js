const express = require("express");
const router = express.Router();

// Controllers
const DiaryController = require("../controllers/diaryController");
const diaryController = new DiaryController();

// Diary
router.get("/", diaryController.getDiaryContent);
router.put("/", diaryController.updateDiaryContent);

module.exports = router;
