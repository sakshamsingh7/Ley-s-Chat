
//done this cors to manage the error of cross origin resource sharing error 
const io = require('socket.io')(8080,{
    cors:{
        origin:"*"
    }
});

// const cors=require('cors');
// io.use(cors());
const users={}

io.on('connection',socket =>{
socket.on('new-user-joined',name=>{
   // console.log('joined');
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);
});
socket.on('send',message=>{
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
});
socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
});
})