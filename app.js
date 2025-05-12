const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const nunjucks = require('nunjucks');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
});

server.listen('https://olexanderg.net');

io.on('connection', (socket) => {
    socket.emit('conectado');
    socket.on('enviar', (datos) => {
        io.emit('difundir', datos);
    });
});
