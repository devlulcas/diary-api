class UserController {
  registerUser(req, res) {
    const data = req.body;

    const userData = [
      data.userName,
      data.userEmail,
      data.userPassword,
      data.userBirthDate,
      data.userTermsAndConditions,
    ];

    // Não podemos seguir se algum campo estiver vazio
    for (const field of userData) {
      if (!field)
        return res
          .status(403)
          .send({ error: "there is a parameter missing in you request" });
    }

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
