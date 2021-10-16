const { treatText } = require("../utils");

class ValidationService {
  constructor(res) {
    this.res = res;
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
    let userData = [data.userName, data.userEmail, data.userPassword];

    if (userFlow == "register") {
      userData.push(data.userTermsAndConditions);
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
    const regexEmailStructure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regexEmailStructure.test(userEmail);
    return !isValid;
  }

  // Verificar se a senha é segura (contém mais de oito caracteres), se for retornar hash
  _verifyPassword(userPassword) {
    return userPassword.length < 8;
  }

  verifyUserData(data, userFlow) {
    const { userEmail, userPassword, userTermsAndConditions } = data;
    const treatedUserEmail = treatText(userEmail);
    const invalidTerms = this._verifyTermsAndConditions(userTermsAndConditions);
    const invalidField = this._verifyMissingFields(data, userFlow);
    const invalidEmail = this._verifyUserEmail(treatedUserEmail);
    const invalidPassword = this._verifyPassword(userPassword);
    let message;

    // A execução não deve continuar se algum desses casos acontecer
    if (userFlow == "register") {
      if (invalidTerms) {
        message = "user refused therms and conditions";
        throw new Error(message);
      }
    }

    if (invalidField) {
      message = "there is a parameter missing in you request";
      throw new Error(message);
    }

    if (invalidEmail) {
      message = "invalid email";
      throw new Error(message);
    }

    if (invalidPassword) {
      message = "password too short";
      throw new Error(message);
    }
  }
}

module.exports = ValidationService;
