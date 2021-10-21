const DiaryService = require("../services/diaryService");
const { diaryPath } = require("../utils");

class DiaryController {
  getDiaryContent(req, res, next) {
    try {
      const userId = req.userId;
      const diaryRelativePath = diaryPath(userId);
      const diaryService = new DiaryService(diaryRelativePath);
      const diaryReadStream = diaryService.get();
      diaryReadStream.pipe(res);
    } catch (error) {
      next(error);
    }
  }

  updateDiaryContent(req, res, next) {
    try {
      const userId = req.userId;
      const diaryRelativePath = diaryPath(userId);
      const diaryService = new DiaryService(diaryRelativePath);
      req.pipe(diaryService.update());
      res.json({ success: true, status: "OK GET DIARY" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DiaryController;
