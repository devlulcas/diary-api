class RootController {
  getInformation(req, res) {
    res.json({ status: "OK GET ROOT INFORMATION" });
  }
}

module.exports = RootController;
