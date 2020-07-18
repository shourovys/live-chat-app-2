const express = require('express');
const { Socket } = require('dgram');
const app = express();
const http = require('http').createServer(app)

const PROT = process.env.PORT || 3000

http.listen(PROT, () => {
    console.log(`server listening on port ${PROT}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// Socket

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('new user join');
    socket.on('massage', (msg) => {
        socket.broadcast.emit('massage', msg)
    })
})