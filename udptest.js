var buffer = require('buffer');
var udp = require('dgram');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg

//sending msg
/*
while (true) {
  setTimeout(function() {

  }, 3000)

}
*/
while (true) {
  var data = Buffer.from(JSON.stringify({"mac":"1234125","data":4,"stamp": (new Date().getTime())}));
  client.send(data,41234,'localhost',function(error){
    if(error){
      client.close();
    }else{
      console.log('Data sent !!!');
    }
  });
}
