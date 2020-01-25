const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];
let io;

exports.setUpWebSocket = server => {
    io = socketio(server);
    
    io.on('connection', socket => {
        const { longitude, latitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                longitude: Number(longitude),
                latitude: Number(latitude),
            },
            techs: parseStringAsArray(techs)
        });
    });
}

exports.findConnections = ( coordinates, techs ) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.map(connection => {
        io.to(connection.id).emit(message, data)
    })
}