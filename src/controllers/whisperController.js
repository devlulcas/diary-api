const WhisperService = require("../services/whisperService");

class WhisperController {
  async createWhisper(req, res, next) {
    try {
      const { whisper } = req.body;
      const userId = req.userId;
      const whisperService = new WhisperService();
      const success = await whisperService.create(userId, whisper);
      res.json({ success, status: "OK CREATED WHISPER" });
    } catch (error) {
      next(error);
    }
  }

  async getWhisper(req, res, next) {
    try {
      const whisperService = new WhisperService();
      const whisper = await whisperService.get();
      res.json({ success: true, whisper });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = WhisperController;
