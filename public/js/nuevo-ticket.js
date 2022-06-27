

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnGenerarTicket = document.querySelector('#btnGenerarTicket');


const socket = io();

socket.on('ultimo-ticket', payload => {
    lblNuevoTicket.innerText = 'Ticket ' + payload;
})
socket.on('connect', () => {
    btnGenerarTicket.disabled = false;
})
socket.on('disconnect', () => {
    btnGenerarTicket.disabled = true;
})

btnGenerarTicket.addEventListener('click', () => {

    socket.emit('generar-ticket', null, (ticket) => {

        lblNuevoTicket.innerText = ticket;

        setTimeout(() => {
           alert('Su turno es :'+ ticket)
        }, 300);

    })


})

