const io = require("../../bin/www")
const models = require('@models');
const Messages = models.Message
const User = models.User
const Room = models.Room

class MessageController {
  async index(req, res) {
    try {
      const messages = await Messages.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'nick', 'email']},
          { model: Room, as: 'room', attributes: ['id', 'name']}
        ],
        where: {
          roomId: req.params.id
        }
      });
      return res.json(messages);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const message = await Messages.create(req.body);
      return res.json(message);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new MessageController();