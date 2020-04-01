const models = require('@models');
const User = models.User

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const user = await User.findOrCreate({
        where: { nick: req.body.nick },
        defaults: req.body
      });
      return res.json(user[0]);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new UserController();