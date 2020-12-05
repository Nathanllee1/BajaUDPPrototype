// Recieve Data
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
//const dataStream = fs.
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
    console.log("server listening " + address.address + ":" + address.port);
});
server.bind(41234);
// Manage data
var WS = require('ws');
var wss = new WS.Server({ port: 8080 });
var listener = require("./listener.js");
var clients = [];
wss.on('connection', function connection(ws) {
    clients.push(new listener(ws));
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});
function addData(data) {
    clients.forEach(function (element) {
        element.addData(data);
    });
}
