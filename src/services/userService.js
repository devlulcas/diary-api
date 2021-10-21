const { treatText } = require("../utils");
const UserData = require("./data/userData");
const bcrypt = require("bcryptjs");

class UserService {
  constructor() {
    this.data = new UserData();
  }

  // Responsável por passar os dados prontos para serem inseridos no banco de dados
  async create(userData) {
    try {
      // Data
      const { userName, userEmail, userPassword } = userData;
      const treatedData = await this.getTreatedData(
        userName,
        userEmail,
        userPassword
      );
      // Retorna usuário recém criado ou erro
      return await this.data.createNewUser(...treatedData); 
    } catch (error) {
      throw error;
    }
  }

  // Responsável por pegar os dados do banco de dados a partir de dados tratados
  async get(userData) {
    try {
      // Data
      const { userName, userEmail } = userData;
      const treatedData = await this.getTreatedData(userName, userEmail);
      // Retorna usuário já existente
      return await this.data.findUser(...treatedData);
    } catch (error) {
      throw error;
    }
  }

  // Responsável por alterar as informações atuais de um usuário
  async update(userId, oldUserData, newUserData) {
    try {
      // Data
      const { userName, userEmail, userPassword } = oldUserData;
      const { newUserName, newUserEmail, newUserPassword } = newUserData;
      const { password } = this.data.findUser(userName, userEmail);
      const isAuthorized = this.verifyUserPassword(userPassword, password);
      if (!isAuthorized) throw new Error("Wrong password");
      const treatedData = await this.getTreatedData(
        newUserName,
        newUserEmail,
        newUserPassword
      );
      // Retorna os dados atualizados do usuário
      return await this.data.updateUser(userId, treatedData);
    } catch (error) {
      throw error;
    }
  }

  // Retorna os dados tratados
  async getTreatedData(userName, userEmail, userPassword) {
    try {
      return [
        treatText(userName),
        treatText(userEmail),
        await this.hashPassword(userPassword),
      ];
    } catch (error) {
      throw error;
    }
  }

  // Responsável por tornar o armazenamento de senhas mais seguro
  async hashPassword(userPassword) {
    try {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(userPassword, salt);
    } catch (error) {
      throw error;
    }
  }

  // Verifica se a senha recebida é compatível com a armazenada no banco de dados
  async verifyUserPassword(userPassword, storedHashedPassword) {
    try {
      return await bcrypt.compare(userPassword, storedHashedPassword);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
