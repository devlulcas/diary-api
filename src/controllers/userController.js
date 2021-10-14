const ValidationService = require("../services/validationService");
const UserService = require("../services/userService");

class UserController {
  // Registro do usuário completo (com validação)
  async registerUser(req, res) {
    const userData = req.body;
    // Validando os dados recebidos
    const validationService = new ValidationService(res);
    const { isDataValid, message } = validationService.verifyUserData(
      userData,
      "register"
    );
    if (!isDataValid) return validationService.errorLog(message);
    // Caso os dados sejam válidos pedimos para criar o usuário
    const userService = new UserService();
    const user = await userService.create(userData);
    const successMessage = "OK REGISTERED";
    const errorMessage = "CAN NOT REGISTER USER";
    if (user.error) {
      return res.status(409).send({ status: errorMessage, user });
    }
    // Caso a operação seja bem sucedida prosseguimos
    return res.send({ status: successMessage, user });
  }

  // Login do usuário completo (com validação)
  async loginUser(req, res) {
    const userData = req.body;
    // Validando os dados recebidos
    const validationService = new ValidationService(res);
    const { isDataValid, message } = validationService.verifyUserData(
      userData,
      "login"
    );
    if (!isDataValid) return validationService.errorLog(message);
    // Caso os dados sejam válidos pedimos para buscá-lo
    const userService = new UserService();
    const user = await userService.get(userData);
    const successMessage = "OK LOGGED IN";
    const errorMessage = "CAN NOT LOGIN THIS USER";
    if (user.error) {
      return res.status(409).send({ status: errorMessage, user });
    }
    // Caso a operação seja bem sucedida prosseguimos
    return res.send({ status: successMessage, user });
  }

  async updateUser(req, res) {
    const userData = req.body;
    // Validando os dados recebidos
    const validationService = new ValidationService(res);
    const { isDataValid, message } = validationService.verifyUserData(
      userData,
      "login"
    );
    if (!isDataValid) return validationService.errorLog(message);
    // Caso os dados sejam válidos...
    const userService = new UserService();
    const user = await userService.update(userData);
    const successMessage = "OK CHANGED";
    const errorMessage = "CAN NOT CHANGE INFO";
    if (user.error) {
      return res.status(403).send({ status: errorMessage, user });
    }
    // Caso a operação seja bem sucedida prosseguimos
    return res.send({ status: successMessage, user });
  }
}

module.exports = UserController;
