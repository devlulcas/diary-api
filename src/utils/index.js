const path = require("path");

function treatText(userDataField) {
  // Tratar dados do usuário retirando os espaços em branco
  const regexWhiteSpace = /\s+/g;
  const treatedUserDataField = userDataField.replace(regexWhiteSpace, "");
  return treatedUserDataField.toLowerCase();
}

function diaryPath(userId) {
  if (!Number.isInteger(userId)) {
    throw new Error("User id needs to be an integer");
  }
  const diaryFilename = `${userId}_diary.txt`;
  return path.join("..", "..", "content", "diaries", diaryFilename);
}

module.exports = { treatText, diaryPath };
