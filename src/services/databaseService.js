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
}

module.exports = DatabaseService;
