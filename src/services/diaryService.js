const DatabaseService = require("../services/databaseService");
const path = require("path");
const { writeFile, createReadStream, createWriteStream } = require("fs");

class DiaryService {
  // Criar diário pela primeira vez
  constructor(userId) {
    this._databaseService = new DatabaseService();
    if (!Number.isInteger(userId)) {
      throw new Error("User id needs to be an integer");
    }
    this.userId = userId;
    this.diaryPath = this._diaryPath();
  }

  _diaryPath() {
    const diaryFilename = `${this.userId}_diary.txt`;
    const fullPath = path.join(
      __dirname,
      "..",
      "..",
      "content",
      "diaries",
      diaryFilename
    );
    return fullPath;
  }

  // Utilizado para criar o arquivo de diário apenas quando um novo usuário surge
  async create() {
    try {
      writeFile(this.diaryPath, "Querido diário...", (error) => {
        if (error) {
          console.log(error);
          throw new Error("Could not proceed file operation");
        }
      });
      return await this._databaseService.createNewDiary(
        this.userId,
        this.diaryPath
      );
    } catch (error) {
      throw error;
    }
  }

  // Responsável por pegar os dados do banco de dados a partir de dados tratados
  get() {
    try {
      return createReadStream(this._diaryPath, { encoding: "utf-8" });
    } catch (error) {
      throw error;
    }
  }

  // Responsável por alterar as informações atuais de um usuário
  update(textChunk) {
    try {
      const diaryWriteStream = createWriteStream(this._diaryPath, {
        encoding: "utf-8",
      });
      diaryWriteStream.write(textChunk, (error) => {
        console.log(error);
        throw error;
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DiaryService;
