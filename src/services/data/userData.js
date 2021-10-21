const knex = require("../../database");
const { diaryPath } = require("../../utils");

// OPERAÇÕES RELACIONADAS AOS USUÁRIOS
class UserData {
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
      // Roda a transaction e obtém os novos dados do usuário
      const newUserData = await this.runCreateUserTransaction(
        username,
        email,
        password
      );
      if (!newUserData) {
        throw new Error("Could not create user, transaction incomplete");
      }
      return newUserData;
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

  // Transaction responsável por realmente criar o usuário no banco
  async runCreateUserTransaction(username, email, password) {
    try {
      await knex.transaction(async (transaction) => {
        // Criar o usuário no banco de dados
        await transaction.insert({ username, email, password }).into("user");
        // Criar a configuração padrão do usuário no banco de dados
        await transaction.insert({ color_scheme: 0 }).into("config");
      });

      // Obtemos os dados do usuário e o caminho do diário para retornar
      const user = await this.findUser(username, email);
      const path = diaryPath(user.id);

      // Criar o diário para o usuário no banco
      await knex("diary").insert({ user_id: user.id, path });

      return {
        ...user,
        path,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = UserData;
