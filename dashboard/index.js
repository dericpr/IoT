//server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket){
   console.log('connection');
   io.sockets.emit('get_devices');

  socket.on("device_list", function (data) {
    console.log("Received Device List from App " + data);
    io.sockets.emit('new_device_data', data);
    console.log("Sent new device data");
  });

});

app.get('/devices', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
});

server.listen(4000, function () {
  console.log('listening on *:4000');
});
