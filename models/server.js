const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        // Servidor de express
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        // Web Socket
        this.io = require('socket.io')(this.server);

        this.middlewares();

        this.sockets();

        this.routes();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {

    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`web socket corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;