const DiaryService = require("../services/diaryService");
class DiaryController {
  getDiaryContent(req, res, next) {
    try {
      const userId = req.userId;
      const diaryService = new DiaryService(userId);
      const diaryReadStream = diaryService.get();
      diaryReadStream.pipe(res);
    } catch (error) {
      next(error);
    }
  }

  updateDiaryContent(req, res, next) {
    try {
      const userId = req.userId;
      const diaryService = new DiaryService(userId);
      req.pipe(diaryService.update());
      res.json({ success: true, status: "OK GET DIARY" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DiaryController;
