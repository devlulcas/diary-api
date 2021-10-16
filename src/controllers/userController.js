const ValidationService = require("../services/validationService");
const UserService = require("../services/userService");
const DiaryService = require("../services/diaryService");

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
      const user = await userService.create(userData);
      // Caso a operação seja bem sucedida prosseguimos criando o diário
      const diaryService = new DiaryService(user.id);
      const diary = await diaryService.create();
      // Tudo correu como o planejado
      const successMessage = "OK REGISTERED";
      return res.status(201).send({ status: successMessage, user, diary });
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
      const user = await userService.get(userData);
      // Tudo correu como o planejado
      const successMessage = "OK LOGGED IN";
      return res.status(201).send({ status: successMessage, user });
    } catch (error) {
      next(error);
    }
  }

  // Atualização de usuário completo (com validação)
  async updateUser(req, res, next) {
    try {
      const userData = req.body;
      // Validando os dados recebidos
      const validationService = new ValidationService(res);
      validationService.verifyUserData(userData, "update");
      // Caso os dados sejam válidos...
      const userService = new UserService();
      const user = await userService.update(userData);
      // Tudo correu como o planejado
      const successMessage = "OK CHANGED";
      return res.send({ status: successMessage, user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
