const knex = require("../../database");

// OPERAÇÕES RELACIONADAS AS CONFIGURAÇÕES
class ConfigData {
  async findConfig(userId) {
    try {
      const config = await knex("config").where({ id: userId });
      return config[0];
    } catch (error) {
      throw error;
    }
  }

  async updateConfig(userId, newUserConfig) {
    try {
      // Se os dados passados não forem os desejados devemos retornar erros
      const { colorScheme } = newUserConfig;
      if (!Number.isInteger(colorScheme)) {
        throw new Error("Color scheme has to be a number");
      }
      // Caso contrário seguimos com o update
      await knex("config")
        .where({ id: userId })
        .update({ color_scheme: colorScheme });
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ConfigData;
