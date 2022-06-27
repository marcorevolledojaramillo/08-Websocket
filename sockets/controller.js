const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.broadcast.emit('ticket-pendientes', ticketControl.tickets.length)

    socket.on('generar-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit('ticket-pendientes',ticketControl.tickets.length);

    })
    socket.on('atender-ticket', ({ escritorio }, payload) => {

        if (!escritorio) {
            return payload({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const atendido = ticketControl.atenderTicket(escritorio);

        if (!atendido) {
            payload({
                ok: false,
            });
        } else {
            socket.broadcast.emit('ticket-pendientes', ticketControl.tickets.length)
            if (ticketControl.tickets) {
                socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
                payload({ ok: true, 'ticket': atendido, pendientes: ticketControl.tickets.length})
            } else {
                socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
                payload({ ok: true, 'ticket': atendido })

            }
        }
    })
}

module.exports = {
    socketController
}