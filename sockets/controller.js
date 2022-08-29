
const socketController = (socket) => {

    socket.on('disconnect', () => {

    });

    socket.on('enviar-mensaje', (payload, callback) => {
        
        // envia el mensaje a todos los clientes conectados
        // cuando no se tiene acceso al .io se usa el broadcast para emitir mensajes a todos los clientes,
        // excepto al que envio el mensaje
        // this.io.emit('enviar-mensaje', payload);
        socket.broadcast.emit('enviar-mensaje', payload);

        // const id = payload+123;
        // callback(id);
    });
}

module.exports = {
    socketController
}