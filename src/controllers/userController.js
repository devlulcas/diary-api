class UserController {
  registerUser(req, res) {
    res.json({ status: "OK REGISTERED" });
  }

  loginUser(req, res) {
    res.json({ status: "OK LOGGED IN" });
  }

  updateUser(req, res) {
    res.json({ status: "OK LOGGED IN" });
  }
}

module.exports = UserController;
