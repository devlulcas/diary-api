const ConfigData = require("./data/configData");
class ConfigService {
  constructor(userId) {
    if (!Number.isInteger(userId)) throw new Error("User has to be integer");
    this.data = new ConfigData();
    this.userId = userId;
  }

  async get() {
    try {
      return await this.data.findConfig(this.userId);
    } catch (error) {
      throw error;
    }
  }

  async update(userConfig) {
    try {
      return await this.data.updateConfig(this.userId, userConfig);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ConfigService;
