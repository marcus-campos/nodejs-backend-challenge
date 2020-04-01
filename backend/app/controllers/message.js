const io = require("../../bin/www");
const models = require("@models");
const Messages = models.Message;
const User = models.User;
const Room = models.Room;

class MessageController {
  async index(req, res) {
    try {
      const messages = await Messages.findAll({
        where: {
          roomId: req.params.id
        },
        include: [
          {
            model: User,
            attributes: ["id", "name", "nick", "email"],
            as: "user"
          },
          { model: Room, attributes: ["id", "name"], as: "room" }
        ]
      });
      return res.json(messages);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      let message = await Messages.create(req.body);
      message = await Messages.findOne({
        where: {
          id: message.id
        },
        include: [
          {
            model: User,
            attributes: ["id", "name", "nick", "email"],
            as: "user"
          },
          { model: Room, attributes: ["id", "name"], as: "room" }
        ]
      })
      return res.json(message);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new MessageController();
