const express = require('express')
const app = express()
const { Server } = require('socket.io')
const path = require('path')
const PORT = process.env.PORT || 7070

app.use(express.static(path.join(__dirname, 'public')))

const server = app.listen(PORT, console.log(PORT))

const io = new Server(server)

io.on('connection', socket => {
    socket.on('user-joined', ({ name }) => {
        socket.broadcast.emit('new-user-joined', name)
    })

    socket.on('new-message', data => {
        socket
            .broadcast
            .emit('new-user-message', data)
    })

    socket.on('user-typing', data => {
        socket
            .broadcast 
            .emit('typing', data)
    })
})