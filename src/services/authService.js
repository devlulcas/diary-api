const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const { join } = require("path");
const lifespan = process.env.TOKEN_EXPIRES_IN;

class AuthService {
  // Retorna JWT se usuário tiver autorização
  async getToken(userId, isAuthorized) {
    try {
      if (!(isAuthorized === true)) throw new Error("User is not authorized");
      // A chave de assinatura é armazenada num arquivo e gerada por um script
      const path = join(__dirname, "..", "..", ".secret.key");
      const secret = readFileSync(path, "utf-8", (error, data) => {
        if (error) throw new Error(`Could not read secret key\n ${error}`);
      });
      // Criamos o token com id do usuário no payload, assinado com a
      // chave e com uma duração especificada como variável de ambiente
      return jwt.sign({ id: userId }, secret, { expiresIn: lifespan });
    } catch (error) {
      throw error;
    }
  }

  // Verifica se a senha recebida é compatível com a armazenada no banco de dados
  async verifyUser(userPassword, storedHashedPassword) {
    try {
      return await bcrypt.compare(userPassword, storedHashedPassword);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
