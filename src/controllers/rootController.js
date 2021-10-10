class RootController {
  getInformation(req, res) {
    // Informações sobre a API
    const information = {
      version: "0.1.0",
      name: "diary-api",
      status: "not ready",
    };

    res.json(information);
  }
}

module.exports = RootController;
