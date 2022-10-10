var express = require('express')
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server)



server.listen(3000)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

var connections = [];

io.sockets.on('connection',(socket)=>{
    console.log("connected: "+socket.id);
    
    connections.push(socket);
    console.log();
    socket.on('disconnect',(data)=>{
        connections.splice(connections.indexOf(socket),1);
        console.log("disconnected: "+socket.id);

    })

    io.sockets.emit('connected',{numberOfUsers:connections.length})
    
    socket.on('send mess',(data)=>{
        io.sockets.emit('add mess',{mess:data.mess,name:data.name,className:data.className,numberOfUsers:connections.length});
    })

})

