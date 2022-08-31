const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('cargar-ultimo', ticketControl.ultimoTicket);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);
    socket.emit('estado-actual', ticketControl.ultimosTickets);

    socket.on('siguiente-ticket', (payload, callback) => {

        const siguienteTicket = ticketControl.siguiente();

        callback(siguienteTicket);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    socket.on('atender-ticket', ({escritorio}, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msj: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        socket.broadcast.emit('estado-actual', ticketControl.ultimosTickets);
        if (!ticket) {
            return callback({
                ok: false,
                msj: 'No hay tickets disponibles'
            });
        }

        callback({
            ok: true,
            ticket
        });
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    
}

module.exports = {
    socketController
}