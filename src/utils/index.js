function treatText(userDataField) {
  // Tratar dados do usuário retirando os espaços em branco
  const regexWhiteSpace = /\s+/g;
  const treatedUserDataField = userDataField.replace(regexWhiteSpace, "");
  return treatedUserDataField.toLowerCase();
}

module.exports = { treatText };
