
const http = require('http')
const fs = require('fs')

const listener = require("./listener.js")


// HTTP
const fileServer = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('index.html').pipe(res)
})

fileServer.listen(process.env.PORT || 3000)

const WebSocketServer = require('websocket').server;
const wss = new WebSocketServer({
  httpServer: fileServer,
  autoAcceptConnections: false
})


// WS
let clients : typeof listener[] = []

wss.on('request', function connection(ws) {

  var wsconnection = ws.accept('echo-protocol', ws.origin);

  clients.push(new listener(wsconnection))

  wsconnection.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

});




wss.on('listening', () => {
  console.log(`ws server listening `)
})

function addData(data) {

    clients.forEach((element) => {
        element.addData(data);
    })
}



// UDP
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

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
  console.log(`UDP server listening ${address.address}:${address.port}`);
});

server.bind(41234);


