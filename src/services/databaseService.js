const knex = require("../database");
class DatabaseService {
  // OPERAÇÕES RELACIONADAS AOS USUÁRIOS
  async createNewUser(username, email, password) {
    // Caso algum dos dados bata com um existente devemos parar por aqui
    const userId = await knex("user")
      .select("id")
      .where({ email })
      .orWhere({ username });

    if (userId.length) {
      const errorMessage = "Someone already took this email or username";
      return { errorMessage, error: true };
    }
    // Caso nem o email e nem o username tenham sido pegos, criamos o usuário
    await knex("user").insert({ username, email, password });
    const user = await this.findUser(username, email);
    return { user, error: false };
  }

  async findUser(username, email) {
    const user = await knex("user").where({ username, email });
    if (!user[0]) {
      const errorMessage = "This user does not exist";
      return { errorMessage, error: true };
    }
    return { user, error: false };
  }
}

module.exports = DatabaseService;
