const { treatText } = require("../utils");

const DatabaseService = require("../services/databaseService");
const bcrypt = require("bcryptjs");

class UserService {
  constructor() {
    this._databaseService = new DatabaseService();
  }

  // Responsável por passar os dados prontos para serem inseridos no banco de dados
  async create(userData) {
    try {
      // Data
      const { userName, userEmail, userPassword } = userData;
      const treatedData = this._getTreatedData(userName, userEmail);
      const treatedPassword = await this._hashPassword(userPassword);
      // Retorna usuário recém criado ou erro
      const newUser = await this._databaseService.createNewUser(
        ...treatedData,
        treatedPassword
      );
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  // Responsável por pegar os dados do banco de dados a partir de dados tratados
  async get(userData) {
    try {
      // Data
      const { userName, userEmail } = userData;
      const treatedData = this._getTreatedData(userName, userEmail);
      // Retorna usuário já existente
      const existingUser = await this._databaseService.findUser(...treatedData);
      return existingUser;
    } catch (error) {
      throw error;
    }
  }

  // Responsável por alterar as informações atuais de um usuário
  async update(newUserData) {
    try {
      // Data
      const { userName, userEmail, userPassword } = newUserData;
      const treatedData = {
        username: treatText(userName),
        email: treatText(userEmail),
        password: await this._hashPassword(userPassword),
      };
      // Retorna os dados atualizados do usuário
      const updatedUser = await this._databaseService.updateUser(
        userId,
        treatedData
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // Responsável por tornar o armazenamento de senhas mais seguro
  async _hashPassword(userPassword) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userPassword, salt);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  // Verifica se a senha recebida é compatível com a armazenada no banco de dados
  async _isCorrectPassword(userPassword, storedHashedPassword) {
    try {
      return await bcrypt.compare(userPassword, storedHashedPassword);
    } catch (error) {
      throw error;
    }
  }

  // Retorna os dados tratados
  _getTreatedData(userName, userEmail) {
    const treatedUsername = treatText(userName);
    const treatedEmail = treatText(userEmail);
    return [treatedUsername, treatedEmail];
  }
}

module.exports = UserService;
