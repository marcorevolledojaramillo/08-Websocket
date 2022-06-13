
//Referencias del HTML

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje')
const txtMensajeRecibir = document.querySelector('#txtMensajeRecibir')
const btnEnviar = document.querySelector('#btnEnviar')
const socket = io();


socket.on('connect', () => {

    lblOffline.style.display = 'none'
    lblOnline.style.display = ''

})

socket.on('disconnect', () => {
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
})

socket.on('enviar-mensaje', (payload) => {
    txtMensajeRecibir.value = payload;
})


btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    socket.emit('enviar-mensaje', mensaje, (id) => {
        console.log( id )
    });
})