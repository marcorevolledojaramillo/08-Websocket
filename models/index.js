const Server = require('./server');
const ticketControl = require('./ticket-control');

module.exports={
    Server,
    ...ticketControl
}