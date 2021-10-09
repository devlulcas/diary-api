class DiaryController {
  getDiaryContent(req, res) {
    res.json({ status: "OK GET DIARY" });
  }

  updateDiaryContent(req, res) {
    res.json({ status: "OK UPDATE DIARY" });
  }
}

module.exports = DiaryController;
