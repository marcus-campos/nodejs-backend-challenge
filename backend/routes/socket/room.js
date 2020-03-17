let users = []

module.exports = (socket) => {
    socket.on('join-room', function (data) {
        message = `${data.name} entrou na sala${data.type === 'guest' ? ' como convidado' : ''}`
        socket.emit(data.room, { message });
    });

    socket.on('message', function (data) {
        socket.emit(data.room.id, data);
    });
}