var buffer = require('buffer');
var udp = require('dgram');

// creating a client socket
var client = udp.createSocket('udp4');

function sendMessage() {
    console.log("sending data")
    var data = Buffer.from(JSON.stringify({"mac":"1234125","data":4,"stamp": (new Date().getTime())}));
    client.send(data,41234,'localhost', function(error){
      if(error){
        client.close();
      }else{
        console.log('Data sent !!!');
      }
    });
  
    setTimeout(sendMessage, 2000)
}

sendMessage()