const models = require("@models");
const Room = models.Room;
const { spawn } = require('child_process')

module.exports = async io => {
  rooms = await Room.findAll();

  io.on("connection", function(socket) {
    socket.on("create-room", function() {
      spawn(process.argv[1], process.argv.slice(2), {
        detached: true, 
        stdio: ['inherit']
      }).unref()
      process.exit()
    });
  });

  for (let i = 0; i < rooms.length; i++) {
    room = rooms[i].dataValues;
    
    io.of(`/room-${room.id}`).on("connection", function(socket) {
      socket.on("join", function(data) {
        message = `${data.name} entrou na sala${
          data.type === "guest" ? " como convidado" : ""
        }`;
        io.of(`/room-${room.id}`).emit("message", {
          user: {
            name: data.name
          },
          message,
          createdAt: new Date().toISOString()
        });
      });

      socket.on("message", function(data) {
        console.log(data)
        message = data.message;
        io.of(`/room-${room.id}`).emit("message", {
          user: {
            nick: data.user.nick,
            name: data.user.name,
          },
          message,
          createdAt: data.createdAt
        });
      });
    });
  }
};
