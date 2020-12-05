var http = require('http');
var fs = require('fs');
var listener = require("./listener.js");
// HTTP
var fileServer = http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('index.html').pipe(res);
});
fileServer.listen(process.env.PORT || 3000);
var WebSocketServer = require('websocket').server;
var wss = new WebSocketServer({
    httpServer: fileServer,
    autoAcceptConnections: false
});
// WS
var clients = [];
wss.on('request', function connection(ws) {
    var wsconnection = ws.accept('echo-protocol', ws.origin);
    clients.push(new listener(wsconnection));
    wsconnection.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
});
wss.on('listening', function () {
    console.log("ws server listening ");
});
function addData(data) {
    clients.forEach(function (element) {
        element.addData(data);
    });
}
// UDP
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('error', function (err) {
    console.log("server error:\n" + err.stack);
    server.close();
});
server.on('message', function (msg, rinfo) {
    var data = JSON.parse(String.fromCharCode.apply(String, (JSON.parse(JSON.stringify(msg))).data));
    addData(data);
});
server.on('listening', function () {
    var address = server.address();
    console.log("UDP server listening " + address.address + ":" + address.port);
});
server.bind(41234);
