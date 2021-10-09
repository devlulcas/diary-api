class LoginController {
  login(req, res) {
    res.json({ status: "OK LOGGED IN" });
  }
}

module.exports = LoginController;
