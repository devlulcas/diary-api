const knex = require("../../database");

// OPERAÇÕES RELACIONADAS AOS SUSSURROS
class WhisperData {
  async createNewWhisper(userId, whisper) {
    try {
      if (!whisper) throw new Error("Say it louder! Cannot whisper nothing...");
      await knex("whisper").insert({ user_id: userId, whisper });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getWhisper() {
    try {
      // Raw select para obter rows aleatórias
      let whisper = await knex.raw(
        "SELECT whisper FROM whisper ORDER BY RANDOM() LIMIT 1;"
      );
      // Precisamos fazer isso para selecionar apenas o texto do sussurro
      whisper = whisper.rows[0].whisper;
      if (!whisper[0]) throw new Error("No whispers...");
      return whisper;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WhisperData;
