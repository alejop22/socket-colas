const path = require('path');
const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
}

class TicketControl {

    constructor() {
        this.ultimoTicket = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosTickets = [];

        this.init();
    }

    get toJson() {
        return {
            ultimoTicket: this.ultimoTicket,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosTickets: this.ultimosTickets
        }
    }

    init() {      
        try {
            // leer base de datos en formato json
            const {hoy, ultimoTicket, tickets, ultimosTickets} = require('../db/data.json');
    
            if (hoy === this.hoy) {
                this.ultimoTicket = ultimoTicket;
                this.tickets = tickets;
                this.ultimosTickets = ultimosTickets;
            } else {
                this.guardarDB();
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    guardarDB() {
        const pathDB = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(pathDB, JSON.stringify(this.toJson));
    }

    siguiente() {
        this.ultimoTicket += 1;

        const ticket = new Ticket(this.ultimoTicket, null);
        this.tickets.push(ticket);

        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        
        this.ultimosTickets.unshift(ticket);

        if (this.ultimosTickets.length > 4) {
            this.ultimosTickets.splice(-1, 1);
        }

        this.guardarDB();

        return ticket;
    }
}

module.exports = TicketControl;