const knex = require("../database");
class DatabaseService {
  // OPERAÇÕES RELACIONADAS AOS USUÁRIOS
  async createNewUser(username, email, password) {
    try {
      // Caso algum dos dados bata com um existente devemos parar por aqui
      const userId = await knex("user")
        .select("id")
        .where({ email })
        .orWhere({ username });
      if (userId.length) {
        throw new Error("Someone already took this email or username");
      }
      // Caso nem o email e nem o username tenham sido pegos, criamos o usuário
      await knex("user").insert({ username, email, password });
      return await this.findUser(username, email);
    } catch (error) {
      throw error;
    }
  }

  async findUser(username, email) {
    try {
      const user = await knex("user").where({ username, email });
      if (!user[0]) throw new Error("This user does not exist");
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, newData) {
    try {
      if (!userId) throw new Error("Could not change user data, empty user id");
      const { username, email, password } = newData;
      await knex("user")
        .where({ id: userId })
        .update({ username, email, password });
      return await this.findUser(username, email);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // OPERAÇÕES RELACIONADAS AOS DIÁRIOS
  async createNewDiary(userId, path) {
    try {
      await knex("diary").insert({ user_id: userId, path });
      return await this.findDiaryPath(userId);
    } catch (error) {
      throw error;
    }
  }

  async findDiaryPath(userId) {
    try {
      return await knex("diary").where({ user_id: userId })[0];
    } catch (error) {
      throw error;
    }
  }

  // OPERAÇÕES RELACIONADAS AOS SUSSURROS
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
      let whisper = await knex.raw(
        "SELECT whisper FROM whisper ORDER BY RANDOM() LIMIT 1;"
      );

      // Precisamos fazer isso para selecionar apenas o texto do sussurro
      whisper = whisper.rows[0].whisper;
      if (!whisper) throw new Error("No whispers...");
      return whisper;
    } catch (error) {
      throw error;
    }
  }

  // OPERAÇÕES RELACIONADAS AS CONFIGURAÇÕES
  async createNewConfig(userId, userConfig) {
    try {
      // Se os dados passados não forem os desejados devemos retornar erros
      const { colorScheme } = userConfig;
      if (Number.isInteger(colorScheme)) {
        throw new Error("Color scheme has to be a number");
      }
      // Caso contrário podemos cadastrar as configurações
      await knex("config").insert({
        user_id: userId,
        color_scheme: colorScheme,
      });
      return await this.findConfig(userId);
    } catch (error) {
      throw error;
    }
  }

  async findConfig(userId) {
    try {
      const config = await knex("config").where({ user_id: userId });
      return config[0];
    } catch (error) {
      throw error;
    }
  }

  async updateConfig(userId, newUserConfig) {
    try {
      // Se os dados passados não forem os desejados devemos retornar erros
      const { colorScheme } = newUserConfig;
      if (Number.isInteger(colorScheme)) {
        throw new Error("Color scheme has to be a number");
      }
      // Caso contrário seguimos com o update
      await knex("config")
        .where({ user_id: userId })
        .update({ color_scheme: colorScheme });
      return await this.findConfig(userId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DatabaseService;
