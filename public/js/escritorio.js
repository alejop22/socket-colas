// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El parametro escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
divAlerta.style.display = 'none';

lblEscritorio.innerText = escritorio
const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('tickets-pendientes', payload => {
    lblPendientes.innerText = payload;
});

btnAtender.addEventListener('click', () => {
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msj}) => {
        if (!ok) {
            console.log(msj);
            divAlerta.style.display = '';
        } else {
            lblTicket.innerText = `Ticket ${ticket.numero}`;
        }

    });
});