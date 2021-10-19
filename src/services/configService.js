const DatabaseService = require("../services/databaseService");

class ConfigService {
  constructor(userId) {
    this._databaseService = new DatabaseService();
    if (!Number.isInteger(userId)) {
      throw new Error("User id needs to be an integer");
    }
    this.userId = userId;
  }

  async create(userConfig = { colorScheme: 0 }) {
    try {
      return await this._databaseService.createNewConfig(
        this.userId,
        userConfig
      );
    } catch (error) {
      throw error;
    }
  }

  async get() {
    try {
      return await this._databaseService.findConfig(this.userId);
    } catch (error) {
      throw error;
    }
  }

  async update(userConfig) {
    try {
      console.log(userConfig);
      return await this._databaseService.updateConfig(this.userId, userConfig);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ConfigService;
