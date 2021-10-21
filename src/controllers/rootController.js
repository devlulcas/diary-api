class RootController {
  getInformation(req, res) {
    // Informações sobre a API
    const information = {
      version: "1.1.0",
      name: "diary-api",
      status: "ready",
    };

    res.json(information);
  }
}

module.exports = RootController;
