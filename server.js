const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000
http.listen(3000, ()=>{
    console.log("Listening on port 3000");
})
app.use(express.static( __dirname + '/public'));
app.get('/',(req,res)=>{
    res.sendFile('/index.html',{root: __dirname});
})
const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log("User connected");
    socket.on('sendMessage', (msg) => {
        // Emit message to all connected clients
        socket.broadcast.emit('receiveMessage', msg);
      });
    socket.on('disconnect',()=>{
        console.log("User disconnected");
    })
})