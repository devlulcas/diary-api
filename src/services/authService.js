const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const { join } = require("path");
const lifespan = process.env.TOKEN_EXPIRES_IN;
// A chave de assinatura é armazenada num arquivo e gerada por um script
const path = join(__dirname, "..", "..", ".secret.key");
const secret = readFileSync(path, "utf-8", (error, data) => {
  if (error) throw new Error(`Could not read secret key\n ${error}`);
});

class AuthService {
  // Retorna JWT se usuário tiver autorização
  async getToken(userId, isAuthorized) {
    try {
      if (!(isAuthorized === true)) throw new Error("User is not authorized");
      // Criamos o token com id do usuário no payload, assinado com a
      // chave e com uma duração especificada como variável de ambiente
      return jwt.sign({ id: userId }, secret, { expiresIn: lifespan });
    } catch (error) {
      throw error;
    }
  }

  // AUTH MIDDLEWARE
  verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) throw new Error("No token provided. Cannot proceed");
    // Retorna o id do usuário caso tenha autorização
    jwt.verify(token, secret, (error, decoded) => {
      if (error) throw new Error("Failed to authenticate token. SUS");
      req.userId = decoded.id;
      next();
    });
  }
}

module.exports = AuthService;
