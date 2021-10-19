const DatabaseService = require("../services/databaseService");

class WhisperService {
  constructor() {
    this._databaseService = new DatabaseService();
  }

  // Cria um sussurro praticamente anônimo. Precisamos do ID do usuário para
  // talvez no futuro ter como banir alguém que está postando coisas ilícitas.
  async create(userId, whisper) {
    try {
      return await this._databaseService.createNewWhisper(userId, whisper);
    } catch (error) {
      throw error;
    }
  }

  // Simplesmente pega um sussurro aleatório toda vez que é chamado
  async get() {
    try {
      return await this._databaseService.getWhisper();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WhisperService;
