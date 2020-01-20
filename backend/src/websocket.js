const socketio = require('socket.io');

exports.setUpWebSocket = server => {
    const io = socketio(server);
    
    io.on('connection', socket => {
        console.log(socket.id);
    })
}