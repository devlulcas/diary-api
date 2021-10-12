const ValidationService = require("../services/validationService");
const UserService = require("../services/userService");
class UserController {
  constructor() {
    this._userService = new UserService();
  }

  // Registro do usuário completo (com validação)
  registerUser(req, res) {
    const userData = req.body;

    // Validando os dados recebidos
    const validationService = new ValidationService(res);
    const { isDataValid, message } = validationService.verifyUserData(
      userData,
      "register"
    );

    if (!isDataValid) return validationService.errorLog(message);

    // Caso os dados sejam válidos criamos o usuário ou retornamos um que já existe
    const user = await this._userService.create(data);

    res.json({ status: "OK REGISTERED", user });
  }

  // Login do usuário completo (com validação)
  loginUser(req, res) {
    const data = req.body;

    // Validando os dados recebidos
    const validationService = new ValidationService(res);
    const { isDataValid, message } = validationService.verifyUserData(
      data,
      "login"
    );
    if (!isDataValid) return validationService.errorLog(message);

    // Caso os dados sejam válidos...
    const user = await this._userService.get(data);

    res.json({ status: "OK LOGGED IN", user });
  }

  updateUser(req, res) {
    const data = req.body;

    // Validando os dados recebidos
    const validationService = new ValidationService(res);
    const { isDataValid, message } = validationService.verifyUserData(
      data,
      "login"
    );
    if (!isDataValid) return validationService.errorLog(message);

    // Caso os dados sejam válidos...
    const user = await this._userService.update(data);
    res.json({ status: "OK CHANGED", user });
  }
}

module.exports = UserController;
