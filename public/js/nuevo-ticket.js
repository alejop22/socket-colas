// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnNuevoTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnNuevoTicket.disabled = false;

    socket.on('cargar-ultimo', (payload) => {
        lblNuevoTicket.innerText = 'Ticket '+payload;
    });
});

socket.on('disconnect', () => {
    btnNuevoTicket.disabled = true;
});

btnNuevoTicket.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });
});