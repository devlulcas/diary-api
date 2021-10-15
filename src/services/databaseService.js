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
      const user = await this.findUser(username, email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUser(username, email) {
    try {
      const user = await knex("user").where({ username, email })[0];
      if (!user) throw new Error("This user does not exist");
      return user;
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
      const user = await this.findUser(username, email);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // OPERAÇÕES RELACIONADAS AOS DIÁRIOS
  async createNewDiary(userId, path) {
    try {
      if (!userId) throw new Error("Could not create diary, empty user id");
      await knex("diary").insert({ user_id: userId, path });
      const diary = await this.findDiary(userId);
      return diary;
    } catch (error) {
      throw error;
    }
  }

  async findDiaryPath(userId) {
    try {
      if (!userId) throw new Error("Could not find diary, empty user id");
      const diaryPath = await knex("diary").where({ user_id: userId })[0];
      return diaryPath;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DatabaseService;
