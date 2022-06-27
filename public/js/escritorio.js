


const nombreEscritorio = document.querySelector('#nombreEscritorio');
const lblAtendido = document.querySelector('#lblAtendido');
const btnAtender = document.querySelector('#btnAtender');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes')


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = '/';
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
nombreEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';


const socket = io();

// socket.on('Cola', payload => {
//     // lblNuevoTicket.innerText = 'Ticket ' + payload;
// })
socket.on('connect', () => {
    btnAtender.disabled = false;
})
socket.on('disconnect', () => {
    btnAtender.disabled = true;
})

socket.on('ticket-pendientes', (pendientes) => {
    lblPendientes.innerText = pendientes;
    if (pendientes != 0) {
        btnAtender.disabled = false;
        return divAlerta.style.display = 'none';
    }else{
        btnAtender.disabled = true;
        return divAlerta.style.display = '';
    }


})
btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, pendientes, ultimo }) => {
        if (!ok) {
            lblPendientes.innerText = ''
            btnAtender.disabled = true;
            return divAlerta.style.display = '';



        } else {
            lblAtendido.innerText = 'Ticket ' + ticket.numero;
            lblPendientes.innerText = pendientes;
            btnAtender.disabled = false;
            return divAlerta.style.display = 'none';
        }
    })


})