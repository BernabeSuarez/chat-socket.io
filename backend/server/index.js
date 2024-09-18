import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http';

const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('a user connected ')
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })
})




server.listen(3000, () => {
    console.log('listening on port 3000')
})