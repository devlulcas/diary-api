const ValidationService = require("../services/validationService");

class UserController {
  // Registro do usuário completo (com validação)
  registerUser(req, res) {
    const data = req.body;
    const { userName, userEmail, userPassword, userTermsAndConditions } = data;

    // Validando os dados recebidos
    const vs = new ValidationService(res);
    const { isDataValid, message } = vs.verifyUserData(data, "register");
    if (!isDataValid) return vs.errorLog(message);

    // Caso os dados sejam válidos...
    res.json({ status: "OK REGISTERED" });
  }

  // Login do usuário completo (com validação)
  loginUser(req, res) {
    const data = req.body;
    const { userEmail, userPassword } = data;

    // Validando os dados recebidos
    const vs = new ValidationService(res);
    const { isDataValid, message } = vs.verifyUserData(data, "login");
    if (!isDataValid) return vs.errorLog(message);

    // Caso os dados sejam válidos...
    res.json({ status: "OK LOGGED IN" });
  }

  updateUser(req, res) {
    const data = req.body;
    const { userEmail, userPassword } = data;

    // Validando os dados recebidos
    const vs = new ValidationService(res);
    const { isDataValid, message } = vs.verifyUserData(data, "login");
    if (!isDataValid) return vs.errorLog(message);

    // Caso os dados sejam válidos...
    res.json({ status: "OK CHANGED" });
  }
}

module.exports = UserController;
