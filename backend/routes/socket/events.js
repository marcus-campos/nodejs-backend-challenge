const models = require('@models');
const Room = models.Room

module.exports = async (io) => {
    rooms = await Room.findAll();

    for (let i = 0; i < rooms.length; i++)  {
        room = rooms[i].dataValues;

        const chat = io
            .of(`/room-${room.id}`)
            .on('connection', function (socket) {
                socket.on("join", function (data) {
                    message = `${data.name} entrou na sala${data.type === 'guest' ? ' como convidado': ''}`
                    io.of(`/room-${room.id}`).emit('message', { name: data.name, message, createdAt: new Date().toISOString() });
                })

                socket.on("message", function (data) {
                    message = data.message
                    io.of(`/room-${room.id}`).emit('message', { name: data.name, message, createdAt: data.createdAt });
                })
            });
    }
}