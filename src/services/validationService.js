const { treatText } = require("../utils");

class ValidationService {
  constructor(res) {
    this.res = res;
  }

  errorLog(message) {
    const status = 403;
    const body = {
      error: message,
      isValid: false,
    };
    this.res.status(status).send(body);
  }

  // Verificar se os termos e condições foram aceitos
  _verifyTermsAndConditions(userTermsAndConditions) {
    if (userTermsAndConditions == false || userTermsAndConditions == "false") {
      return true;
    }
    return false;
  }

  // Verificar se há campos vazios (Chamar depois de verifyTermsAndConditions)
  _verifyMissingFields(data, userFlow) {
    let userData = [data.userEmail, data.userPassword];

    if (userFlow == "register") {
      userData.push(data.userName, data.userTermsAndConditions);
    }

    // Não podemos seguir se algum campo estiver vazio
    for (const field of userData) {
      if (!field) {
        return true;
      }
    }
    return false;
  }

  // Verificar se um email é válido e retornar o email tratado caso realmente seja
  _verifyUserEmail(userEmail) {
    // Verificar se a estrutura do email corresponde a esta: _@_._
    const regexEmailEstruture = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regexEmailEstruture.test(userEmail);
    return !isValid;
  }

  // Verificar se a senha é segura (contém mais de oito caracteres), se for retornar hash
  _verifyPassword(userPassword) {
    return userPassword.length < 8;
  }

  verifyUserData(data, userFlow) {
    const { userName, userEmail, userPassword, userTermsAndConditions } = data;
    const treatedUserEmail = treatText(userEmail);
    const invalidTerms = this._verifyTermsAndConditions(userTermsAndConditions);
    const invalidField = this._verifyMissingFields(data, userFlow);
    const invalidEmail = this._verifyUserEmail(treatedUserEmail);
    const invalidPassword = this._verifyPassword(userPassword);
    let message = "everything is ok";
    let isDataValid = true;

    // A execução não deve continuar se algum desses casos acontecer
    if (userFlow == "register") {
      if (invalidTerms) {
        message = "user refused therms and conditions";
        isDataValid = false;
        return {
          isDataValid,
          message,
        };
      }
    }

    if (invalidField) {
      message = "there is a parameter missing in you request";
      isDataValid = false;
      return {
        isDataValid,
        message,
      };
    }

    if (invalidEmail) {
      message = "invalid email";
      isDataValid = false;
      return {
        isDataValid,
        message,
      };
    }

    if (invalidPassword) {
      message = "password too short";
      isDataValid = false;
      return {
        isDataValid,
        message,
      };
    }

    return {
      isDataValid,
      message,
    };
  }
}

module.exports = ValidationService;
