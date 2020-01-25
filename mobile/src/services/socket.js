import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.8:3333', {
    autoConnect: false,
});

function subscribeToNewDevs (subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function connect(longitude, latitude, techs) {
    socket.io.opts.query = {
        longitude,
        latitude,
        techs
    };

    socket.connect();
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}