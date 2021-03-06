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
      const { id, path } = await userService.create(userData);
      // Caso a operação seja bem sucedida prosseguimos criando o arquivo de diário
      const diaryService = new DiaryService(path);
      await diaryService.create();

      // Com os dados em mão retornamos um JWT diretamente, afinal o usuário foi criado agora
      const authService = new AuthService();
      const jwt = await authService.getToken(id, true);

      // Sucesso
      const maxAgeForCookie = 1000 * 60 * 60 * 24;
      res.cookie("jwt", jwt, { httpOnly: true, maxAge: maxAgeForCookie });
      return res.status(201).json({ success: true, status: "OK REGISTERED" });
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
      const isAuthorized = await userService.verifyUserPassword(
        plainTextPassword,
        password
      );
      const jwt = await authService.getToken(id, isAuthorized);

      // Sucesso
      const maxAgeForCookie = 1000 * 60 * 60 * 24;
      res.cookie("jwt", jwt, { httpOnly: true, maxAge: maxAgeForCookie });
      return res.json({ success: true, status: "OK LOGGED IN" });
    } catch (error) {
      next(error);
    }
  }

  // Atualização de usuário completo (com validação)
  async updateUser(req, res, next) {
    try {
      const { oldUserData, newUserData } = req.body;
      const userId = req.userId;
      // Validando os dados recebidos
      const validationService = new ValidationService(res);
      validationService.verifyUserData(oldUserData, "update");
      validationService.verifyUserData(newUserData, "update");

      // Caso os dados sejam válidos...
      const userService = new UserService();
      const user = await userService.update(userId, oldUserData, newUserData);

      // Tudo correu como o planejado
      return res.json({ success: true, status: "OK CHANGED", user });
    } catch (error) {
      next(error);
    }
  }

  logoutUser(req, res, next) {
    res.cookie("jwt", " ", { maxAge: 1 });
    return res.json({ success: true, status: "LOGGED OUT" });
  }
}

module.exports = UserController;
