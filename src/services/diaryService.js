const DatabaseService = require("../services/databaseService");
const path = require("path");
const { writeFile, createReadStream, createWriteStream } = require("fs");
/*
O serviço de diário atualmente guarda os diários como arquivos de texto e armazena no banco de dados
apenas o path do arquivo. Futuramente talvez eu troque isso e os diários passem a ser armazenados no
banco de dados diretamente.

OBS: No momento atual os arquivos não possuem nenhuma criptografia, logo estão vulneráveis a quaisquer
ataque que atinja o sistema operacional, mas se algo assim acontecesse o diário não seria o maior dos
problemas.
*/
class DiaryService {
  // Criar diário pela primeira vez
  constructor(userId) {
    this._databaseService = new DatabaseService();
    if (!Number.isInteger(userId)) {
      throw new Error("User id needs to be an integer");
    }
    this.userId = userId;
    this.diaryRelativePath = this._diaryPath();
    this.diaryAbsolutePath = path.join(__dirname, this.diaryRelativePath);
  }

  _diaryPath() {
    const diaryFilename = `${this.userId}_diary.txt`;
    return path.join("..", "..", "content", "diaries", diaryFilename);
  }

  // Utilizado para criar o arquivo de diário apenas quando um novo usuário surge
  async create() {
    try {
      writeFile(this.diaryAbsolutePath, "Querido diário...", (error) => {
        if (error) {
          console.log(error);
          throw new Error("Could not proceed file operation");
        }
      });
      return await this._databaseService.createNewDiary(
        this.userId,
        this.diaryRelativePath
      );
    } catch (error) {
      throw error;
    }
  }

  // Responsável por pegar os dados do banco de dados a partir de dados tratados
  get() {
    try {
      return createReadStream(this.diaryAbsolutePath, { encoding: "utf-8" });
    } catch (error) {
      throw error;
    }
  }

  // Responsável por alterar as informações atuais de um usuário
  update() {
    try {
      return createWriteStream(this.diaryAbsolutePath, { encoding: "utf-8" });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DiaryService;
