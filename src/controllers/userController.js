const ValidationService = require("../services/validationService");
const UserService = require("../services/userService");
const DiaryService = require("../services/diaryService");
const AuthService = require("../services/authService");

class UserController {
  // Registro do usuário completo (com validação)
  async registerUser(req, res, next) {
    try {
      const userData = req.body;
      // Validando os dados recebidos
      const validationService = new ValidationService(res);
      validationService.verifyUserData(userData, "register");
      // Caso os dados sejam válidos pedimos para criar o usuário
      const userService = new UserService();
      const { id } = await userService.create(userData);
      // Caso a operação seja bem sucedida prosseguimos criando o diário
      const diaryService = new DiaryService(id);
      await diaryService.create();
      // Com os dados em mão retornamos um JWT diretamente, afinal o usuário foi criado agora
      const authService = new AuthService();
      const jwt = await authService.getToken(id, true);
      return res.status(201).send({ status: "OK REGISTERED", jwt });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // Login do usuário completo (com validação)
  async loginUser(req, res, next) {
    try {
      const userData = req.body;
      // Validando os dados recebidos
      const validationService = new ValidationService(res);
      validationService.verifyUserData(userData, "login");
      // Caso os dados sejam válidos pedimos para buscá-lo
      const userService = new UserService();
      const { id, password } = await userService.get(userData);
      const plainTextPassword = userData.userPassword;
      // Com os dados em mão retornamos um JWT se o usuário e senha estiverem corretos
      const authService = new AuthService();
      const isAuthorized = await authService.verifyUser(
        plainTextPassword,
        password
      );
      const jwt = await authService.getToken(id, isAuthorized);
      return res.send({ status: "OK LOGGED IN", jwt });
    } catch (error) {
      next(error);
    }
  }

  // Atualização de usuário completo (com validação)
  async updateUser(req, res, next) {
    try {
      const userData = req.body;
      const { userId } = req.params;
      // Validando os dados recebidos
      const validationService = new ValidationService(res);
      validationService.verifyUserData(userData, "update");
      // Caso os dados sejam válidos...
      const userService = new UserService();
      const user = await userService.update(userId, userData);
      // Tudo correu como o planejado
      const successMessage = "OK CHANGED";
      return res.send({ status: successMessage, user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
