const path =require('path');
const http = require('http');
const express =  require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'./public');
const port = process.env.PORT || 8000 ;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket)=>{
    console.log('Connected');
    socket.on('disconnect', ()=>{
        console.log('Disconnected');
    });
})
server.listen(port, ()=>{
    console.log(`Running port ${port}`);
})
