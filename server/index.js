const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 5000

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    console.log('We have new connection!');

    socket.on('join', ({name, room}, cb) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return cb(error);

        socket.emit('message', {user: 'admin', text: `${user.name} welcome to the ${user.room}`});
        //broadcast send message to everyone 
        socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name} has joined!`});
        //socket join method
        socket.join(user.room);

        //show all the userin the room
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        console.log(getUsersInRoom(user.room))
        cb();
    })


    socket.on('sendMessage', (message, cb) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message' , {user: user.name, text:message});

        cb();
    })

    socket.on('disconnect', () =>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        }
    })
});


server.listen(PORT, () => console.log(`Server has started at ${PORT}.`));
