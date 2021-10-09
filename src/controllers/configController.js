class ConfigController {
  getConfig(req, res) {
    res.json({ status: "OK GET CONFIG" });
  }

  createConfig(req, res) {
    res.json({ status: "OK CREATE CONFIG" });
  }

  updateConfig(req, res) {
    res.json({ status: "OK UPDATE CONFIG" });
  }
}

module.exports = ConfigController;
