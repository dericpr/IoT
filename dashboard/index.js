//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

io.on('connection', function (socket){
   console.log('connection');
   io.sockets.emit('get_devices');

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying Deric is the best', msg);
  });
  socket.on('CH02', function (from, msg) {
    console.log('MSG2', from, 'sayin ', msg);
  });

  socket.on("device_list", function (data) {
    console.log("Received Device List from App " + data);
  });

});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'public/', 'index.html'))
  res.end()
});

http.listen(4000, function () {
  console.log('listening on *:4000');
});
