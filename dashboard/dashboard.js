import openSocket from 'socket.io-client';
const  socket = openSocket('http://simulator:8000');
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function handlerTimer()
{
	console.log("Got a timer!");
}

subscribeToTimer(handleTimer);
