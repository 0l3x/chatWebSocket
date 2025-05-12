let socket = io('https://olexanderg.net');

socket.on('conectado', function () {
    document.getElementById('formulario').style.display = "";
});

socket.on('difundir', function (datos) {
    let chat = document.getElementById('chat');
    chat.innerHTML += '<p><strong>' + datos.nick + '</strong>: ' + datos.texto + '</p>';
    chat.scrollTop = chat.scrollHeight;
});

function enviar(event) {
    if (event) event.preventDefault();

    const form = document.getElementById('formulario');
    const nickInput = document.getElementById('nick');
    const textoInput = document.getElementById('texto');

    // Validación manual
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const nick = nickInput.value.trim();
    const texto = textoInput.value.trim();

    if (texto !== "") {
        socket.emit('enviar', { nick: nick, texto: texto });
        textoInput.value = "";
        textoInput.focus();
    }
}