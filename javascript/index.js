// Recieve Data
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

//const dataStream = fs.

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  let data = JSON.parse(String.fromCharCode(...(JSON.parse(JSON.stringify(msg))).data));
  addData(data);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);


// Manage data
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const listener = require("./listener.js")

clients = []

wss.on('connection', function connection(ws) {

  clients.push(new listener(ws))

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

function addData(data) {

  for (clientObj in clients) {
    console.log(clientObj)
    clientObj.addData(data);
    console.log(clientObj)
  }
}

// Serve website

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('index.html').pipe(res)
})

server.listen(process.env.PORT || 3000)