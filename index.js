// Recieve Data
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const dataStream = fs.

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  let data = JSON.parse(String.fromCharCode(...(JSON.parse(JSON.stringify(msg))).data));
  console.log(data);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);


// Manage data
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const listener = require("./listener.js").default
clients = []

wss.on('connection', function connection(ws) {

  clients.push(new listener(ws))

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});