const models = require('@models');
const Room = models.Room

class RoomController {
  async index(req, res) {
    try {
      const rooms = await Room.findAll();
      return res.json(rooms);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const room = await Room.findByPk(req.params.id);
      return res.json(room);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const room = await Room.create(req.body);
      return res.json(room);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new RoomController();