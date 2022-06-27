const express = require("express");
const cors = require('cors');
const { socketController } = require("../sockets/controller");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        //Middleware
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();

        //Sockets
        this.sockets();
    }


    middlewares() {
        //CORS
        this.app.use(cors());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        // this.app.use(this.paths.auth, require('../routes/auth'));


    }

    sockets() {
        this.io.on('connection', socketController);

    }

    listen() {
        this.server.listen(this.port, (err) => {
            console.log(`Server corriendo en http://localhost:${this.port}`);
        });

    }
}

module.exports = Server;