const ConfigService = require("../services/configService");

class ConfigController {
  async getConfig(req, res, next) {
    try {
      const userId = req.userId;
      const configService = new ConfigService(userId);
      const config = await configService.get();
      return res.json({ success: true, status: "GOT CONFIG", config });
    } catch (error) {
      next(error);
    }
  }

  async updateConfig(req, res, next) {
    try {
      const userId = req.userId;
      const config = req.body;
      console.log(config);
      const configService = new ConfigService(userId);
      const success = await configService.update(config);
      return res.json({ success, status: "UPDATED CONFIG" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ConfigController;
