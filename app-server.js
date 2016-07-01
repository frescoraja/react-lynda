const express = require('express');
const app = express();

const connections = [];
const title = "Untitled Presentation";

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

const server = app.listen(3000);
const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {

  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log(`Disconnected socket: ${socket.id} \nSockets remaining: ${connections.length}`);
  })

  socket.emit('welcome', {
    title: title
  });

  connections.push(socket);
  console.log("connected: %s\nTotal connected: %s", socket.id, connections.length); 
})

console.log("Polling server is running at 'http://localhost:3000'");
